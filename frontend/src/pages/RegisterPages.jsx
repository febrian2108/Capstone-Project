import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function RegisterPages() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
        age: "",
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

        // Validasi jika password dan confirm password cocok
        if (formData.password !== formData.confirmPassword) {
            setError("Password dan Confirm Password tidak cocok.");
            return;
        }

        if (formData.username === "" || formData.email === "" || formData.password === "" || formData.confirmPassword === "" || formData.country === "" || formData.age === "") {
            setError("Semua kolom harus diisi.");
            return;
        }

        try {
            const response = await fetch("http://localhost:9000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Terjadi kesalahan saat registrasi.");
            } else {
                setSuccess(data.message);
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    country: "",
                    age: "",
                });

                // Redirect ke halaman login setelah berhasil
                navigate("/login");
            }
        } catch (error) {
            console.error("Error during registration:", error);
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

                <div className="bg-black bg-opacity-80 p-5 flex rounded-2xl shadow-lg w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-xl z-10">
                    <div className="w-full px-5">
                        <h2 className="text-2xl font-bold text-white pt-3 pb-3">Register</h2>
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter Your Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-red-500 focus:bg-green-50 focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="mt-2">
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

                            <div className="mt-3">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    minLength={6}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="mt-3">
                                 <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    placeholder="Enter Your Country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="mt-3">
                                <input
                                    type="text"
                                    name="age"
                                    id="age"
                                    placeholder="Enter Your Age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

                            <button
                                type="submit"
                                className="w-full block bg-red-700 hover:bg-red-500 focus:bg-red-500 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                            >
                                Register
                            </button>
                        </form>

                        <div className="text-sm flex justify-between items-center mt-3">
                            <p className="text-white">
                                Already have an account?{" "}
                                <a className="text-blue-500 hover:text-blue-300" href="/login">
                                    Login
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
