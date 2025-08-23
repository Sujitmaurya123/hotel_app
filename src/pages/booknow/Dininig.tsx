import React, { useState } from "react";
import { Link } from "react-router-dom";

const DiningReservation: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        date: "",
        timeSlot: "",
        specialFor: "",
        capacity: "",
        guestEmail: "",
        guests: "",
        specialRequest: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isFormValid =
        formData.fullName &&
        formData.phone &&
        formData.email &&
        formData.date &&
        formData.timeSlot &&
        formData.specialFor &&
        formData.capacity &&
        formData.guestEmail &&
        formData.guests;

    return (
        <div className="flex h-screen mt-9">
            {/* Sidebar */}
            <aside className="bg-gray-600 text-white w-64 p-6 flex flex-col">
                <h2 className="text-lg font-semibold mb-6">Reservation</h2>
                <nav className="space-y-4">
                    <button className="flex items-center hover:text-amber-300">
                        <Link to="/booknow"><span className="mr-2">🏨</span> Rooms
                     </Link>   
                    </button>
                    <button className="flex items-center text-amber-500">
                        <Link to="/dining"><span className="mr-2">🍽️</span> Dining
                      </Link>  
                    </button>
                    <button className="flex items-center hover:text-amber-300">
                        <Link to="/events"> <span className="mr-2">📅</span> Events
                    </Link>    
                    </button>
                </nav>
            </aside>

            {/* Main Form */}
            <main className="flex-1 bg-white p-10">
                <div className="grid grid-cols-2 gap-4 max-w-3xl">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded col-span-2"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded col-span-2"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded col-span-2"
                    />

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded"
                    />
                    <select
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded"
                    >
                        <option value="">Time Slot</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                    </select>

                    <input
                        type="text"
                        name="specialFor"
                        placeholder="Special for"
                        value={formData.specialFor}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded"
                    />
                    <select
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded"
                    >
                        <option value="">Capacity Range</option>
                        <option value="1-5">1-5</option>
                        <option value="6-10">6-10</option>
                        <option value="11-20">11-20</option>
                    </select>

                    <input
                        type="email"
                        name="guestEmail"
                        placeholder="Guest Email"
                        value={formData.guestEmail}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded"
                    />
                    <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded"
                    >
                        <option value="">Guests</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>

                    <textarea
                        name="specialRequest"
                        placeholder="Special Request..."
                        value={formData.specialRequest}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded col-span-2 h-24"
                    />
                </div>

                <button
                    className={`px-6 py-2 mt-6 rounded ${isFormValid
                            ? "bg-amber-500 text-white hover:bg-amber-600"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                    disabled={!isFormValid}
                >
                    Book now
                </button>
            </main>
        </div>
    );
};

export default DiningReservation;
