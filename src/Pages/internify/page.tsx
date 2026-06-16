import { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const DataUsers = [
    { "Email": "intern@email.com", "Password": "password123", "role": "intern" },
    { "Email": "mentor@email.com", "Password": "password123", "role": "mentor" },
];

export default function InternifyLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email dan password wajib diisi.");
            return;
        }

        const user = DataUsers.find(
            (u) => u.Email.toLowerCase() === email.toLowerCase() && u.Password === password
        );

        if (user) {
            if (user.role === "intern") {
                navigate("/intern");
            } else if (user.role === "mentor") {
                navigate("/mentor");
            } else {
                setError("Role user tidak dikenali.");
            }
        } else {
            setError("Email atau password salah.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-between items-center py-8 px-4 font-sans selection:bg-red-200">
            <div className="hidden md:block"></div>

            <div className="w-full max-w-[440px] flex flex-col items-center">
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 font-bold text-2xl tracking-tight text-black">
                        <img src={logo} alt="Logo" className="w-32 h-20" />
                    </div>
                    <p className="text-[10px] tracking-widest text-yellow-950 font-semibold mt-1 uppercase">
                        HUMIC LMS PORTAL
                    </p>
                </div>

                <div className="max-w-md bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h2>
                    <p className="text-sm text-gray-500 mb-6">Access your dashboard with your credentials.</p>

                    <form onSubmit={handleSignIn} className="space-y-4">
                        {/* Input Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-700">Email address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <Mail className="w-4 h-4 ml-1" />
                                </span>
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <Lock className="w-4 h-4 ml-1" />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <Eye className="w-4 h-4" />
                                    ) : (
                                        <EyeOff className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-xs text-red-600 bg-red-50 p-2 rounded-md font-medium">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#B30000] hover:bg-[#990000] text-white font-medium text-sm py-2.5 rounded-lg transition-colors shadow-sm mt-2"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Forgot Password */}
                    <div className="text-center mt-6">
                        <a href="#" className="text-xs font-semibold text-red-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Divider & Support */}
                    <div className="mt-1">
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-gray-100"></div>
                            <span className="flex-shrink mx-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                                SUPPORT
                            </span>
                            <div className="flex-grow border-t border-gray-100"></div>
                        </div>

                        <button className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-200 rounded-full py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Frequently Asked Questions
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center text-[11px] text-gray-400 space-y-1">
                <p>© 2026 Internify. CoE Humic Engineering.</p>
                <div className="space-x-2">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <span></span>
                    <a href="#" className="hover:underline">Terms of Service</a>
                </div>
            </div>
        </div>
    );
}