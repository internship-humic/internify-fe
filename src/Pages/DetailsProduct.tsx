import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ResearchItem = {
  id: number;
  image_path: string;
  nama_project: string;
  deskripsi: string;
  link_project: string;
  created_at: string;
};

const DetailsProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ResearchItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/hasil-research-api/get/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setProduct(data.data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-500">Data tidak ditemukan</div>
    );
  }

  return (
    <div className="body-details-of-product bg-[#F8F9FA] min-h-screen">
      {/* Navbar Section */}
      <div className="navbar-section py-[20px]">
        <Navbar />
      </div>

      {/* Title */}
      <div className="title-of-content flex justify-center mt-[20px] mx-4 md:mx-[20px] mb-[30px] text-center">
        <h2 className="text-[24px] md:text-[32px] font-bold">
          {product.nama_project}
        </h2>
      </div>

      <div className="content-container flex flex-col gap-[60px] mx-4 md:mx-[100px]">
        {/* Image */}
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}${product.image_path}`}
          alt={product.nama_project}
          className="w-full max-h-[500px] object-cover rounded-xl"
        />

        {/* Deskripsi */}
        <div
          className="paragraf-section prose max-w-none text-[15px] md:text-[16px]"
          dangerouslySetInnerHTML={{ __html: product.deskripsi }}
        />

        {product.link_project && (
          <a
            href={product.link_project}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-blue-600 underline hover:text-blue-800"
          >
            Lihat Project ↗
          </a>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DetailsProduct;
