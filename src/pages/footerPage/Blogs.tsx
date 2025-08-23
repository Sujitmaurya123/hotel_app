

export default function Blogs() {
    return (
        <div className="w-full">
            {/* Hero Blog Banner */}
            <div className="relative">
                <img
                    src="/heroimage/hero1.png"
                    alt="Hotel Blog Banner"
                    className="w-full h-[350px] md:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-white">
                        Hotel Laxmi Vilas Palace • Blogs
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200">
                        Timeless Grandeur, Trusted Hospitality – Your Royal Stay Begins Here
                    </p>
                </div>
            </div>

            {/* Featured Blog Posts */}
            <section className="max-w-6xl mx-auto px-4 py-12 space-y-12">
                {/* Blog Post 1 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800">
                            A Royal Wedding Under the Stars
                        </h3>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            A dreamy evening, twinkling lights, and the grandeur of Laxmi Vilas
                            Palace transform weddings into royal affairs. From mandap by the
                            fountains to ethereal echoing in our courtyard, every moment is
                            majestic.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                            Read more
                        </button>
                    </div>
                    <img
                        src="/heroimage/hero1.png"
                        alt="Wedding Blog"
                        className="w-full h-[250px] md:h-[300px] object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Blog Post 2 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <img
                        src="/heroimage/hero1.png"
                        alt="Dining Blog"
                        className="w-full h-[250px] md:h-[300px] object-cover rounded-lg shadow-lg"
                    />
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800">
                            Dining Like Royalty
                        </h3>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Our chefs bring conventional recipes to life with every meal served
                            in our grand dining hall. Go behind the scenes to discover the
                            ingredients, rituals, and secrets behind our signature dishes – from
                            Laxmi Aloo to royal thalis.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                            Read more
                        </button>
                    </div>
                </div>
            </section>

            {/* Popular Posts Section */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                    Popular Posts
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Post Card 1 */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src="/heroimage/hero1.png"
                            alt="Post 1"
                            className="w-full h-[180px] object-cover"
                        />
                        <div className="p-4">
                            <p className="text-sm text-gray-500">04/11/2025</p>
                            <h4 className="font-semibold text-gray-800 mt-2">
                                How to Choose the Perfect Suite for Your Stay
                            </h4>
                            <p className="text-sm text-gray-600 mt-2">
                                Discover our suite selection tips to find the perfect blend of
                                comfort and luxury for your royal getaway.
                            </p>
                        </div>
                    </div>

                    {/* Post Card 2 */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src="/heroimage/hero1.png"
                            alt="Post 2"
                            className="w-full h-[180px] object-cover"
                        />
                        <div className="p-4">
                            <p className="text-sm text-gray-500">04/11/2025</p>
                            <h4 className="font-semibold text-gray-800 mt-2">
                                Plan a Royal Wedding in a Heritage Palace
                            </h4>
                            <p className="text-sm text-gray-600 mt-2">
                                Step into grandeur with our palace weddings – an experience that
                                blends tradition with elegance.
                            </p>
                        </div>
                    </div>

                    {/* Post Card 3 */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src="/heroimage/hero1.png"
                            alt="Post 3"
                            className="w-full h-[180px] object-cover"
                        />
                        <div className="p-4">
                            <p className="text-sm text-gray-500">04/11/2025</p>
                            <h4 className="font-semibold text-gray-800 mt-2">
                                Dining Like Royalty: Must-Try Dishes at Our Palace
                            </h4>
                            <p className="text-sm text-gray-600 mt-2">
                                Explore our signature royal dishes, crafted with authentic
                                flavors and regal recipes passed down for generations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
