import logoblack from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // helper validasi sederhana
  const validate = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail && !trimmedPassword) {
      setErrorMsg("Field Email dan Password kosong, mohon diisi terlebih dahulu");
      return false;
    }

    if (!trimmedEmail) {
      setErrorMsg("Field Email kosong, mohon diisi terlebih dahulu");
      return false;
    }

    if (!trimmedPassword) {
      setErrorMsg("Field Password kosong, mohon diisi terlebih dahulu");
      return false;
    }

    // opsional: validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg("Format email tidak valid");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    // reset error dulu
    setErrorMsg("");

    // validasi sebelum request
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth-api/login`,
        { email: email.trim(), password: password.trim() },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        document.cookie = `token=${response.data.data.token}; path=/;`;
        navigate("/dashboard");
      } else {
        setErrorMsg(response.data.message || "Login failed");
      }
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Enter submit: cukup pakai form onSubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    handleLogin();
  };

  return (
    <div className="body-container min-h-screen bg-[#F7FAFC]">
      <div className="container-of-card flex flex-col min-h-screen gap-9 justify-center items-center">
        <div className="title-logo flex flex-col items-center">
          <img src={logoblack} className="w-[250px] mb-4" alt="Logo" />
        </div>

        {/* Pakai form agar Enter bisa submit */}
        <form
          onSubmit={handleSubmit}
          className="form-input bg-white rounded-3xl flex flex-col items-center gap-8 p-[30px] w-[30rem] shadow-2xl"
        >
          {/* Email */}
          <div className="username-section flex flex-col w-full gap-2">
            <div className="title-of-username flex flex-row items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-[#2A4365]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <h2 className="text-[20px] text-[#2A4365]">Email</h2>
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 bg-[#EDF2F7] rounded-xl"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg(""); // opsional: hapus warning saat user mulai mengetik
              }}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="username-section flex flex-col w-full gap-2">
            <div className="title-of-username flex flex-row items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-[#2A4365]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>

              <h2 className="text-[20px] text-[#2A4365]">Password</h2>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-4 bg-[#EDF2F7] rounded-xl"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              autoComplete="current-password"
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-600 text-sm font-medium">{errorMsg}</p>
          )}

          {/* Sign In Button: type="submit" biar form bisa Enter */}
          <button
            type="submit"
            className="bg-[#2A4365] hover:bg-[#7f9bc3] cursor-pointer text-[20px] text-white w-full p-3 rounded-xl font-medium flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <h2 className="font-semibold flex flex-row items-center gap-2 text-red-700">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-red-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </span>
            Halaman Khusus Login Petugas HUMIC
          </h2>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
