import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useLogin } from "../../hooks/useUser";
import { customToast } from "../utils/showToast";
import { CircleQuestionMark } from 'lucide-react';

const decodeJWT = (token: string) => {
    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, "=");
        return JSON.parse(atob(padded));
    } catch {
        return null;
    }
};

export default function InternifyLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const { login, loading, error, setError } = useLogin();

    useEffect(() => {
        if (!error) return;
        customToast.error("Login gagal", error);
        setError(null);
    }, [error, setError]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("Email dan password wajib diisi.");
            return;
        }

        const data = await login(email, password);
        if (!data) return;

        const { token } = data;
        document.cookie = `token=${token}; path=/; SameSite=Strict`;

        const decoded = decodeJWT(token);
        const role = decoded?.role;
        if (role === "intern") {
            navigate("/intern");
        } else if (role === "mentor" || role === "admin") {
            navigate("/mentor");
        } else {
            setError("Role user tidak dikenali.");
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-between items-center py-8 px-4 font-sans selection:bg-red-foreground">
            <div className="w-full max-w-[440px] flex flex-col items-center">
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 font-bold text-2xl tracking-tight text-black">
                        <img src={logo} alt="Logo" />
                    </div>
                    <p className="text-[10px] tracking-widest text-yellow-950 font-semibold mt-1 uppercase">
                        HUMIC LMS PORTAL
                    </p>
                </div>
                {/* MAIN CONTENT */}
                <div className="box max-w-md bg-box-primary border border-box-border p-8 md:p-12 shadow-sm rounded-lg">
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
                                    placeholder="Email Account"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-card-outline rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
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
                                    placeholder="Account Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-card-outline rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
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
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red hover:bg-red/80 text-white font-medium text-sm py-2.5 rounded-lg transition-colors shadow-sm mt-2"
                        >
                            {loading ? "Signing in..." : "Sign In"}
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
                            <div className="flex-grow border-t border-card-outline"></div>
                            <span className="flex-shrink mx-4 text-[10px] font-bold tracking-wider text-font-shade uppercase">
                                SUPPORT
                            </span>
                            <div className="flex-grow border-t border-card-outline"></div>
                        </div>

                        <button className="w-full mt-2 flex items-center justify-center gap-2 border border-card-outline rounded-full py-1.5 text-xs text-font-shade hover:bg-gray-50 transition-colors font-medium">
                            <CircleQuestionMark className="w-5 h-5" />
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