import React, { useState } from "react";
import { Link } from "react-router-dom";

const ReservationForm: React.FC = () => {
    const [arrival, setArrival] = useState("");
    const [departure, setDeparture] = useState("");
    const [rooms, setRooms] = useState("");
    const [adults, setAdults] = useState("");
    const [children, setChildren] = useState("");
    const [codeType, setCodeType] = useState("");
    const [code, setCode] = useState("");

    const isFormComplete =
        arrival &&
        departure &&
        rooms &&
        adults !== "" &&
        children !== "" &&
        (codeType ? code : true);

    return (
        <div className="flex h-screen mt-9">
            {/* Sidebar */}
            <aside className="bg-gray-600 text-white w-64 p-6 flex flex-col">
                <h2 className="text-lg font-semibold mb-6">Reservation</h2>
                <nav className="space-y-4">
                    <Link className="flex items-center hover:text-amber-300" to="/booknow">
                        <span className="mr-2">🏨</span> Rooms
                    </Link>
                    <Link className="flex items-center text-amber-500" to="/dining">
                        <span className="mr-2">🍽️</span> Dining
                    </Link>
                    <Link className="flex items-center hover:text-amber-300" to="/events">
                        <span className="mr-2">📅</span> Events
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white p-10">
                <div className="grid grid-cols-2 gap-6 max-w-2xl">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Arrival</label>
                        <input
                            type="date"
                            value={arrival}
                            onChange={(e) => setArrival(e.target.value)}
                            className="border border-amber-300 p-2 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Departure</label>
                        <input
                            type="date"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            className="border border-amber-300 p-2 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Rooms</label>
                        <select
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                            className="border border-amber-300 p-2 rounded w-full"
                        >
                            <option value="">Select Rooms</option>
                            {[1, 2, 3, 4, 5].map((r) => (
                                <option key={r} value={r}>{r} Room{r > 1 ? "s" : ""}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Guests</label>
                        <div className="grid grid-cols-2 gap-2">
                            <select
                                value={adults}
                                onChange={(e) => setAdults(e.target.value)}
                                className="border border-amber-300 p-2 rounded w-full"
                            >
                                <option value="">Adults</option>
                                {[1, 2, 3, 4].map((a) => (
                                    <option key={a} value={a}>{a} Adult{a > 1 ? "s" : ""}</option>
                                ))}
                            </select>
                            <select
                                value={children}
                                onChange={(e) => setChildren(e.target.value)}
                                className="border border-amber-300 p-2 rounded w-full"
                            >
                                <option value="">Children</option>
                                {[0, 1, 2, 3].map((c) => (
                                    <option key={c} value={c}>{c} Child{c > 1 ? "ren" : ""}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Discount Code Type</label>
                        <select
                            value={codeType}
                            onChange={(e) => setCodeType(e.target.value)}
                            className="border border-amber-300 p-2 rounded w-full"
                        >
                            <option value="">Select Code Type</option>
                            <option value="promo">Promo Code</option>
                            <option value="group">Group Code</option>
                        </select>
                    </div>

                    {codeType && (
                        <div>
                            <label className="block mb-1 text-sm font-medium">Enter Code</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Enter your code"
                                className="border border-amber-300 p-2 rounded w-full"
                            />
                        </div>
                    )}
                </div>

                <button
                    className={`px-6 py-2 mt-6 rounded ${isFormComplete
                            ? "bg-amber-400 text-white hover:bg-amber-500"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                    disabled={!isFormComplete}
                >
                    Book Now
                </button>

                {/* Right Info Box */}
                <div className="border border-amber-300 p-4 w-60 mt-10">
                    <h3 className="font-semibold mb-4">Why Book with us?</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center">
                            <span className="mr-2">👤</span> Member Rates
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">🏷️</span> Special Offers
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">📶</span> Free Wi-Fi
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default ReservationForm;
