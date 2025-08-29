import { Heart, Utensils, Bed } from "lucide-react";

type Item = {
    id: number;
    title: string;
    subtitle: string;
    rating: number;
    price: number;
    type: "food" | "room";
};

const items: Item[] = [
    {
        id: 1,
        title: "Butter Chicken",
        subtitle: "The Grand Dining",
        rating: 4.7,
        price: 376,
        type: "food",
    },
    {
        id: 2,
        title: "Deluxe King Room",
        subtitle: "Most booked room",
        rating: 4.9,
        price: 1376,
        type: "room",
    },
    {
        id: 3,
        title: "Deluxe King 2 Room",
        subtitle: "Most booked room",
        rating: 4.3,
        price: 1376,
        type: "room",
    }, {
        id: 4,
        title: "Deluxe King 3 Room",
        subtitle: "Most booked room",
        rating: 4.6,
        price: 1376,
        type: "room",
    },
];

export default function BookingCards() {
    return (
        <div className="w-full max-w-md mx-auto space-y-4 mt-4">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="border rounded-2xl shadow-sm p-4 flex flex-col gap-3"
                >
                    {/* Top Section */}
                    <div className="flex justify-between items-start">
                        {/* Icon + Title */}
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-900 text-white flex items-center justify-center rounded-full">
                                {item.type === "food" ? (
                                    <Utensils className="w-5 h-5" />
                                ) : (
                                    <Bed className="w-5 h-5" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500">{item.subtitle}</p>
                                <p className="flex items-center text-sm text-yellow-600 mt-1">
                                    ⭐ {item.rating}
                                </p>
                            </div>
                        </div>

                        {/* Price + Favorite */}
                        <div className="text-right">
                            <button>
                                <Heart className="w-5 h-5 text-red-500" fill="red" />
                            </button>
                            <p className="font-semibold text-gray-800 mt-1">
                                ₹ {item.price.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Book Button */}
                    <button className="w-full bg-gray-600 text-white py-2 rounded-lg font-medium">
                        Book now
                    </button>
                </div>
            ))}
        </div>
    );
}
