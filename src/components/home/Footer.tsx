
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-10 mt-9">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo + Newsletter */}
                <div>
                    <div className="flex items-center gap-2">
                        <img
                            src="/logo.svg" // Replace with your logo path
                            alt="Hotel Logo"
                            className="w-74 h-19"
                        />
                        
                    </div>

                    <p className="text-sm text-gray-600 mt-4">
                        Get Notified about News, offers & more
                    </p>
                    <div className="flex mt-3">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="flex-1 border border-gray-300 px-3 py-2 text-sm rounded-l-md focus:outline-none"
                        />
                        <button className="bg-gray-700 text-white px-4 py-2 text-sm rounded-r-md hover:bg-gray-800">
                            SUBSCRIBE
                        </button>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-4 text-gray-600">
                        <FaFacebookF className="cursor-pointer hover:text-blue-600" />
                        <FaInstagram className="cursor-pointer hover:text-pink-500" />
                        <FaLinkedinIn className="cursor-pointer hover:text-blue-700" />
                        <FaXTwitter className="cursor-pointer hover:text-black" />
                    </div>
                </div>

                {/* Explore */}
                <div>
                    <h4 className="font-semibold mb-2 border-b border-gray-400 inline-block">
                        Explore
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1 mt-2">
                        <li>Home</li>
                        <li>Rooms</li>
                        <li>Dining</li>
                        <li>Events</li>
                        <li>Contact</li>
                    </ul>
                </div>

                {/* Corporate */}
                <div>
                    <h4 className="font-semibold mb-2 border-b border-gray-400 inline-block">
                        Corporate
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1 mt-2">
                        <li>Blogs</li>
                        <li>Gallery</li>
                        <li>About</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold mb-2 border-b border-gray-400 inline-block">
                        Contact
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-2 mt-2">
                        <li className="flex items-start gap-2">
                            <MdLocationOn className="mt-1" /> Dighi Kala (East), Mahavir
                            Chauraha, Hajipur- 844101
                        </li>
                        <li className="flex items-center gap-2">
                            <MdPhone /> +91 9955745719 | 9955745119 | 9955407888
                        </li>
                        <li className="flex items-center gap-2">
                            <MdEmail /> palacelaxmivilas@gmail.com
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-300 mt-8 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 px-6">
                <p>© 2025 Hotel</p>
                <p>Design and Developed by VEREDA Private Limited</p>
            </div>
        </footer>
    );
}
