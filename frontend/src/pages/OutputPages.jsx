import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

const moviesData = [
    {
        title: 'Film 1',
        genre: 'Action',
        poster: 'https://upload.wikimedia.org/wikipedia/id/2/20/Poster_Spider-Man_No_Way_Home.jpg',
        synopsis: 'This is a synopsis of Film 1.',
    },
    {
        title: 'Film 2',
        genre: 'Drama',
        poster: 'https://upload.wikimedia.org/wikipedia/id/2/20/Poster_Spider-Man_No_Way_Home.jpg',
        synopsis: 'This is a synopsis of Film 2.',
    },
    {
        title: 'Film 3',
        genre: 'Comedy',
        poster: 'https://upload.wikimedia.org/wikipedia/id/2/20/Poster_Spider-Man_No_Way_Home.jpg',
        synopsis: 'This is a synopsis of Film 3.',
    },
    {
        title: 'Film 4',
        genre: 'Horror',
        poster: 'https://upload.wikimedia.org/wikipedia/id/2/20/Poster_Spider-Man_No_Way_Home.jpg',
        synopsis: 'This is a synopsis of Film 4.',
    },
    {
        title: 'Film 5',
        genre: 'Sci-Fi',
        poster: 'https://upload.wikimedia.org/wikipedia/id/2/20/Poster_Spider-Man_No_Way_Home.jpg',
        synopsis: 'This is a synopsis of Film 5.',
    },
];

function OutputPages() {
    const [movies, setMovies] = useState(moviesData);

    const refreshMovies = () => {
        // Untuk demonstrasi, hanya mengacak urutan film
        setMovies([...movies].sort(() => Math.random() - 0.5));
    };

    return (
        <main className="relative h-screen flex flex-col text-white">
            <Navbar />
            <div className="fixed inset-0 -z-10">
                <img
                    src="./src/assets/background-netflix.jpg"
                    alt="background-netflix"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="max-w-screen-2xl mx-auto p-4 mt-5 mb-40">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Movies Recommendation System</h1>
                </header>

                <div className="space-y-4">
                    {movies.map((movie, index) => (
                        <div key={index} className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
                            <img src={movie.poster} alt={movie.title} className="w-32 h-48 object-cover rounded-md" />
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-black">{movie.title}</h3>
                                <p className="text-black">{movie.genre}</p>
                                <p className="mt-2 text-black">{movie.synopsis}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-start mt-6 gap-96 mb-5 pb-16">
                    <Link
                        to="/#"
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-300 flex items-center gap-2 mr-2"
                    >
                        Back Home
                    </Link>
                    <button
                        onClick={refreshMovies}
                        className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-500 flex items-start gap-2 mr-2"
                    >
                        Refresh
                    </button>
                </div>
            </div>
            <Footer />
        </main>
    );
}

export default OutputPages;
