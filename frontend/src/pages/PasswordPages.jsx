import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PasswordPages = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setErrorMessage('New password and confirmation do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:9000/profile/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    confirmNewPassword: confirmNewPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to change password');
            }

            setSuccessMessage(data.message || 'Password changed successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <Navbar />
            <section className="relative flex justify-center items-center w-full min-h-screen">
                {/* Background Image */}
                <div className="absolute inset-0 z-[-1]">
                    <img
                        src="./src/assets/panggung.jpg"
                        alt="background panggung"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Konten */}
                <div className="w-full max-w-7xl mx-10 md:mx-20 p-8 bg-white rounded-lg shadow-md mt-20 mb-20 z-10">
                    <div className="flex mb-4 space-x-4">
                        <a href="/profile" className="bg-red-600 text-white py-2 px-4 rounded">Account</a>
                        <a href="/password" className="bg-red-300 text-white py-2 px-4 rounded">Password</a>
                    </div>

                    <h2 className="text-2xl font-semibold mb-6">Change Password</h2>

                    {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
                    {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Input fields */}
                        <div>
                            <label className="block text-gray-700">Current Password</label>
                            <input
                                type="password"
                                className="mt-1 p-2 w-full border border-gray-300 rounded"
                                placeholder="current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>

                        <div className='mt-1 p-2 w-full'>
                        </div>

                        <div>
                            <label className="block text-gray-700">New Password</label>
                            <input
                                type="password"
                                className="mt-1 p-2 w-full border border-gray-300 rounded"
                                placeholder="new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Confirm New Password</label>
                            <input
                                type="password"
                                className="mt-1 p-2 w-full border border-gray-300 rounded"
                                placeholder="confirm new password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </div>

                        {/* Buttons: Span full width */}
                        <div className="col-span-1 md:col-span-2 flex justify-between mt-4">
                            <button className="bg-blue-600 text-white py-2 px-6 rounded">
                                <span className="material-icons">Save</span>
                            </button>

                            <button href="/#" className="bg-gray-300 text-gray-700 py-2 px-6 rounded">
                                <span className="material-icons">Cancel</span>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default PasswordPages;
