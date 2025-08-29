import React, { useState } from "react";
import { FaStar, FaUsers, FaMapMarkerAlt, FaCheck, FaUtensils, FaParking, FaMusic, FaWifi } from "react-icons/fa";

interface Hall {
    id: number;
    name: string;
    price: string;
    capacity: string;
    rating: number;
    reviews: number;
    image: string;
    location: string;
    features: string[];
    description: string;
}

const halls: Hall[] = [
    {
        id: 1,
        name: "Grand Ballroom",
        price: "₹25,000 / Day",
        capacity: "300-500 guests",
        rating: 4.7,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFucXVldCUyMGhhbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        location: "Connaught Place, Delhi",
        features: ["Catering Kitchen", "Air Conditioning", "Audio/Visual Equipment", "Parking", "WiFi", "Stage"],
        description: "Elegant ballroom with crystal chandeliers and premium amenities for weddings and corporate events."
    },
    {
        id: 2,
        name: "Royal Palace Hall",
        price: "₹35,000 / Day",
        capacity: "200-400 guests",
        rating: 4.9,
        reviews: 95,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFucXVldCUyMGhhbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        location: "Rajouri Garden, Delhi",
        features: ["Catering Kitchen", "Air Conditioning", "Premium Sound System", "Valet Parking", "WiFi", "Dance Floor"],
        description: "Luxurious banquet hall with royal decor and state-of-the-art facilities for memorable events."
    },
    {
        id: 3,
        name: "Garden View Pavilion",
        price: "₹20,000 / Day",
        capacity: "150-250 guests",
        rating: 4.5,
        reviews: 86,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFucXVldCUyMGhhbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        location: "Saket, Delhi",
        features: ["Outdoor Space", "Air Conditioning", "Basic Sound System", "Parking", "Garden Area"],
        description: "Beautiful pavilion with garden views, perfect for intimate weddings and celebrations."
    },
    {
        id: 4,
        name: "Modern Events Space",
        price: "₹30,000 / Day",
        capacity: "250-400 guests",
        rating: 4.6,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFucXVldCUyMGhhbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        location: "Cyber City, Gurgaon",
        features: ["Catering Kitchen", "Air Conditioning", "High-tech AV System", "Underground Parking", "WiFi", "LED Lighting"],
        description: "Contemporary event space with cutting-edge technology and sleek design for modern gatherings."
    },
];

const eventTypes = [
    "Wedding Reception",
    "Corporate Event",
    "Birthday Party",
    "Anniversary",
    "Conference",
    "Seminar",
    "Baby Shower",
    "Other"
];

const timeSlots = [
    "Morning (9 AM - 12 PM)",
    "Afternoon (12 PM - 4 PM)",
    "Evening (4 PM - 8 PM)",
    "Night (8 PM - 12 AM)",
    "Full Day (9 AM - 12 AM)"
];

const capacityRanges = [
    "Less than 100",
    "100-200",
    "200-300",
    "300-400",
    "400-500",
    "500+"
];

const BanquetBooking: React.FC = () => {
    const [eventType, setEventType] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [capacityRange, setCapacityRange] = useState("");
    const [selectedHall, setSelectedHall] = useState<Hall | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [bookingStep, setBookingStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        eventDetails: ""
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would filter halls based on search criteria
        alert("Searching for halls with your criteria...");
    };

    const handleGetQuote = (hall: Hall) => {
        setSelectedHall(hall);
        setShowModal(true);
        setBookingStep(1);
    };

    const handleBooking = () => {
        if (bookingStep < 3) {
            setBookingStep(bookingStep + 1);
        } else {
            // In a real app, this would submit the booking to a backend
            alert(`Booking confirmed for ${selectedHall?.name}! We'll contact you shortly.`);
            setShowModal(false);
            setBookingStep(1);
        }
    };

    const featureIcons: Record<string, React.JSX.Element> = {
        "Catering Kitchen": <FaUtensils className="inline mr-1" />,
        "Parking": <FaParking className="inline mr-1" />,
        "Valet Parking": <FaParking className="inline mr-1" />,
        "Underground Parking": <FaParking className="inline mr-1" />,
        "Audio/Visual Equipment": <FaMusic className="inline mr-1" />,
        "Premium Sound System": <FaMusic className="inline mr-1" />,
        "High-tech AV System": <FaMusic className="inline mr-1" />,
        "Basic Sound System": <FaMusic className="inline mr-1" />,
        "WiFi": <FaWifi className="inline mr-1" />,
        "Stage": <FaMusic className="inline mr-1" />,
        "Dance Floor": <FaMusic className="inline mr-1" />,
        "LED Lighting": <FaMusic className="inline mr-1" />,
    };

    const getDefaultIcon = () => <FaCheck className="inline mr-1" />;

    return (
        <div className="w-full min-h-screen bg-gray-50 mt-[80px]">
            {/* Hero Section */}
            <div className="relative w-full h-64 md:h-96">
                <img
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    alt="Banquet Hall"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Premium Banquet Hall Booking</h1>
                    <p className="text-lg md:text-xl max-w-2xl">
                        Host your special events in our elegant banquet halls with complete amenities and professional service
                    </p>
                </div>
            </div>

            {/* Booking Form */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg p-6 -mt-20 relative z-10">
                    <h2 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Event Space</h2>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                            <select
                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value)}
                                required
                            >
                                <option value="">Select event type</option>
                                {eventTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                            <input
                                type="number"
                                placeholder="No. of guests"
                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                min="1"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                            <select
                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                value={timeSlot}
                                onChange={(e) => setTimeSlot(e.target.value)}
                                required
                            >
                                <option value="">Select time slot</option>
                                {timeSlots.map(slot => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                            <select
                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                value={capacityRange}
                                onChange={(e) => setCapacityRange(e.target.value)}
                            >
                                <option value="">Select capacity</option>
                                {capacityRanges.map(range => (
                                    <option key={range} value={range}>{range}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-1 flex items-end">
                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Features Section */}
                <div className="my-12 text-center">
                    <h2 className="text-3xl font-bold mb-6">Why Choose Our Banquet Halls?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="text-orange-500 text-3xl mb-4">
                                <FaUsers />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Large Capacity</h3>
                            <p className="text-gray-600">Spaces for up to 500 guests with comfortable seating</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="text-orange-500 text-3xl mb-4">
                                <FaUtensils />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Catering Options</h3>
                            <p className="text-gray-600">In-house catering with customizable menus</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="text-orange-500 text-3xl mb-4">
                                <FaMusic />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">AV Equipment</h3>
                            <p className="text-gray-600">State-of-the-art audio visual systems</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="text-orange-500 text-3xl mb-4">
                                <FaParking />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Ample Parking</h3>
                            <p className="text-gray-600">Convenient parking facilities for all guests</p>
                        </div>
                    </div>
                </div>

                {/* Available Halls */}
                <div className="my-12">
                    <h2 className="text-3xl font-bold mb-6">Available Halls</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {halls.map((hall) => (
                            <div key={hall.id} className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="relative">
                                    <img
                                        src={hall.image}
                                        alt={hall.name}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute top-4 left-4 flex items-center bg-white rounded-full px-3 py-1 text-sm font-medium shadow">
                                        <FaStar className="text-yellow-500 mr-1" /> {hall.rating} <span className="text-gray-500 ml-1">({hall.reviews})</span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {hall.price}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-xl">{hall.name}</h3>
                                            <div className="flex items-center text-gray-600 mt-1">
                                                <FaMapMarkerAlt className="mr-2" /> {hall.location}
                                            </div>
                                        </div>
                                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {hall.capacity}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 my-4">{hall.description}</p>

                                    <div className="flex flex-wrap gap-2 my-4">
                                        {hall.features.map((feature, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full flex items-center"
                                            >
                                                {featureIcons[feature] || getDefaultIcon()} {feature}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handleGetQuote(hall)}
                                        className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition duration-300"
                                    >
                                        Check Availability & Get Quote
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showModal && selectedHall && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Book {selectedHall.name}</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="flex mt-4">
                                <div className={`flex-1 text-center border-b-2 ${bookingStep >= 1 ? 'border-orange-500 text-orange-500' : 'border-gray-300 text-gray-400'} pb-2`}>
                                    <span className="bg-orange-500 text-white rounded-full h-8 w-8 inline-flex items-center justify-center">1</span>
                                    <span className="ml-2">Details</span>
                                </div>
                                <div className={`flex-1 text-center border-b-2 ${bookingStep >= 2 ? 'border-orange-500 text-orange-500' : 'border-gray-300 text-gray-400'} pb-2`}>
                                    <span className={`rounded-full h-8 w-8 inline-flex items-center justify-center ${bookingStep >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'}`}>2</span>
                                    <span className="ml-2">Review</span>
                                </div>
                                <div className={`flex-1 text-center border-b-2 ${bookingStep >= 3 ? 'border-orange-500 text-orange-500' : 'border-gray-300 text-gray-400'} pb-2`}>
                                    <span className={`rounded-full h-8 w-8 inline-flex items-center justify-center ${bookingStep >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'}`}>3</span>
                                    <span className="ml-2">Confirm</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {bookingStep === 1 && (
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Your Event Details</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                            <input
                                                type="text"
                                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Details (Optional)</label>
                                            <textarea
                                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                rows={3}
                                                value={formData.eventDetails}
                                                onChange={(e) => setFormData({ ...formData, eventDetails: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {bookingStep === 2 && (
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Review Your Booking</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                        <h4 className="font-medium text-lg">{selectedHall.name}</h4>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <div className="text-gray-600">Date:</div>
                                            <div>{date || "Not specified"}</div>

                                            <div className="text-gray-600">Time Slot:</div>
                                            <div>{timeSlot || "Not specified"}</div>

                                            <div className="text-gray-600">Guests:</div>
                                            <div>{guests || "Not specified"}</div>

                                            <div className="text-gray-600">Event Type:</div>
                                            <div>{eventType || "Not specified"}</div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-lg">Your Information</h4>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <div className="text-gray-600">Name:</div>
                                            <div>{formData.name}</div>

                                            <div className="text-gray-600">Email:</div>
                                            <div>{formData.email}</div>

                                            <div className="text-gray-600">Phone:</div>
                                            <div>{formData.phone}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {bookingStep === 3 && (
                                <div className="text-center py-8">
                                    <div className="text-green-500 text-5xl mb-4">✓</div>
                                    <h3 className="text-2xl font-medium mb-2">Ready to Confirm?</h3>
                                    <p className="text-gray-600 mb-6">By confirming, you agree to our terms and conditions. A representative will contact you within 24 hours to finalize details.</p>
                                </div>
                            )}

                            <div className="flex justify-between mt-8">
                                {bookingStep > 1 ? (
                                    <button
                                        onClick={() => setBookingStep(bookingStep - 1)}
                                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                                    >
                                        Back
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                <button
                                    onClick={handleBooking}
                                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium"
                                >
                                    {bookingStep === 3 ? 'Confirm Booking' : 'Continue'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BanquetBooking;