import { useEffect, useState } from "react";
import logo from "../assets/whiteLogo.png";

const NavbarAdmin = () => {
  const [namaDepan, setNamaDepan] = useState("");

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return;

    const fetchUserData = async () => {

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth-api/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (response.ok && result.data?.nama_depan) {
          setNamaDepan(result.data.nama_depan);
        }
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-row items-center w-full justify-between p-3 bg-[#2D3748] px-[50px]">
      <img src={logo} className="w-[180px]" alt="Logo" />
      <div className="user-container flex flex-row items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <h2 className="text-white text-[16px] font-semibold">
          Hai, {namaDepan}
        </h2>
      </div>
    </div>
  );
};

export default NavbarAdmin;
