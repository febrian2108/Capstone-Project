import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function QuestionPages() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [genresRes, mediaTypesRes] = await Promise.all([
          axios.get("http://localhost:9000/genres"),
          axios.get("http://localhost:9000/mediaTypes"),
        ]);

        const qList = [
          {
            id: "genres",
            question: "Genre seperti apa yang kamu sukai?",
            options: genresRes.data,
          },
          {
            id: "mediaTypes",
            question: "Content type atau media type mana yang lebih kamu suka?",
            options: mediaTypesRes.data,
          },
          {
            id: "films",
            question: "Film seperti apa yang pernah kamu tonton?",
            options: [],
          },
        ];

        setQuestions(qList);
        setLoading(false);
      } catch (err) {
        console.error("Gagal fetch data:", err);
        Swal.fire("Gagal memuat opsi dari server", "", "error");
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleCheckboxChange = (qId, value) => {
    const prev = answers[qId] || [];
    const updated = prev.includes(value)
      ? prev.filter((v) => v !== value)
      : [...prev, value];

    setAnswers({ ...answers, [qId]: updated });
  };

  const handleNext = async () => {
    const currentId = questions[currentQuestionIndex].id;

    if (currentId === "mediaTypes") {
      try {
        const payload = {
          genres: answers.genres || [],
          contentTypes: answers.mediaTypes || [],
        };

        const res = await axios.post(
          "http://localhost:9000/films/filter",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const filmOptions = res.data.data.map((film) => film.title);
        const updatedQuestions = [...questions];
        updatedQuestions.find((q) => q.id === "films").options = filmOptions;
        setQuestions(updatedQuestions);
      } catch (err) {
        console.error(err);
        Swal.fire("Gagal memuat film sesuai pilihan kamu", "", "error");
        return;
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
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

  if (loading || !questions[currentQuestionIndex]) {
    return <div className="text-white text-center mt-20">Memuat pertanyaan...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selected = answers[currentQuestion.id] || [];

  return (
    <main className="relative min-h-screen flex flex-col text-white">
      <div className="fixed inset-0 -z-10">
        <img
          src="./src/assets/background-netflix.jpg"
          alt="background-netflix"
          className="w-full h-full object-cover"
        />
      </div>

      <Navbar />

      <section className="flex flex-1 justify-center items-center px-4 py-10">
        <div className="text-white rounded-xl shadow-md p-6 w-full max-w-3xl bg-gray-900/70">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-8"
          >
            <div className="bg-gray-600/65 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {currentQuestion.options.length > 0 ? (
                  currentQuestion.options.map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        value={option}
                        checked={selected.includes(option)}
                        onChange={() => handleCheckboxChange(currentQuestion.id, option)}
                        className="cursor-pointer"
                      />
                      <span className="italic">{option}</span>
                    </label>
                  ))
                ) : (
                  <p>Tidak ada opsi yang tersedia.</p>
                )}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-300 disabled:opacity-50"
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
