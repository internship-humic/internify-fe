import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="bg-[#EDF2F7] w-[300px] min-h-[87vh] flex flex-col justify-between p-4">
      <div className="container-sidebar">
        <h2 className="font-semibold text-[#2C5282] text-[20px]">Menu</h2>
        <div className="list-of-sidebar flex flex-col p-7 gap-4">
          <div
            className={`text-container flex flex-row gap-3 p-3 items-center cursor-pointer rounded-2xl ${
              location.pathname === "/dashboard"
                ? "bg-[#D3DFEA] font-bold"
                : "hover:bg-[#D3DFEA] "
            }`}
            onClick={() => navigate("/dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-8 text-[#2C5282]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3 L5 8 A4 4 0 0 0 3 11 L3 15 A4 4 0 0 0 7 19 L17 19 A4 4 0 0 0 21 15 L21 11 A4 4 0 0 0 19 8 L12 3 Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 13 v4"
              />
            </svg>

            <h2 className="text-[#2C5282]">Dashboard</h2>
          </div>
          <div
            className={`text-container flex flex-row gap-3 p-3 items-center cursor-pointer rounded-2xl ${
              location.pathname === "/product-list"
                ? "bg-[#D3DFEA] font-bold"
                : "hover:bg-[#D3DFEA] "
            }`}
            onClick={() => navigate("/product-list")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 text-[#2C5282]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            <h2 className="text-[#2C5282]">Project</h2>
          </div>
          <div
            className={`text-container flex flex-row gap-3 p-3 items-center cursor-pointer rounded-2xl ${
              location.pathname === "/lowongan-list"
                ? "bg-[#D3DFEA] font-bold"
                : "hover:bg-[#D3DFEA]"
            }`}
            onClick={() => navigate("/lowongan-list")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 text-[#2C5282]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>

            <h2 className="text-[#2C5282]">Lowongan</h2>
          </div>
          <div
            className={`text-container flex flex-row gap-3 p-3 items-center cursor-pointer rounded-2xl ${
              location.pathname === "/partnership-admin"
                ? "bg-[#D3DFEA] font-bold"
                : "hover:bg-[#D3DFEA]"
            }`}
            onClick={() => navigate("/partnership-admin")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 text-[#2C5282]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>

            <h2 className="text-[#2C5282]">Partnership</h2>
          </div>
          <div
            className={`text-container flex flex-row gap-3 p-3 items-center cursor-pointer rounded-2xl ${
              location.pathname === "/internships-list"
                ? "bg-[#D3DFEA] font-bold"
                : "hover:bg-[#D3DFEA]"
            }`}
            onClick={() => navigate("/internships-list")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 text-[#2C5282]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>

            <h2 className="text-[#2C5282]">Pelamar</h2>
          </div>
          <div
            className={`text-container flex flex-row gap-3 p-3 items-center cursor-pointer rounded-2xl ${
              location.pathname === "/feedbacks-list"
                ? "bg-[#D3DFEA] font-bold"
                : "hover:bg-[#D3DFEA]"
            }`}
            onClick={() => navigate("/feedback-list")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 text-[#2C5282]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5l-3 3-3-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
              />
              <circle cx="8" cy="10" r="1.2" fill="currentColor" />
              <circle cx="12" cy="10" r="1.2" fill="currentColor" />
              <circle cx="16" cy="10" r="1.2" fill="currentColor" />
            </svg>

            <h2 className="text-[#2C5282]">Feedback</h2>
          </div>
          <div
            className={`text-container flex flex-row gap-3 p-3 items-center cursor-pointer rounded-2xl ${
              location.pathname === "/faq-list"
                ? "bg-[#D3DFEA] font-bold"
                : "hover:bg-[#D3DFEA]"
            }`}
            onClick={() => navigate("/faq-list")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 text-[#2C5282]"
            >
              {/* Balon chat */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5l-3 3-3-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
              />
              {/* Tanda tanya */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.5a2.25 2.25 0 1 1 4.5 0c0 1.25-.75 1.75-1.5 1.85s-1 1-1 1.75"
              />
              <circle cx="12" cy="16" r="0.6" fill="currentColor" />
            </svg>

            <h2 className="text-[#2C5282]">FAQ</h2>
          </div>
        </div>
      </div>

      <div
        className="logout flex flex-row items-center cursor-pointer gap-4 p-3 rounded-2xl hover:bg-[#F8D2D2] hover:font-bold mx-7"
        onClick={() => {
          document.cookie =
            "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          navigate("/");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 text-[#C3423F]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>

        <h2 className="text-[#C3423F] text-[16px] font-semibold">Keluar</h2>
      </div>
    </div>
  );
};

export default SidebarAdmin;
