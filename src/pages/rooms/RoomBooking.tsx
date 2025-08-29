import React, { useState } from "react";
import { FaStar, FaHeart, FaRegHeart, FaUsers, FaCalendarAlt, FaCheck } from "react-icons/fa";

interface Room {
    id: number;
    name: string;
    rating: number;
    reviews: number;
    price: number;
    perNight: boolean;
    image: string;
    tag?: string;
    available: boolean;
    description: string;
    amenities: string[];
    maxGuests: number;
}

const rooms: Room[] = [
    {
        id: 1,
        name: "Deluxe King Room",
        rating: 4.7,
        reviews: 243,
        price: 4500,
        perNight: true,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        tag: "20% off",
        available: true,
        description: "Spacious room with a king-sized bed, city view, and modern amenities.",
        amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar", "Safe"],
        maxGuests: 3
    },
    {
        id: 2,
        name: "Premium Suite",
        rating: 4.9,
        reviews: 210,
        price: 8500,
        perNight: true,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        available: true,
        description: "Luxurious suite with separate living area, premium furnishings, and panoramic views.",
        amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar", "Safe", "Jacuzzi", "Kitchenette"],
        maxGuests: 4
    },
    {
        id: 3,
        name: "Family Deluxe Room",
        rating: 4.7,
        reviews: 198,
        price: 8500,
        perNight: true,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        available: false,
        description: "Perfect for families with extra space, multiple beds, and child-friendly amenities.",
        amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar", "Safe", "Extra Beds"],
        maxGuests: 5
    },
];

const RoomBooking: React.FC = () => {
    const [guests, setGuests] = useState(2);
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [activeCategory, setActiveCategory] = useState("All Rooms");
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    const toggleFavorite = (id: number) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(favId => favId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const handleBookNow = (room: Room) => {
        setSelectedRoom(room);
        setShowBookingModal(true);
        setBookingConfirmed(false);
    };

    const handleConfirmBooking = () => {
        // In a real app, you would send this data to a backend
        setBookingConfirmed(true);
        setTimeout(() => {
            setShowBookingModal(false);
        }, 2000);
    };

    const filteredRooms = activeCategory === "All Rooms"
        ? rooms
        : rooms.filter(room => room.name.toLowerCase().includes(activeCategory.toLowerCase()));

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 mt-[80px]">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">Find Your Perfect Room</h1>

                {/* Search Filters */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-3">
                            <div className="flex items-center text-gray-600 mb-1">
                                <FaCalendarAlt className="mr-2" />
                                <span className="text-sm">Check-in</span>
                            </div>
                            <input
                                type="date"
                                className="w-full border-none p-0 focus:ring-0"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                            />
                        </div>

                        <div className="border rounded-lg p-3">
                            <div className="flex items-center text-gray-600 mb-1">
                                <FaCalendarAlt className="mr-2" />
                                <span className="text-sm">Check-out</span>
                            </div>
                            <input
                                type="date"
                                className="w-full border-none p-0 focus:ring-0"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                            />
                        </div>

                        <div className="border rounded-lg p-3">
                            <div className="flex items-center text-gray-600 mb-1">
                                <FaUsers className="mr-2" />
                                <span className="text-sm">Guests</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                                        className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={() => setGuests((g) => g + 1)}
                                        className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Room Category Filter */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {["All Rooms", "Deluxe", "Premium", "Family"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full border transition ${cat === activeCategory
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Horizontal Room Scroll */}
                <div className="flex overflow-x-auto gap-4 py-4 mb-6 scrollbar-hide">
                    {filteredRooms.map((room) => (
                        <div
                            key={room.id}
                            className="min-w-[280px] bg-white rounded-lg shadow-md relative flex-shrink-0 transition-transform hover:scale-105"
                        >
                            <img
                                src={room.image}
                                alt={room.name}
                                className="h-48 w-full object-cover rounded-t-lg"
                            />
                            {room.tag && (
                                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                                    {room.tag}
                                </span>
                            )}
                            <div className="absolute top-2 left-2 flex items-center bg-white rounded-full px-2 py-1 text-xs font-medium shadow">
                                <FaStar className="text-yellow-500 mr-1" /> {room.rating}
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-1">{room.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                                <div className="flex items-center text-sm text-gray-600 mb-2">
                                    <FaStar className="text-yellow-500 mr-1" />
                                    {room.rating} <span className="ml-1">({room.reviews} reviews)</span>
                                </div>
                                <p className="font-bold text-xl mb-2">
                                    ₹{room.price.toLocaleString()}
                                    {room.perNight && <span className="text-sm text-gray-500 font-normal">/night</span>}
                                </p>
                                <button
                                    onClick={() => handleBookNow(room)}
                                    disabled={!room.available}
                                    className={`w-full py-2 rounded-lg font-medium ${room.available
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        } transition`}
                                >
                                    {room.available ? 'Book Now' : 'Not Available'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Vertical Room List */}
                <div className="space-y-4">
                    {filteredRooms.map((room) => (
                        <div
                            key={room.id}
                            className="bg-white rounded-lg shadow-md flex flex-col md:flex-row items-start p-4 md:p-6 transition hover:shadow-lg"
                        >
                            <div className="relative mb-4 md:mb-0 md:mr-6">
                                <img
                                    src={room.image}
                                    alt={room.name}
                                    className="h-48 w-full md:w-64 object-cover rounded-lg"
                                />
                                {room.tag && (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                                        {room.tag}
                                    </span>
                                )}
                                <div className="absolute top-2 left-2 flex items-center bg-white rounded-full px-2 py-1 text-xs font-medium shadow">
                                    <FaStar className="text-yellow-500 mr-1" /> {room.rating}
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-xl mb-1">{room.name}</h3>
                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <FaStar className="text-yellow-500 mr-1" />
                                            {room.rating} <span className="ml-1">({room.reviews} reviews)</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleFavorite(room.id)}
                                        className="text-xl text-gray-500 hover:text-red-500 transition"
                                    >
                                        {favorites.includes(room.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                                    </button>
                                </div>

                                <p className="text-gray-600 mb-3">{room.description}</p>

                                <div className="mb-3">
                                    <h4 className="font-medium mb-1">Amenities:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {room.amenities.map((amenity, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <p className="font-bold text-2xl mb-2 md:mb-0">
                                        ₹{room.price.toLocaleString()}
                                        {room.perNight && <span className="text-sm text-gray-500 font-normal">/night</span>}
                                    </p>

                                    <button
                                        onClick={() => handleBookNow(room)}
                                        disabled={!room.available}
                                        className={`px-6 py-2 rounded-lg font-medium ${room.available
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            } transition`}
                                    >
                                        {room.available ? 'Book Now' : 'Not Available'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && selectedRoom && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        {bookingConfirmed ? (
                            <div className="p-6 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaCheck className="text-green-600 text-2xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
                                <p className="text-gray-600 mb-4">Your booking for {selectedRoom.name} has been confirmed.</p>
                                <button
                                    onClick={() => setShowBookingModal(false)}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="p-6 border-b">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Book {selectedRoom.name}</h2>
                                    <img
                                        src={selectedRoom.image}
                                        alt={selectedRoom.name}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                        <FaStar className="text-yellow-500 mr-1" />
                                        {selectedRoom.rating} <span className="ml-1">({selectedRoom.reviews} reviews)</span>
                                    </div>
                                    <p className="text-gray-600 mb-4">{selectedRoom.description}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                                            <input
                                                type="date"
                                                className="w-full border rounded-lg p-2"
                                                value={checkInDate}
                                                onChange={(e) => setCheckInDate(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                                            <input
                                                type="date"
                                                className="w-full border rounded-lg p-2"
                                                value={checkOutDate}
                                                onChange={(e) => setCheckOutDate(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                                        <div className="flex items-center justify-between border rounded-lg p-2">
                                            <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                                                    className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                                                >
                                                    -
                                                </button>
                                                <button
                                                    onClick={() => setGuests((g) => g + 1)}
                                                    disabled={guests >= selectedRoom.maxGuests}
                                                    className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Max {selectedRoom.maxGuests} guests</p>
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-600">₹{selectedRoom.price} x 3 nights</span>
                                            <span className="font-medium">₹{(selectedRoom.price * 3).toLocaleString()}</span>
                                        </div>
                                        {selectedRoom.tag && (
                                            <div className="flex justify-between mb-2 text-green-600">
                                                <span>Discount ({selectedRoom.tag})</span>
                                                <span>-₹900</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-600">Taxes & Fees</span>
                                            <span className="font-medium">₹500</span>
                                        </div>
                                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                            <span>Total</span>
                                            <span>₹{((selectedRoom.price * 3) - (selectedRoom.tag ? 900 : 0) + 500).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowBookingModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmBooking}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomBooking;