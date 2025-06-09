import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function QuestionPages() {
    const questions = [
        {
            id: 1,
            question: "Genre seperti apa yang kamu sukai?",
            options: ["Action", "Horror", "Drama", "Komedi", "Animasi"]
        },
        {
            id: 2,
            question: "Film seperti apa yang pernah kamu tonton?",
            options: ["Avengers: Endgame", "Titanic", "Mr. Bean Holiday", "La La Land", "The Matrix", "The Conjuring", "Harry Potter and the Sorcerer Stone", "Frozen", "Sherlock Holmes (2009)", "Oppenheimer"]
        },
        {
            id: 3,
            question: "Rating usia yang cocok?",
            options: ["R-13", "17+", "D-21", "G", "R-BO"]
        },
        {
            id: 4,
            question: "Content type atau media type mana yang lebih kamu suka?",
            options: ["Movie", "Series"]
        },
        {
            id: 5,
            question: "Film dari negara mana yang kamu cari?",
            options: ["Indonesia", "Amerika", "Jepang", "Korea", "Inggris"]
        }
    ];

    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigate = useNavigate();

    const handleCheckboxChange = (qId, value) => {
        const prevAnswers = answers[qId] || [];
        if (prevAnswers.includes(value)) {
            setAnswers({
                ...answers,
                [qId]: prevAnswers.filter((v) => v !== value)
            });
        } else {
            setAnswers({
                ...answers,
                [qId]: [...prevAnswers, value]
            });
        }
    };

    const handleNext = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Semua pertanyaan dijawab, tampilkan alert dan redirect
            await Swal.fire({
                title: "Terima kasih!",
                text: "Jawaban kamu berhasil dikumpulkan, silahkan klik tombol dibawah untuk melihat hasilnya",
                icon: "success",
                confirmButtonText: "Lanjut",
                confirmButtonColor: "#0000FF",
            });

            navigate("/output", { state: { answers } });
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const selected = answers[currentQuestion.id] || [];

    return (
        <main className="relative min-h-screen flex flex-col text-white">
            {/* Fullscreen background image */}
            <div className="fixed inset-0 -z-10">
                <img
                    src="./src/assets/background-netflix.jpg"
                    alt="background-netflix"
                    className="w-full h-full object-cover"
                />
            </div>

            <Navbar />

            {/* Content */}
            <section className="flex flex-1 justify-center items-center px-4 py-10">
                <div className="text-white rounded-xl shadow-md p-6 w-full max-w-3xl">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleNext();
                        }}
                        className="space-y-8"
                    >
                        <div className="bg-gray-600/65 rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
                            <div className="space-y-2">
                                {currentQuestion.options.map((option) => (
                                    <label key={option} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={selected.includes(option)}
                                            onChange={() =>
                                                handleCheckboxChange(currentQuestion.id, option)
                                            }
                                        />
                                        <span className="italic">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-300"
                                disabled={selected.length === 0}
                            >
                                {currentQuestionIndex === questions.length - 1 ? "Selesai" : "Lanjut"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    );
}