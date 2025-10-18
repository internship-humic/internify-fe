import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const InternshipDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [intern, setIntern] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/lowongan-magang-api/get`)
      .then((res) => {
        const selected = res.data.data.find((item: any) => item.id === id);
        setIntern(selected);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch internship detail:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!intern)
    return <div className="p-10 text-center">Internship not found.</div>;

  return (
    <div className="bg-[#F8F9FA] min-h-screen flex flex-col">
      {/* Navbar Section */}
      <div className="py-5">
        <Navbar />
      </div>

      {/* Content Section */}
      <div className="flex-grow px-4 md:px-10 lg:px-[170px] w-full mt-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col items-start">
            <h2 className="font-bold text-[28px] md:text-[32px]">
              {intern.posisi}
            </h2>
            <div className="flex flex-col md:flex-row items-start md:items-center font-bold gap-4 md:gap-8 mt-5 text-[#292D32]">
              <div className="flex items-center gap-2">
                {/* Lokasi */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 md:w-7 md:h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <h2 className="text-[16px] md:text-[18px]">{intern.lokasi}</h2>
              </div>

              {/* Kelompok Peminatan */}
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 md:w-7 md:h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <h2 className="text-[16px] md:text-[18px]">
                  {intern.kelompok_peminatan}
                </h2>
              </div>

              {/* Paid / Unpaid */}
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 md:w-7 md:h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
                <h2 className="text-[16px] md:text-[18px]">
                  {intern.paid === "paid" ? "Paid" : "Unpaid"}
                </h2>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="self-start md:self-center">
            <button
              className="bg-[#C3423F] hover:bg-[#b36462] cursor-pointer text-white text-sm md:text-[14px] font-semibold px-6 py-2 md:px-9 md:py-3 rounded-2xl shadow-xl"
              onClick={() => navigate(`/register-intern/${intern.id}`)}
            >
              Apply
            </button>
          </div>
        </div>

        {/* Job Description Only */}
        <div className="mt-10 text-[#5F5F5F]">
          <div className="mb-6">
            <div
              className="text-[16px] font-medium"
              dangerouslySetInnerHTML={{ __html: intern.jobdesk }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InternshipDetails;
