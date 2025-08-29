import { useState } from "react";
import {
  Bell,
  CreditCard,
  Lock,
  HelpCircle,
  LogOut,
  Edit3,
  Camera,
  X,
} from "lucide-react";
import WalletUI from "../../components/profile-section/Wallat";
import BookingCards from "../../components/profile-section/BookingCard";
import ProfileBooking from "../../components/profile-section/ProfileBooking";
import ReferralDashboard from "../../components/profile-section/ReferralDashboard";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("settings");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 mt-[80px]">
      <div className="w-full max-w-md lg:max-w-4xl xl:max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-700 p-4 text-white relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="User"
                className="w-16 h-16 rounded-full border-2 border-white"
              />
              <div>
                <h2 className="text-lg font-semibold">Anjii Singh</h2>
                <p className="text-sm text-gray-200">abc1234@gmail.com</p>
                <span className="inline-block bg-yellow-500 text-xs text-white px-2 py-0.5 rounded-full mt-1">
                  Gold Member
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between lg:gap-10 text-center">
              <div>
                <p className="text-base font-semibold">14</p>
                <p className="text-xs text-gray-300">Total Bookings</p>
              </div>
              <div>
                <p className="text-base font-semibold">12</p>
                <p className="text-xs text-gray-300">Referrals Made</p>
              </div>
              <div>
                <p className="text-base font-semibold">₹2,250</p>
                <p className="text-xs text-gray-300">Wallet Balance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-around border-b overflow-x-auto">
          {["Referrals", "Bookings", "Favorites", "Wallet", "Settings"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`flex-1 py-2 text-sm font-medium whitespace-nowrap ${activeTab === tab.toLowerCase()
                    ? "border-b-2 border-yellow-500 text-yellow-600"
                    : "text-gray-500"
                  }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Settings */}
        {activeTab === "settings" && (
          <div className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Personal Information</h3>
                <Edit3 className="w-5 h-5 text-gray-500 cursor-pointer" />
              </div>

              <div className="space-y-3">
                {[
                  { label: "Name", value: "Anjii Singh" },
                  { label: "Email", value: "abc1234@gmail.com" },
                  { label: "Phone Number", value: "9876543230" },
                  {
                    label: "Address",
                    value: "123 Main St, City, State 12345",
                  },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="text-sm text-gray-500">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={field.value}
                      disabled
                      className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Edit Profile
              </button>
            </div>

            {/* Preferences & Actions */}
            <div className="space-y-2">
              <button className="flex items-center w-full border px-3 py-2 rounded-lg hover:bg-gray-50">
                <Bell className="w-5 h-5 mr-2 text-gray-600" /> Notification
                Settings
              </button>
              <button className="flex items-center w-full border px-3 py-2 rounded-lg hover:bg-gray-50">
                <CreditCard className="w-5 h-5 mr-2 text-gray-600" /> Payment
                Methods
              </button>
              <button className="flex items-center w-full border px-3 py-2 rounded-lg hover:bg-gray-50">
                <Lock className="w-5 h-5 mr-2 text-gray-600" /> Privacy Settings
              </button>
              <button className="flex items-center w-full border px-3 py-2 rounded-lg hover:bg-gray-50">
                <HelpCircle className="w-5 h-5 mr-2 text-gray-600" /> Help &
                Support
              </button>

              {/* Sign Out */}
              <button className="w-full bg-yellow-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 mt-4">
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </div>
          
        )}
        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-orange-500/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-2 border-gray-300"
                  />
                  <button className="absolute bottom-0 right-0 bg-yellow-500 p-2 rounded-full text-white">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Change profile picture
                </p>
              </div>

              {/* Form */}
              <form className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <input
                    type="text"
                    defaultValue="Anjii Singh"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <input
                    type="email"
                    defaultValue="abc1234@gmail.com"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone Number</label>
                  <input
                    type="text"
                    defaultValue="9876543230"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Address</label>
                  <input
                    type="text"
                    defaultValue="123 Main St, City, State 12345"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-600 text-white py-2 rounded-lg font-medium"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        )}



        {/* Dummy Tabs */}
        {activeTab === "referrals" && (
          <div className="text-center text-gray-600">
           <ReferralDashboard/>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="text-center text-gray-600">
           <ProfileBooking/>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="text-center text-gray-600">
            <BookingCards/>
          </div>
        )}

        {activeTab === "wallet" && (
          <div className="text-center text-gray-600">
            <WalletUI/>
          </div>
        )}
      </div>
    </div>
  );
}
