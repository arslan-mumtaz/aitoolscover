// 'use client'

// import Image from "next/image";
// import { AiOutlineUser } from "react-icons/ai";
// import { BsInfo } from "react-icons/bs";
// import { useState } from "react";

// const SubmitToolForm = () => {

//   // Personal info
//   const [name, setName] = useState('');
  

//   // Tool info
  
//   const [image, setImage] = useState<File | null>(null); // this will be a File or null
  

 

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!name || !image) {
//       alert("Please provide both name and image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("image", image);

//     try {
//       const response = await fetch("http://localhost:5000/api/tools/tools-with-image", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         alert("Tool submitted successfully!");
//         setName("");
//         setImage(null);
//       } else {
//         const error = await response.json();
//         alert("Submission failed: " + error.message);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Something went wrong!");
//     }
//   };



//   return (
//     // <div className="min-h-[1700px] w-[90%] mx-auto flex flex-col items-center">
//     //   {/* Header section with background */}
//     //   <div className="relative w-full bg-[#ecf2ff] h-[480px] rounded-xl">
//     //     <div className="absolute flex flex-col space-y-30 top-[10%] left-[5%] text-black">
//     //       <Image src="/circle.svg" alt="hero" width={20} height={20} className="ml-15" />
//     //       <Image src="/hero4.png" alt="hero" width={61} height={19} className="ml-15" />
//     //       <Image src="/hero2.png" alt="hero" width={43} height={41} />
//     //     </div>
//     //     <div className="w-full flex flex-col gap-6 pt-16 pb-32 px-4">
//     //       <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">Submit Your Tool</h1>
//     //       <div className="text-center max-w-xl mx-auto">
//     //         <p className="text-[#09090a] font-semibold">
//     //           We explore the internet and social media platforms to list outstanding AI tools, so we'll likely find and feature yours.
//     //         </p>
//     //       </div>
//     //     </div>

//     //     {/* Personal Info Form */}
//     //     <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4 mt-50">
//     //       <div className="bg-white rounded-xl shadow-sm p-8 mb-[200px]">
//     //         <div className="flex items-center">
//     //           <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#6d8eff] bg-transparent mr-3">
//     //             <AiOutlineUser size={20} />
//     //           </div>
//     //           <h2 className="text-lg font-semibold">1. Personal information</h2>
//     //         </div>

//     //         <form>
//     //           <div className="space-y-8 mt-6">
//     //             {/* Full Name */}
//     //             <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-3">
//     //               Full name
//     //             </label>
//     //             <div className="shadow-[0_0_8px_rgba(125,66,251,0.4)] rounded-full">
//     //               <input
//     //                 type="text"
//     //                 id="fullName"
//     //                 name="fullName"
//     //                 placeholder="What's your name?"
//     //                 className="w-full px-4 py-3 rounded-full font-semibold border-none focus:outline-none"
//     //               />
//     //             </div>

//     //             {/* Email */}
//     //             <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
//     //               Email address
//     //             </label>
//     //             <div className="shadow-[0_0_8px_rgba(125,66,251,0.4)] rounded-full">
//     //               <input
//     //                 type="email"
//     //                 id="email"
//     //                 name="email"
//     //                 placeholder="What's your email address?"
//     //                 className="w-full px-4 py-3 font-semibold rounded-full border-none focus:outline-none"
//     //               />
//     //             </div>
//     //           </div>
//     //         </form>
//     //       </div>
//     //     </div>

//     //     {/* Tool Info Form */}
//     //     <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 mt-[300px] mb-[200px]">
//     //       <div className="flex items-center mb-8">
//     //         <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#6d8eff] mr-3">
//     //           <BsInfo size={20} />
//     //         </div>
//     //         <h2 className="text-lg font-bold">2. Tool information</h2>
//     //       </div>

//     //       <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
//     //         {/* Tool Name and Icon */}
//     //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     //           <div>
//     //             <label htmlFor="toolName" className="block text-sm font-bold text-gray-700 mb-2">
//     //               Tool Name
//     //             </label>
//     //             <div className="shadow-[0_0_8px_rgba(125,66,251,0.4)] rounded-full">
//     //               <input
//     //                 type="text"
//     //                 id="toolName"
//     //                 name="toolName"
//     //                 accept="image/*"
//     //                 multiple
//     //                 className="w-full px-4 py-3 rounded-full font-semibold border-none focus:outline-none"
//     //                 onChange={(e)=> setName(e.target.value)}
//     //               />
//     //             </div>
//     //           </div>

//     //           <div>
//     //             <label htmlFor="toolIcon" className="block text-sm font-bold text-gray-700 mb-2">
//     //               Tool Icon
//     //             </label>
//     //             <div className="shadow-[0_0_8px_rgba(125,66,251,0.4)] rounded-full">
//     //               <input
//     //                 type="file"
//     //                 id="toolIcon"
//     //                 name="toolIcon"
//     //                 placeholder="ex. drive.google.com/"
//     //                 className="w-full px-4 py-3 rounded-full font-semibold border-none focus:outline-none"
//     //               />
//     //             </div>
//     //           </div>
//     //         </div>

//     //         {/* Tool Link */}
//     //         <label htmlFor="toolLink" className="block text-sm font-bold text-gray-700 mb-3">
//     //           Tool link
//     //         </label>
//     //         <div className="shadow-[0_0_8px_rgba(125,66,251,0.4)] rounded-full">
//     //           <input
//     //             type="url"
//     //             id="toolLink"
//     //             name="toolLink"
//     //             placeholder="ex. www.startuper.com/"
//     //             className="w-full px-4 py-3 rounded-full font-semibold border-none focus:outline-none"
//     //           />
//     //         </div>

//     //         {/* Tool Description */}
//     //         <label htmlFor="toolDescription" className="block text-sm font-bold text-gray-700 mb-3">
//     //           Tool description
//     //         </label>
//     //         <div className="shadow-[0_0_8px_rgba(125,66,251,0.4)] rounded-xl">
//     //           <textarea
//     //             id="toolDescription"
//     //             name="toolDescription"
//     //             rows={6}
//     //             placeholder="Tool description..."
//     //             className="w-full px-4 py-3 rounded-xl font-semibold border-none focus:outline-none"
//     //           ></textarea>
//     //         </div>

//     //         {/* Tool Images */}
//     //         <label htmlFor="toolImages" className="block text-sm font-bold text-gray-700 mb-3">
//     //           Tool images
//     //         </label>
//     //         <div className="shadow-[0_0_8px_rgba(125,66,251,0.4)] rounded-full">
//     //           <input
//     //             type="file"
//     //             id="toolImages"
//     //             name="toolImages"
//     //             accept="/image/*"
//     //             multiple
//     //             className="w-full px-4 py-3 rounded-full font-semibold border-none focus:outline-none"
//     //             onChange={(e) => {
//     //               if (e.target.files && e.target.files[0]) {
//     //                 setImage(e.target.files[0]);
//     //               }
//     //             }}
//     //           />
//     //         </div>

//     //         {/* Tool Tags */}
//     //         <label htmlFor="toolTags" className="block text-sm font-bold text-gray-700 mb-2">
//     //           Tool Tags
//     //         </label>
//     //         <div className="shadow-[0_0_8px_rgba(125,66,251,0.4)] rounded-full">
//     //           <input
//     //             type="text"
//     //             id="toolTags"
//     //             name="toolTags"
//     //             placeholder="ex. Design, Copywriting..."
//     //             className="w-full px-4 py-3 rounded-full font-semibold border-none focus:outline-none"
//     //           />
//     //         </div>

//     //         {/* Newsletter Checkboxes */}
//     //         <div className="pt-2">
//     //           <p className="text-gray-700 font-bold mb-2">
//     //             For more exciting tips and Latest AI tools, Subscribe to our newsletter AI Tools Radar
//     //           </p>

//     //           <div className="space-y-2">
//     //             <div className="flex items-start">
//     //               <input
//     //                 type="checkbox"
//     //                 id="subscribeNewsletter"
//     //                 name="subscribeNewsletter"
//     //                 className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//     //               />
//     //               <label htmlFor="subscribeNewsletter" className="ml-2 font-semibold text-sm text-gray-700">
//     //                 Yes please, subscribe me to AI Tools Radar newsletter
//     //               </label>
//     //             </div>

//     //             <div className="flex items-start">
//     //               <input
//     //                 type="checkbox"
//     //                 id="agreeTerms"
//     //                 name="agreeTerms"
//     //                 className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//     //               />
//     //               <label htmlFor="agreeTerms" className="ml-2 font-semibold text-sm text-gray-700">
//     //                 By submitting, I agree to AI Tools Radar{" "}
//     //                 <a href="#" className="underline font-medium">
//     //                   Privacy Notice
//     //                 </a>
//     //                 . This site is protected by reCAPTCHA and the Google{" "}
//     //                 <a href="#" className="underline font-medium">
//     //                   Privacy Policy
//     //                 </a>{" "}
//     //                 and{" "}
//     //                 <a href="#" className="underline font-medium">
//     //                   Terms of Service
//     //                 </a>{" "}
//     //                 apply.
//     //               </label>
//     //             </div>
//     //           </div>
//     //         </div>

//     //         {/* Submit Button */}
//     //         <button
//     //           type="submit"
//     //           className="w-full bg-[#7d42fb] text-white py-3 px-6 rounded-full font-medium mt-4 hover:bg-indigo-700 transition-colors hover:-translate-y-1 ease-in-out cursor-pointer"
//     //         >
//     //           Submit Tool
//     //         </button>
//     //       </form>
//     //     </div>

//     //     <div className="absolute flex flex-col space-y-30 top-[10%] left-[80%] text-black">
//     //       <Image src="/hero4.png" alt="hero" width={61} height={19} className="ml-15" />
//     //       <Image src="/tri.png" alt="hero" width={43} height={41} />
//     //       <Image src="/hero6.png" alt="hero" width={20} height={20} className="ml-15" />
//     //     </div>
//     //   </div>
//     // </div>

//     <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
//       <div>
//       <label htmlFor="toolName" className="block text-sm font-bold text-gray-700 mb-2">
//         Tool Name
//       </label>
//       <input
//         type="text"
//         id="toolName"
//         placeholder="Enter Tool Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//       />
//       </div>

//       <div>
//       <label htmlFor="toolImage" className="block text-sm font-bold text-gray-700 mb-2">
//         Tool Icon
//       </label>
//       <input
//         type="file"
//         id="toolImage"
//         accept="image/*"
//         onChange={(e) => {
//         if (e.target.files && e.target.files[0]) {
//           setImage(e.target.files[0]);
//         }
//         }}
//         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//       />
//       </div>

//       <button
//       type="submit"
//       className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//       >
//       Submit Tool
//       </button>
//     </form>
//   );
// };

// export default SubmitToolForm;


'use client'

import { useState } from "react";

const SubmitToolForm = () => {
  // States for form fields
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);

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
        alert("Tool submitted successfully!");
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

  return (
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
          className="w-full px-4 py-3 rounded-full shadow border focus:outline-none"
          required
        />
      </div>

      {/* Tool Image */}
      <div>
        <label htmlFor="toolImages" className="block text-sm font-semibold text-gray-700 mb-2">Tool Image</label>
        <input
          type="file"
          id="toolImages"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
          className="w-full px-4 py-3 rounded-full shadow border focus:outline-none"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#7d42fb] text-white py-3 px-6 rounded-full font-semibold hover:bg-indigo-700 transition"
      >
        Submit Tool
      </button>
    </form>
  );
};

export default SubmitToolForm;
 