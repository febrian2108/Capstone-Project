import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DecryptedText from '../components/TextAbout';

export default function AboutApps() {
    return (
        <div className="bg-gray-400">
                    <Navbar />
            <section className="relative flex justify-center items-center w-full h-full">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="./src/assets/popcorn-background-cinema-concept.jpg"
                        alt="background-netflix"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div id="about" className="relative overflow-hidden mt-20 flex justify-center items-center">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                            <div className="text-justify">
                                <h2 className=" text-center my-9 text-2xl tracking-tight font-extrabold text-red-600 sm:text-3xl md:text-4xl mt-0">
                                    ABOUT <span className="text-red-600">RECMOVIES</span>
                                </h2>

                                {/* First paragraph */}
                                <div className="text-white text-2xl">

                                <DecryptedText
                                    text="RecMovies focuses on solving the problem of choosing movies that suit users' 
                                preferences and moods amidst the many choices available. Many people have difficulty in deciding 
                                which movies to watch because of limited references or incompatibility with their personal tastes. 
                                The recommendation system we developed aims to provide more relevant and personalized movie suggestions 
                                by analyzing users' answers to certain questions about their preferences. Using Machine Learning technology, 
                                we design models based on Collaborative Filtering, Content Based Filtering, and Hybrid Models to produce more 
                                precise recommendations."
                                />
                                </div>

                                {/* Second paragraph with adjusted margin */}
                                <div className="mt-16 text-white text-2xl">
                                    <DecryptedText
                                        text="Overall, this project aims to provide a smart solution to help users choose movies 
                                    according to their taste, reduce search time, and enhance entertainment experience with 
                                    Machine Learning technology integrated into a web-based platform."
                                        revealDirection="center"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
