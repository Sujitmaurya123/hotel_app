import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

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
                        <Link to="#" className="hover:text-orange-600 text-sm">
                            ROOMS
                        </Link>
                        <Link to="#" className="hover:text-orange-600 text-sm">
                            EVENT
                        </Link>
                        <Link to="#" className="hover:text-orange-600 text-sm">
                            DINING
                        </Link>
                        <Link to="/login" className="hover:text-orange-600 text-sm">
                            LOGIN
                        </Link>
                        <button className="bg-gray-500 text-white px-4 py-1 rounded">
                            Book now
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
                        <a href="#" className="hover:text-orange-600 text-sm">
                            HOME
                        </a>
                        <a href="#" className="hover:text-orange-600 text-sm">
                            ROOMS
                        </a>
                        <a href="#" className="hover:text-orange-600 text-sm">
                            EVENT
                        </a>
                        <a href="#" className="hover:text-orange-600 text-sm">
                            DINING
                        </a>
                        <a href="#" className="hover:text-orange-600 text-sm">
                            LOGIN
                        </a>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded">
                            Book now
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
