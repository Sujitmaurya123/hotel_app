import { useState } from "react";
import { Copy, QrCode } from "lucide-react";

export default function ReferralDashboard() {
    const [referralCode] = useState("GUEST2025");
    const [referralLink] = useState("https://hotel.app/ref/GUEST2024");

    return (
        <div className="max-w-md mx-auto p-4 space-y-4 text-gray-800">
            {/* Top Stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-100 rounded-2xl p-4 text-center shadow">
                    <p className="text-sm font-medium">Friends Referred</p>
                    <p className="text-2xl font-bold">3</p>
                </div>
                <div className="bg-gray-100 rounded-2xl p-4 text-center shadow">
                    <p className="text-sm font-medium">Available Balance</p>
                    <p className="text-2xl font-bold">₹ 3,764</p>
                </div>
            </div>

            {/* Invite & Earn */}
            <div className="bg-white rounded-2xl shadow p-4 space-y-3">
                <h2 className="font-semibold">Invite & Earn</h2>
                <div className="bg-gray-100 p-2 rounded-lg flex justify-between items-center">
                    <span className="font-mono">{referralCode}</span>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        className="flex-1 border rounded-lg px-2 py-1 text-sm"
                        value={referralLink}
                        readOnly
                    />
                    <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                        <Copy size={16} />
                    </button>
                </div>
                <button className="flex items-center gap-2 w-full justify-center bg-gray-800 text-white py-2 rounded-lg hover:bg-black">
                    <QrCode size={18} /> QR Code
                </button>
            </div>

            {/* Progress to Gold Tier */}
            <div className="bg-white rounded-2xl shadow p-4">
                <h2 className="font-semibold mb-2">Progress to Gold Tier</h2>
                <p className="text-sm text-gray-600 mb-2">Silver Tier</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "60%" }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500">12/20 referrals</p>
                <p className="text-xs text-gray-700 mt-1">
                    8 more successful referrals to unlock Gold tier and earn ₹250 bonus!
                </p>
            </div>

            {/* Wallet */}
            <div className="bg-white rounded-2xl shadow p-4 space-y-2">
                <h2 className="font-semibold">Wallet Balance: ₹ 3,764</h2>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Earned</span>
                    <span>₹ 330</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Used</span>
                    <span>₹ 120</span>
                </div>
                <div className="flex gap-3 mt-3">
                    <button className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-black">
                        Use for Booking
                    </button>
                    <button className="flex-1 border py-2 rounded-lg hover:bg-gray-100">
                        Withdraw
                    </button>
                </div>
            </div>

            {/* Reward Tiers */}
            <div className="bg-white rounded-2xl shadow p-4 space-y-2">
                <h2 className="font-semibold mb-2">Reward Tiers</h2>
                {[
                    { tier: "Bronze Tier", bonus: "₹ 50", desc: "5 successful referrals", active: true },
                    { tier: "Silver Tier", bonus: "₹ 150", desc: "10 successful referrals", active: true },
                    { tier: "Gold Tier", bonus: "₹ 250", desc: "20 successful referrals", active: false },
                    { tier: "Platinum Tier", bonus: "₹ 800", desc: "50 successful referrals", active: false },
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                        <div>
                            <p className="font-medium">{item.tier}</p>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <span
                            className={`px-2 py-1 rounded-lg text-xs ${item.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                }`}
                        >
                            {item.bonus}
                        </span>
                    </div>
                ))}
            </div>

            {/* Recent Referrals */}
            <div className="bg-white rounded-2xl shadow p-4 space-y-2">
                <h2 className="font-semibold mb-2">Recent Referrals</h2>
                {[
                    { name: "Anjli Singh", date: "2024-01-15", status: "Success", amount: "₹ 26" },
                    { name: "Anjli Singh", date: "2024-01-15", status: "Pending", amount: "₹ 0" },
                ].map((ref, i) => (
                    <div
                        key={i}
                        className="flex justify-between items-center text-sm border-b py-2 last:border-none"
                    >
                        <div>
                            <p className="font-medium">{ref.name}</p>
                            <p className="text-xs text-gray-500">{ref.date}</p>
                        </div>
                        <div className="text-right">
                            <p
                                className={`text-xs font-semibold ${ref.status === "Success" ? "text-green-600" : "text-yellow-600"
                                    }`}
                            >
                                {ref.status}
                            </p>
                            <p className="text-sm">{ref.amount}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
