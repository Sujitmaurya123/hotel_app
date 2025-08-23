import  { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/api";


export default function Home() {
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState("");

    useEffect(() => {
        getProfile()
            .then((res) => {
                setUser(res.data.user);
                setName(res.data.user.name || "");
            })
            .catch(() => {
                alert("Please login again");
                localStorage.removeItem("token");
                window.location.href = "/";
            });
    }, []);

    const handleUpdate = async () => {
        try {
            const res = await updateProfile(name);
            setUser(res.data.user);
            alert("Profile updated!");
        } catch {
            alert("Error updating profile");
        }
    };

    if (!user) return <div className="p-8">Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.name || "User"}!</h1>
            <div className="bg-white p-4 rounded-lg shadow w-80">
                <input
                    className="border p-2 w-full mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    onClick={handleUpdate}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Update Name
                </button>
            </div>
        </div>
    );
}
