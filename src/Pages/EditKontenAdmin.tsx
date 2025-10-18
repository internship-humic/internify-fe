import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import SidebarAdmin from "../Layout/SidebarAdmin";
import NavbarAdmin from "../Layout/NavbarAdmin";

const EditKontenAdmin = () => {
  //   const { id } = useParams();
  const [searchParams] = useSearchParams();
  const tipeQuery = searchParams.get("tipe") || "Internship";
  const [tipeKonten, setTipeKonten] = useState(tipeQuery);

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Navbar */}
      <NavbarAdmin />

      {/* Sidebar and Content */}
      <div className="flex flex-row">
        <SidebarAdmin />

        <div className="p-10 bg-white flex-col flex-wrap w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">Edit Konten</h2>
            <button className="bg-[#1F4A92] text-white px-6 py-2 rounded-md font-medium">
              Submit
            </button>
          </div>

          <form className="flex flex-col gap-6 max-w-full">
            {/* Select Tipe Konten */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tipe Konten</label>
                <select
                  className="border border-gray-300 rounded-lg p-3"
                  value={tipeKonten}
                  onChange={(e) => setTipeKonten(e.target.value)}
                >
                  <option value="Internship">Internship</option>
                  <option value="Product">Product</option>
                  <option value="News">News</option>
                  <option value="Event">Event</option>
                </select>
              </div>
            </div>

            {/* Internship Fields */}
            {tipeKonten === "Internship" && (
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Kategori</label>
                  <select className="border border-gray-300 rounded-lg p-3">
                    <option value="Design">Design</option>
                    <option value="Programming">Programming</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Paid / Unpaid</label>
                  <select className="border border-gray-300 rounded-lg p-3">
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Lokasi</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-3"
                    placeholder="Contoh: Bandung"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Nama Internship</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-3"
                    placeholder="Contoh: UI/UX Designer"
                  />
                </div>
              </div>
            )}

            {/* Product Fields */}
            {tipeKonten === "Product" && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Judul Produk</label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-lg p-3"
                      placeholder="Nama produk"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Upload Thumbnail
                  </label>
                  <input type="file" accept=".jpg,.png,.webm" />
                  <p className="text-red-500 text-xs">
                    * Maksimal ukuran 1024x500 (jpg, png, webm)
                  </p>
                </div>
              </div>
            )}

            {/* News Fields */}
            {tipeKonten === "News" && (
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Judul Berita</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-3"
                    placeholder="Judul berita"
                  />
                </div>
              </div>
            )}

            {/* Event Fields */}
            {tipeKonten === "Event" && (
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Nama Event</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-3"
                    placeholder="Contoh: Tech Webinar"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Tanggal Event</label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-lg p-3"
                  />
                </div>
              </div>
            )}

            {/* Common Content Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Isi Konten</label>
              <textarea
                className="border border-gray-300 rounded-lg p-3 min-h-[150px]"
                placeholder="Tuliskan isi konten..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditKontenAdmin;
