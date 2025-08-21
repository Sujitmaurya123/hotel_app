import { Wifi, Car, Utensils, Dumbbell } from "lucide-react";

export default function Facilities() {
    const facilities = [
        {
            icon: <Wifi size={32} className="text-white" />,
            title: "Free Wi-Fi",
            desc: "High-speed internet",
        },
        {
            icon: <Car size={32} className="text-white" />,
            title: "Valet Parking",
            desc: "24/7 Service",
        },
        {
            icon: <Utensils size={32} className="text-white" />,
            title: "Dining",
            desc: "Our award-winning chefs.",
        },
        {
            icon: <Dumbbell size={32} className="text-white" />,
            title: "Fitness Center",
            desc: "24/7 gym access",
        },
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 text-center">
                {/* Section Title */}
                <h2 className="text-2xl font-semibold text-gray-800">Our Facilities</h2>
                <p className="mt-2 text-gray-600">
                    Enjoy premium facilities, designed for your comfort, every detail
                    crafted to elevate your stay.
                </p>

                {/* Facilities Grid */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {facilities.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition"
                        >
                            <div className="bg-blue-900 p-4 rounded-full mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
