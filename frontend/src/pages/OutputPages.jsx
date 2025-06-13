import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OutputPages() {
  const { state } = useLocation();
  const answers = state?.answers || {};

  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const payload = {
          watched: answers.films || [],
          genres: answers.genres || [],
          contentTypes: answers.mediaTypes || [],
        };

        const { data } = await axios.post(
          'http://localhost:9000/recommend',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        const filtered = data.recommendations.filter(
          (rec) => !(answers.films || []).includes(rec.title)
        );

        const formatted = filtered.map((rec) => ({
          title: rec.title,
        }));

        setRecs(formatted);
      } catch (err) {
        console.error('Gagal fetch rekomendasi:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecs();
  }, [answers]);

  if (loading) {
    return (
      <div className="text-white text-center mt-20">Memuat rekomendasi…</div>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col text-white">
      <Navbar />
      <div className="fixed inset-0 -z-10">
        <img
          src="/src/assets/background-netflix.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 mb-32">
        <h1 className="text-3xl font-bold mb-6">Rekomendasi Film untukmu</h1>

        {recs.length === 0 ? (
          <p>Tidak ada rekomendasi yang cocok.</p>
        ) : (
          <div className="space-y-4">
            {recs.map((movie, i) => (
              <div key={i} className="flex items-center bg-gray-100 rounded p-4">
                <div className="ml-4 text-black">
                  <h3 className="font-semibold text-lg">{movie.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Link to="/" className="bg-gray-500 px-4 py-2 rounded">Back Home</Link>
          <button onClick={() => window.location.reload()} className="bg-blue-700 px-4 py-2 rounded">
            Refresh
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
