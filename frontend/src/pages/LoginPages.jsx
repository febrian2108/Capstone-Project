import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function LoginPages() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.email === "" || formData.password === "") {
            setError("Email dan password wajib diisi.");
            return;
        }

        try {
            const response = await fetch("http://localhost:9000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Terjadi kesalahan.");
            } else {
                setSuccess(data.message);
                localStorage.setItem("token", data.token);
                setFormData({
                    email: "",
                    password: "",
                });

                navigate("/");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Gagal terhubung ke server.");
        }
    };

    return (
        <div>
            <section className="min-h-screen flex items-center justify-center relative">
                <img
                    src="src/assets/background-netflix.jpg"
                    alt="background-netflix"
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                />

                <div className="bg-black bg-opacity-85 p-5 flex rounded-2xl shadow-lg max-w-3xl z-10">
                    <div className="md:w-1/2 px-5">
                        <h2 className="text-2xl font-bold text-white pt-3 pb-3">Login</h2>
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
                                    autoFocus
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="mt-4">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    minLength={6}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

                            <button
                                type="submit"
                                className="w-full block bg-[#db0000] hover:bg-red-600 focus:bg-red-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                            >
                                Log In
                            </button>
                        </form>

                        <div className="text-sm flex justify-between items-center mt-3">
                            <p className="text-white">
                                You don't have an account?{" "}
                                <a className="text-blue-500 hover:text-blue-300" href="/register">
                                    Register
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="w-1/2 md:block hidden">
                        <img
                            src="src/assets/the-cinema.jpeg"
                            className="rounded-2xl"
                            alt="page img"
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}