"use client";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
    const [tools, setTools] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(true);
    // const [status, setStatus] = useState("")

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/tools");
                const data = await response.json();
                setTools(data);
            } catch (error) {
                console.error("Error fetching tools:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTools();
    }, []);

    const handleStatusChange = async (toolId, status) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tools/${toolId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            const data = await response.json();
            if (response.ok) {
                setTools((prevTools) =>
                    prevTools.map((tool) =>
                        tool._id === toolId ? { ...tool, status } : tool
                    )
                );
                setSuccessMessage(`Tool ${status} successfully!`);
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            } else {
                console.error("Failed to update status:", data.error);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

            {successMessage && (
                <div
                    className={`${
                        successMessage.includes("accepted")
                            ? "bg-green-500"
                            : "bg-red-500"
                    } text-white p-3 rounded-md text-center mb-4`}
                >
                    {successMessage}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader"></div>
                </div>
            ) : tools.length === 0 ? (
                <p className="text-center text-gray-600">No tools submitted yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <div
                            key={tool._id}
                            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={`http://localhost:5000${tool.image}`}
                                alt={tool.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
                            <p className="mb-4">
                                Status:{" "}
                                <span
                                    className={`font-semibold ${
                                        tool.status === "accepted"
                                            ? "text-green-500"
                                            : tool.status === "rejected"
                                            ? "text-red-500"
                                            : "text-yellow-500"
                                    }`}
                                >
                                    {tool.status || "Pending"}
                                </span>
                            </p>
                            <div className="flex justify-between">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                    onClick={() => handleStatusChange(tool._id, "accepted")}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                    onClick={() => handleStatusChange(tool._id, "rejected")}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
