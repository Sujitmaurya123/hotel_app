import { useState, useEffect } from "react";
import { Calendar, User, Hotel } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    img: "heroimage/hero1.png",
    title: "Create Unforgettable Moments",
    desc: "Experience the perfect blend of luxury, elegance, and exceptional service at our premium banquet halls, restaurants, and hotel rooms."
  },
  {
    img: "heroimage/hero2.png",
    title: "Luxury Meets Comfort",
    desc: "Enjoy a royal experience with world-class hospitality, fine dining, and exquisite stays."
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src={slide.img}
            alt="banner"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center">
            <div className="max-w-2xl mx-auto px-6 text-white">
              <h1 className="text-3xl md:text-5xl font-bold text-orange-500">
                {slide.title}
              </h1>
              <p className="mt-4 text-lg">{slide.desc}</p>
              <div className="flex items-center mt-4 space-x-2">
                <span className="text-yellow-400 text-xl">★★★★★</span>
                <p className="text-sm">4.8 (2,847 reviews)</p>
              </div>
              <button className="mt-6 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded">
             <Link to="/booknow">Book Now</Link>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Slider dots */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${current === idx ? "bg-white" : "bg-gray-400"
              }`}
          ></button>
        ))}
      </div>

      {/* Booking Form */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%] bg-white shadow-lg rounded-md flex flex-col md:flex-row items-center justify-between px-4 py-3 space-y-3 md:space-y-0">
        {/* Date */}
        <div className="flex items-center space-x-2 text-gray-700">
          <Calendar size={18} />
          <span>Aug 02 to Aug 03</span>
        </div>

        {/* Rooms */}
        <div className="flex items-center space-x-2 text-gray-700">
          <Hotel size={18} />
          <span>1 Room</span>
        </div>

        {/* Guests */}
        <div className="flex items-center space-x-2 text-gray-700">
          <User size={18} />
          <span>1 Adult, 0 Child</span>
        </div>

        {/* Button */}
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded">
       <Link to="/booknow">Book Now</Link>  
        </button>
      </div>
    </div>
  );
}
