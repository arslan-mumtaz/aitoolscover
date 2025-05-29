
'use client'

import { useState } from "react";

const SubmitToolForm = () => {
  // States for form fields
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State for success modal

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Please fill in all required fields including tool image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/tools/tools-with-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSuccessModalOpen(true); // Open success modal
        setName('');
        setImage(null);
        (document.getElementById("toolImages") as HTMLInputElement).value = ''; // Reset file input
      } else {
        const error = await response.json();
        alert("Submission failed: " + error.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    }
  };

  const closeModal = () => {
    setIsSuccessModalOpen(false); // Close success modal
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 space-y-6 mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">Submit Your AI Tool</h2>

        {/* Tool Name */}
        <div>
          <label htmlFor="toolName" className="block text-sm font-semibold text-gray-700 mb-2">Tool Name</label>
          <input
            type="text"
            id="toolName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter tool name"
            className="w-full px-4 py-3 rounded-full shadow border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Tool Image */}
        <div>
          <label htmlFor="toolImages" className="block text-sm font-semibold text-gray-700 mb-2">Tool Image</label>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="toolImages"
              className="cursor-pointer bg-[#7d42fb] text-white py-2 px-4 rounded-full font-semibold hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Choose File
            </label>
            <input
              type="file"
              id="toolImages"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              className="hidden"
              required
            />
            {image && (
              <p className="text-sm text-gray-500">Selected file: {image.name}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#7d42fb] text-white py-3 px-6 rounded-full font-semibold hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit Tool
        </button>
      </form>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-green-600 mb-4">Tool Submitted Successfully!</h3>
            <p className="text-gray-700 mb-4">Your AI tool has been submitted. Thank you!</p>
            <button
              onClick={closeModal}
              className="bg-[#7d42fb] text-white py-2 px-6 rounded-full font-semibold hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitToolForm;
