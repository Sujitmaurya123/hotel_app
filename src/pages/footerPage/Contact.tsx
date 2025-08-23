
export default function ContactSection() {
    return (
        <div className="w-full mt-9">
            <img
                src="/heroimage/hero1.png"
                alt="Hotel Laxmi Vilas Palace"
                className="w-full h-[600px] object-cover"
            />
            {/* Contact Info + Form */}
            <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
                {/* Left - Hotel Info */}
                <div>
                    <h2 className="text-2xl font-bold">
                        <span className="text-orange-500">Hotel</span> Laxmi Vilas Palace
                    </h2>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                        Welcome to Hotel Laxmi Vilas Palace, a world of elegance & comfort.
                        Our hotel is ideal for large & lush gatherings, family vacations, or
                        corporate retreats. We ensure every moment is memorable with royal
                        luxury & modern convenience.
                    </p>

                    <div className="mt-6 space-y-4">
                        <p className="flex items-center">
                            <span className="font-semibold w-20">Contact:</span> +91
                            9876543210
                        </p>
                        <p className="flex items-center">
                            <span className="font-semibold w-20">Email:</span>{" "}
                            info@laxmivilaspalace.com
                        </p>
                        <p className="flex items-center">
                            <span className="font-semibold w-20">Address:</span> Dujana Gate,
                            Hotel Mahal Charna, Udaipur 84517
                        </p>
                    </div>
                </div>

                {/* Right - Contact Form */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>
                        <textarea
                            placeholder="Specify your query here..."
                            rows={4}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        <button
                            type="submit"
                            className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* Map Section */}
            <section className="w-full bg-gray-100 py-12">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-6">
                        How to Reach Hotel Laxmi Vilas Palace
                    </h3>
                    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            title="Hotel Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.837713674444!2d73.7125!3d24.5854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDM1JzA3LjYiTiA3M8KwNDInNDAuOSJF!5e0!3m2!1sen!2sin!4v1672918000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Feedback Form */}
            <section className="max-w-5xl mx-auto px-4 py-12">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-6">
                    Feedback & Suggestions
                </h3>
                <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        <input
                            type="text"
                            placeholder="Date of Stay"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <textarea
                        placeholder="Comments..."
                        rows={4}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <button
                        type="submit"
                        className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Submit
                    </button>
                </form>
            </section>
        </div>
    );
}
