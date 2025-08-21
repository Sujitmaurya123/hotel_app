import React from "react";

type OfferCardProps = {
    tag?: string;
    expired?: boolean;
    image: string;
    title: string;
    rating: number;
    features: string[];
    price: string;
    discount?: string;
};

const OfferCard: React.FC<OfferCardProps> = ({
    tag,
    expired,
    image,
    title,
    rating,
    features,
    price,
    discount,
}) => {
    return (
        <div className="w-72 bg-white shadow-md rounded-xl overflow-hidden border">
            <div className="relative">
                <img src={image} alt={title} className={`w-full h-48 object-cover ${expired ? "opacity-50" : ""}`} />
                {tag && (
                    <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                        {tag}
                    </span>
                )}
                {expired && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-gray-800 bg-opacity-70 text-white px-4 py-1 rounded">
                            Expired
                        </span>
                    </div>
                )}
                {discount && (
                    <span className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        {discount} Off
                    </span>
                )}
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <span className="flex items-center text-yellow-500 font-bold">
                        ★ {rating}
                    </span>
                </div>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            {feature}
                        </li>
                    ))}
                </ul>
                <div className="mt-3 text-lg font-bold">{price}/night</div>
                <button
                    className="mt-3 w-full bg-gray-700 hover:bg-gray-900 text-white py-2 rounded"
                    disabled={expired}
                >
                    Book this Offer
                </button>
            </div>
        </div>
    );
};

export default function AllOffers() {
    const offers: OfferCardProps[] = [
        {
            tag: "Limited Time",
            expired: true,
            image: "/heroimage/img1.png",
            title: "Gourmet Dining Experience",
            rating: 4.7,
            features: ["7-Course Tasting", "Wine Pairing", "Chef’s Table", "Welcome Cocktail"],
            price: "₹4500",
            discount: "20%",
        },
        {
            tag: "Best Value",
            image: "/heroimage/img2.png",
            title: "Luxury Standard Plus",
            rating: 4.7,
            features: ["Free WiFi", "Separate sitting area", "Valet Parking", "Dual Zone Climate"],
            price: "₹4500",
            discount: "27%",
        },
        {
            tag: "Best Value",
            image: "/heroimage/img3.png",
            title: "Luxury Standard Plus",
            rating: 4.7,
            features: ["Free WiFi", "Separate sitting area", "Valet Parking", "Dual Zone Climate"],
            price: "₹4500",
            discount: "27%",
        },
        {
            tag: "Seasonal",
            image: "/heroimage/img4.png",
            title: "Wedding Celebration Package",
            rating: 4.7,
            features: ["Grand Ballroom", "Wedding Cake", "Photography", "Floral Arrangements"],
            price: "₹4500",
            discount: "27%",
        },
    ];

    return (
        <div className="py-10 px-4 mt-9">
            <div className="text-center mb-8">
                <h2 className="text-xl font-bold">Exclusive Offers & Packages</h2>
                <p className="text-gray-600 mt-2 max-w-xl mx-auto">
                    Discover our curated selection of luxury experiences and special packages
                    designed to create unforgettable memories
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {offers.map((offer, i) => (
                    <OfferCard key={i} {...offer} />
                ))}
            </div>
        </div>
    );
}
