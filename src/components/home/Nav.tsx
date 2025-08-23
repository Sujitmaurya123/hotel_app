import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type User = {
    name: string;
    email: string;
    // add other properties if needed
};
export default function Nav() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check if user data exists in localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logout Successfully...")
        setUser(null);
        // You might want to redirect to home page after logout
        navigate("/");
    };

    return (
        <nav className="w-full shadow-sm bg-white fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left Section - Logo */}
                    <div className="flex items-center space-x-2">
                        <Link to="/">
                            <img
                                src="/logo.svg"
                                alt="Hotel Laxmi Vilas Palace"
                                className="h-13 w-30"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/" className="hover:text-orange-600 text-sm">
                            HOME
                        </Link>
                        <Link to="/booknow" className="hover:text-orange-600 text-sm">
                            ROOMS
                        </Link>
                        <Link to="events" className="hover:text-orange-600 text-sm">
                            EVENT
                        </Link>
                        <Link to="/dining" className="hover:text-orange-600 text-sm">
                            DINING
                        </Link>
                       
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-sm">
                                    {user.name.split(' ')[0]}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="hover:text-orange-600 text-sm cursor-pointer"
                                >
                                    LOGOUT
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="hover:text-orange-600 text-sm">
                                LOGIN
                            </Link>
                        )}
                        <button className="bg-gray-500 text-white px-4 py-1 rounded">
                         <Link to="/booknow">Book Now</Link>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="flex flex-col space-y-3 px-6 py-4">
                        <Link to="/" className="hover:text-orange-600 text-sm">
                            HOME
                        </Link>
                        <Link to="/booknow" className="hover:text-orange-600 text-sm">
                            ROOMS
                        </Link>
                        <Link to="/events" className="hover:text-orange-600 text-sm">
                            EVENT
                        </Link>
                        <Link to="/dining" className="hover:text-orange-600 text-sm">
                            DINING
                        </Link>
                        {user ? (
                            <>
                                <span className="text-sm">Hello, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="hover:text-orange-600 text-sm text-left"
                                >
                                    LOGOUT
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="hover:text-orange-600 text-sm">
                                LOGIN
                            </Link>
                        )}
                        <button className="bg-gray-500 text-white px-4 py-2 rounded">
                            Book now
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}