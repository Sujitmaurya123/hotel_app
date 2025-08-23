

export default function About() {
    return (
        <div className="w-full">
            {/* Header Image */}
            <div className="relative">
                <img
                    src="/heroimage/hero1.png"
                    alt="Hotel Laxmi Vilas Palace"
                    className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white">
                        Hotel Laxmi Vilas Palace
                    </h1>
                </div>
            </div>

            {/* Welcome Section */}
            <section className="max-w-5xl mx-auto px-4 py-12">
                <h2 className="text-xl md:text-2xl font-semibold text-orange-500">
                    Welcome to Hotel Laxmi Vilas Palace
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                    Nestled amidst lush gardens and regal architecture, Hotel Laxmi Vilas
                    Palace stands as a majestic blend of royal elegance and modern
                    comfort. Once a grand residence of aristocracy, our palace hotel
                    invites you to step into a world where history whispers through every
                    corridor, and luxury greets you in every detail.
                </p>
            </section>

            {/* Royal Retreat Section */}
            <section className="bg-gray-50 py-12">
                <div className="max-w-5xl mx-auto px-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">
                        A Royal Retreat
                    </h3>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                        Built with traditional Rajasthani design and refined Mughal
                        influences, Laxmi Vilas Palace offers more than just accommodation –
                        it’s an experience. From intricately carved jharokhas to timeless
                        marble courtyards, every corner reflects the grandeur of a bygone
                        era, lovingly preserved for the discerning traveler.
                    </p>
                </div>
            </section>

            {/* Our Promise Section */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto px-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">
                        Our Promise
                    </h3>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                        At Hotel Laxmi Vilas Palace, we are devoted to providing unparalleled
                        hospitality with a personal touch. Whether you’re here for a
                        romantic escape, a family celebration, or a corporate retreat, we
                        ensure every guest feels like royalty.
                    </p>
                </div>
            </section>

            {/* Feeling Palace Section with Video */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h3 className="text-lg md:text-xl font-bold text-orange-500 mb-6">
                        A Feeling Called Laxmi Vilas Palace
                    </h3>
                    <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src="/heroimage/hero1.png"
                            alt="Hotel Interior"
                            className="w-full h-[250px] md:h-[400px] object-cover"
                        />
                        <button className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-3xl rounded-2xl">
                            ▶
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
