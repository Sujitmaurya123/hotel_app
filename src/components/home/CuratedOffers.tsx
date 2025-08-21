import type{ FC } from "react";
import { FaStar } from "react-icons/fa";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface Offer {
    id: number;
    title: string;
    image: string;
    price: string;
    discount: string;
    rating: number;
    reviews: number;
}

const offers: Offer[] = [
    {
        id: 1,
        title: "Deluxe King Room",
        image:
            "heroimage/room1.png",
        price: "₹4500/night",
        discount: "20% Off",
        rating: 4.7,
        reviews: 243,
    },
    {
        id: 2,
        title: "Dining",
        image:
            "heroimage/room2.png",
        price: "₹4500/night",
        discount: "20% Off",
        rating: 4.7,
        reviews: 243,
    },
    {
        id: 3,
        title: "Banquet",
        image:
            "heroimage/room3.png",
        price: "₹4500/night",
        discount: "20% Off",
        rating: 4.7,
        reviews: 243,
    },
];

const CuratedOffers: FC = () => {
    return (
        <section className="py-12 bg-white">
            {/* Heading */}
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Our Curated Offers
                </h2>
                <p className="text-gray-500 mt-2">
                    Exclusive offers tailored to your stay, indulge in luxury without the
                    extra cost.
                </p>
            </div>

            {/* Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className="border rounded-lg overflow-hidden shadow-sm relative hover:shadow-lg transition"
                    >
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="w-full h-48 object-cover"
                            />
                            <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                                <Heart className="w-5 h-5 text-gray-500 hover:text-red-500" />
                            </button>
                            <span className="absolute bottom-2 right-2 bg-white text-sm px-2 py-0.5 rounded shadow">
                                {offer.discount}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800">{offer.title}</h3>
                            <p className="text-gray-700 font-medium">{offer.price}</p>

                            {/* Rating */}
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                                <FaStar className="text-yellow-500 mr-1" />
                                <span>
                                    {offer.rating} ({offer.reviews} reviews)
                                </span>
                            </div>

                            {/* Button */}
                            <button className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md transition">
                                Book now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All */}
            <div className="flex justify-center mt-8">
                <button className="px-6 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition">
                   <Link to="/all-offers">
                    View all offers
                   </Link>
                </button>
            </div>
        </section>
    );
};

export default CuratedOffers;
