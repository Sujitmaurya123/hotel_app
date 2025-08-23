import React, { useState } from "react";
import { Link } from "react-router-dom";

const EventsReservation: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        timeSlot: "",
        startDate: "",
        endDate: "",
        eventType: "",
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
        formData.timeSlot &&
        formData.startDate &&
        formData.endDate &&
        formData.eventType &&
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

                    <select
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded col-span-2"
                    >
                        <option value="">Time Slot</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                    </select>

                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded"
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded"
                    />

                    <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded"
                    >
                        <option value="">Events Type</option>
                        <option value="wedding">Wedding</option>
                        <option value="conference">Conference</option>
                        <option value="party">Party</option>
                    </select>
                    <select
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        className="border border-amber-300 p-2 rounded"
                    >
                        <option value="">Capacity Range</option>
                        <option value="1-50">1-50</option>
                        <option value="51-100">51-100</option>
                        <option value="101-200">101-200</option>
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
                        {[...Array(20)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
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

export default EventsReservation;
