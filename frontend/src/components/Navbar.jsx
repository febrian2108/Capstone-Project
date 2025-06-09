import React, { useState } from "react";

export default function Navbar() {
    // State untuk toggle menu dan sidebar
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Fungsi toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Fungsi untuk menutup sidebar
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="flex justify-between items-center p-6 bg-gray-950 fixed top-0 left-0 right-0 z-50">
            <a href="#" className="w-40">
                <img
                    src="./src/assets/logo-recmovies.png"
                    alt="Logo"
                    className="w-full object-cover"
                />
            </a>

            {/* Tombol menu mobile */}
            <button
                id="menu"
                className="sm:hidden block text-white text-2xl"
                aria-label="Toggle navigation menu"
                onClick={toggleMenu}
            >
                ☰
            </button>

            {/* Sidebar yang muncul ketika tombol menu ditekan */}
            {isMenuOpen && (
                <div className="absolute top-0 right-0 w-3/ h-full bg-gray-950 text-white p-4 z-50">
                    <button
                        className="absolute top-4 right-4 text-white text-3xl"
                        onClick={closeMenu}
                        aria-label="Close sidebar"
                    >
                        ✖
                    </button>
                    <ul className="mt-16 space-y-4">
                        <li><a href="/#" className="block py-2">Home</a></li>
                        <li><a href="/about" className="block py-2">About Application</a></li>
                        <li><a href="/profile" className="block py-2">Profile</a></li>
                    </ul>
                </div>
            )}

            {/* Menu navigasi desktop */}
            <div className="hidden sm:flex space-x-8">
                <a href="/#" className="text-white hover:underline">Home</a>
                <a href="/about" className="text-white hover:underline">About Application</a>
                <a href="/profile" className="text-white hover:underline">Profile</a>
            </div>
        </nav>
    );
}
