import { Wallet } from "lucide-react";

type Transaction = {
    id: number;
    title: string;
    date: string;
    amount: number;
    type: "credit" | "debit";
};

const transactions: Transaction[] = [
    { id: 1, title: "Referral Bonus", date: "2024-01-15", amount: 376, type: "credit" },
    { id: 2, title: "Room Booking", date: "2024-01-15", amount: 376, type: "debit" },
    { id: 3, title: "Referral Bonus", date: "2024-01-15", amount: 376, type: "credit" },
];

export default function WalletUI() {
    return (
        <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl p-4 space-y-4">
            {/* Wallet Balance */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                    <Wallet className="w-5 h-5 text-yellow-600" />
                    <span>Wallet Balance:</span>
                </div>
                <span className="text-lg font-bold">₹ 3,764</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-medium">
                    Add Funds
                </button>
                <button className="flex-1 border border-gray-400 text-gray-600 py-2 rounded-lg font-medium">
                    Withdraw
                </button>
            </div>

            {/* Recent Transactions */}
            <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    Recent Transactions
                </h3>
                <div className="space-y-2">
                    {transactions.map((txn) => (
                        <div
                            key={txn.id}
                            className="flex justify-between items-center border rounded-xl p-3"
                        >
                            <div>
                                <p className="font-medium text-gray-800">{txn.title}</p>
                                <p className="text-xs text-gray-500">{txn.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">
                                    ₹ {txn.amount.toLocaleString()}
                                </p>
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${txn.type === "credit"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-pink-100 text-pink-600"
                                        }`}
                                >
                                    {txn.type === "credit" ? "Credit" : "Debit"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
