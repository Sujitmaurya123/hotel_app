

export default function HotelCard() {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg p-6 gap-6 max-w-5xl mx-auto border border-gray-200">
            {/* Left Section */}
            <div className="flex-1">
                <h2 className="text-2xl font-semibold">
                    <span className="text-amber-500">Hotel</span>{" "}
                    <span className="text-gray-700">Laxmi</span>{" "}
                    <span className="text-blue-800">Vilas Palace</span>
                </h2>
                <div className="my-2 border-t border-amber-200 w-20"></div>
                <p className="text-gray-600 mt-4 leading-relaxed">
                    Surrounded by tranquil gardens and timeless design, every corner of
                    Laxmi Vilas Palace reflects royal elegance. Relax in intricately
                    designed rooms, dine under the stars, or host grand celebrations —
                    where every experience feels truly majestic.
                </p>
            </div>

            {/* Right Section - Image */}
            <div className="flex-1">
                <img
                    src="heroimage/hotel1.png" // Replace with your image path
                    alt="Hotel Laxmi Vilas Palace"
                    className="w-full h-auto rounded-md shadow-md"
                />
            </div>
        </div>
    );
}
