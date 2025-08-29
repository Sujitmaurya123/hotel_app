import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, CalendarDays, Clock, Users, Search, Star, X } from "lucide-react";
import { format } from "date-fns";

// --- Types
export type MenuItem = {
    id: string;
    name: string;
    price: number;
    rating: number; // 0-5
    category: "Starters" | "Mains" | "Desserts" | "Drinks";
    description: string;
    image?: string;
    spicy?: boolean;
    veg?: boolean;
};

// --- Sample Seed Data (replace with your API fetch)
const SEED_MENU: MenuItem[] = [
    {
        id: "bruschetta",
        name: "Tomato Basil Bruschetta",
        price: 8.5,
        rating: 4.6,
        category: "Starters",
        description: "Grilled sourdough topped with marinated tomatoes, basil & olive oil.",
        image: "https://images.unsplash.com/photo-1546549039-49e0a6e196bb?auto=format&fit=crop&w=1200&q=60",
        veg: true,
    },
    {
        id: "wings",
        name: "Crispy Buffalo Wings",
        price: 12.0,
        rating: 4.4,
        category: "Starters",
        description: "Classic wings tossed in tangy buffalo sauce with ranch dip.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=60",
        spicy: true,
    },
    {
        id: "risotto",
        name: "Mushroom Truffle Risotto",
        price: 18.0,
        rating: 4.8,
        category: "Mains",
        description: "Creamy arborio rice with wild mushrooms & a hint of truffle.",
        image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1200&q=60",
        veg: true,
    },
    {
        id: "steak",
        name: "Grilled Ribeye Steak",
        price: 29.0,
        rating: 4.7,
        category: "Mains",
        description: "12oz ribeye, herb butter, roasted garlic & seasonal greens.",
        image: "https://images.unsplash.com/photo-1604908554027-86207a7a1c84?auto=format&fit=crop&w=1200&q=60",
    },
    {
        id: "tiramisu",
        name: "Classic Tiramisu",
        price: 9.0,
        rating: 4.9,
        category: "Desserts",
        description: "Espresso-soaked ladyfingers, mascarpone cream & cocoa.",
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=60",
        veg: true,
    },
    {
        id: "cheesecake",
        name: "New York Cheesecake",
        price: 8.5,
        rating: 4.5,
        category: "Desserts",
        description: "Creamy vanilla bean cheesecake with berry coulis.",
        image: "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=1200&q=60",
    },
    {
        id: "mocktail",
        name: "Citrus Cooler",
        price: 6.5,
        rating: 4.2,
        category: "Drinks",
        description: "Orange, lime, mint & soda over crushed ice.",
        image: "https://images.unsplash.com/photo-1541976076758-347942db1970?auto=format&fit=crop&w=1200&q=60",
    },
    {
        id: "espresso",
        name: "Double Espresso",
        price: 3.5,
        rating: 4.7,
        category: "Drinks",
        description: "Freshly pulled double shot of espresso.",
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=60",
    },
];

// --- Utility
function currency(n: number) {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}

const CATEGORIES = ["All", "Starters", "Mains", "Desserts", "Drinks"] as const;

// --- Booking Helpers (mock availability)
const timeslots = [
    "12:00", "12:30", "13:00", "13:30", "14:00",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
];

function getMockAvailability(dateISO: string, party: number) {
    // simple fake rule: later times fill up for bigger parties
    const dateSeed = new Date(dateISO).getDate();
    return timeslots.filter((_, idx) => (idx + dateSeed + party) % 3 !== 0);
}

// --- Component
export default function RestaurantMenuBookingPage() {
    const [menu] = useState<MenuItem[]>(SEED_MENU);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
    const [likes, setLikes] = useState<Record<string, number>>(() => Object.fromEntries(menu.map(i => [i.id, Math.floor(Math.random() * 120) + 10])));
    const [bookingOpen, setBookingOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    // Booking form state
    const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
    const [time, setTime] = useState<string>("");
    const [partySize, setPartySize] = useState<number>(2);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");
    const [confirmation, setConfirmation] = useState<string | null>(null);

    const filtered = useMemo(() => {
        return menu.filter(i =>
            (category === "All" || i.category === category) &&
            (i.name.toLowerCase().includes(query.toLowerCase()) || i.description.toLowerCase().includes(query.toLowerCase()))
        );
    }, [menu, query, category]);

    const topLiked = useMemo(() => {
        return [...menu].sort((a, b) => (likes[b.id] ?? 0) - (likes[a.id] ?? 0)).slice(0, 5);
    }, [menu, likes]);

    function toggleLike(id: string) {
        setLikes(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    }

    function openBooking(item?: MenuItem) {
        setSelectedItem(item ?? null);
        setBookingOpen(true);
    }

    function submitBooking() {
        const code = Math.random().toString(36).slice(2, 8).toUpperCase();
        setConfirmation(`${code} • ${format(new Date(date), "MMM d, yyyy")}${time ? " at " + time : ""} • Party of ${partySize}`);
        // Reset form minimal
        setName("");
        setPhone("");
        setNote("");
    }

    const available = useMemo(() => getMockAvailability(date, partySize), [date, partySize]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
            {/* Header */}
            <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-black text-white grid place-items-center font-bold">R</div>
                    <div className="flex-1">
                        <h1 className="text-xl md:text-2xl font-semibold">Riverstone Dining</h1>
                        <p className="text-sm text-gray-500">Seasonal plates • Wood-fired • Local wines</p>
                    </div>
                    <button
                        className="bg-black text-white px-4 py-2 rounded-2xl flex items-center font-medium"
                        onClick={() => openBooking()}
                    >
                        <CalendarDays className="mr-2 h-4 w-4" /> Book a Table
                    </button>
                </div>
            </header>

            {/* Controls */}
            <section className="max-w-6xl mx-auto px-4 pt-6">
                <div className="grid md:grid-cols-3 gap-3">
                    <div className="md:col-span-2 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                            <input
                                className="pl-9 py-2 pr-4 w-full rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Search dishes, ingredients, or descriptions"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <select
                                className="w-[170px] py-2 pl-3 pr-10 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black appearance-none"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as any)}
                            >
                                {CATEGORIES.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                        <button
                            className="px-4 py-2 rounded-2xl border border-gray-300 hover:bg-gray-100"
                            onClick={() => setCategory("All")}
                        >
                            All
                        </button>
                        <button
                            className="px-4 py-2 rounded-2xl bg-black text-white flex items-center"
                            onClick={() => openBooking()}
                        >
                            <CalendarDays className="mr-2 h-4 w-4" />Reserve
                        </button>
                    </div>
                </div>
            </section>

            {/* Highlights / Top liked */}
            <section className="max-w-6xl mx-auto px-4 mt-6">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">Most Loved This Week</h2>
                    <p className="text-sm text-gray-500">Tap the heart to like a dish</p>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {topLiked.map(item => (
                        <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <div className="relative h-28 bg-neutral-100">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                    <span className="absolute left-2 top-2 rounded-full bg-black text-white text-xs px-2 py-1">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="p-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <div className="font-medium leading-tight">{item.name}</div>
                                            <div className="text-sm text-gray-500">{currency(item.price)}</div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <Star className="h-4 w-4" /> {item.rating.toFixed(1)}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 pt-0 flex items-center justify-between">
                                    <button
                                        className="px-3 py-1 text-sm rounded-xl border border-gray-300 hover:bg-gray-100 flex items-center"
                                        onClick={() => openBooking(item)}
                                    >
                                        <CalendarDays className="mr-2 h-4 w-4" />Book
                                    </button>
                                    <button
                                        className="flex items-center gap-1 text-sm hover:scale-105 transition"
                                        onClick={() => toggleLike(item.id)}
                                    >
                                        <Heart className="h-4 w-4" /> {(likes[item.id] ?? 0).toLocaleString()}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Menu Grid */}
            <section className="max-w-6xl mx-auto px-4 mt-8 pb-24">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <div className="text-sm text-gray-500">{filtered.length} {filtered.length === 1 ? "item" : "items"}</div>
                </div>
                <AnimatePresence mode="popLayout">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((item) => (
                            <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                                    <div className="relative h-40 bg-neutral-100">
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        <div className="absolute left-2 top-2 flex gap-2">
                                            {item.spicy && <span className="rounded-full bg-red-500 text-white text-xs px-2 py-1">Spicy</span>}
                                            {item.veg && <span className="rounded-full bg-green-500 text-white text-xs px-2 py-1">Veg</span>}
                                        </div>
                                    </div>
                                    <div className="p-4 pb-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-base font-medium">{item.name}</span>
                                            <span className="text-base font-semibold">{currency(item.price)}</span>
                                        </div>
                                    </div>
                                    <div className="p-4 pt-1">
                                        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                                    </div>
                                    <div className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-sm">
                                            <Star className="h-4 w-4" /> {item.rating.toFixed(1)}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="px-3 py-1 text-sm rounded-xl border border-gray-300 hover:bg-gray-100 flex items-center"
                                                onClick={() => openBooking(item)}
                                            >
                                                <CalendarDays className="mr-2 h-4 w-4" />Reserve
                                            </button>
                                            <button
                                                className="px-3 py-1 text-sm rounded-xl bg-black text-white flex items-center"
                                                onClick={() => toggleLike(item.id)}
                                            >
                                                <Heart className="mr-2 h-4 w-4" /> Like {(likes[item.id] ?? 0)}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </section>

            {/* Booking Dialog */}
            {bookingOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Book a Table</h2>
                                <button
                                    className="opacity-70 hover:opacity-100"
                                    onClick={() => setBookingOpen(false)}
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <p className="text-gray-500 mt-1">
                                {selectedItem ? (
                                    <span>You're booking while viewing <strong>{selectedItem.name}</strong>. Add a note if you want this dish prioritized.</span>
                                ) : (
                                    <span>Choose a date, time and party size. We'll confirm instantly.</span>
                                )}
                            </p>
                        </div>

                        <div className="p-6 grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="date">Date</label>
                                    <input
                                        id="date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Party Size</label>
                                    <select
                                        value={String(partySize)}
                                        onChange={(e) => setPartySize(parseInt(e.target.value))}
                                        className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black appearance-none"
                                    >
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Time</label>
                                    <div className="flex flex-wrap gap-2">
                                        {available.map(t => (
                                            <button
                                                key={t}
                                                className={`px-3 py-2 rounded-xl flex items-center ${t === time ? 'bg-black text-white' : 'border border-gray-300 hover:bg-gray-100'}`}
                                                onClick={() => setTime(t)}
                                            >
                                                <Clock className="h-4 w-4 mr-1" /> {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        placeholder="Your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="Contact number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="note">Note (optional)</label>
                                    <input
                                        id="note"
                                        placeholder="Allergies, occasion, preferred dish…"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div className="pt-2 flex gap-2">
                                    <button
                                        className="flex-1 py-2 rounded-2xl bg-black text-white flex items-center justify-center"
                                        onClick={submitBooking}
                                    >
                                        <CalendarDays className="mr-2 h-4 w-4" /> Confirm Booking
                                    </button>
                                    <button
                                        className="py-2 px-4 rounded-2xl border border-gray-300 hover:bg-gray-100"
                                        onClick={() => setBookingOpen(false)}
                                    >
                                        Close
                                    </button>
                                </div>

                                {confirmation && (
                                    <div className="mt-2 text-sm p-3 rounded-xl bg-green-50 border border-green-200">
                                        Reservation confirmed: <strong>{confirmation}</strong>
                                        <div className="text-gray-500 mt-1 flex items-center gap-2">
                                            <Users className="h-4 w-4" /> {partySize} guests
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}