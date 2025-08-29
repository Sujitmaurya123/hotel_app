import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
type User = {
    name: string;
    email: string;
};

export default function Nav() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const auth = useSelector((state: RootState) => state.auth);
    console.log("auth user data are ",auth);
    // console.log("User Name:", auth.user!.name);


    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                // Handle both formats: direct user object or nested API response
                if ("name" in parsed) {
                    setUser(parsed);
                } else if (parsed.data?.user) {
                    setUser(parsed.data.user);
                }
            } catch {
                setUser(null);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logout Successfully...");
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="w-full shadow-sm bg-white fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Link to="/">
                            <img
                                src="/logo.svg"
                                alt="Hotel Laxmi Vilas Palace"
                                className="h-10 w-15"
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
                        <Link to="/events" className="hover:text-orange-600 text-sm">
                            EVENT
                        </Link>
                        <Link to="/dining-menu" className="hover:text-orange-600 text-sm">
                            DINING
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/user-profile">
                                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-sm font-medium hover:bg-amber-200">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                              </Link> 
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

                        <button className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-amber-200">
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
                        <Link to="/dining-menu" className="hover:text-orange-600 text-sm">
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
