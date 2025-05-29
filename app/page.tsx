import FeaturedProduct from "@/components/FeaturedProduct";
// import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
// import Tools from "@/components/Tools";
// import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
  <>

<div className="text-red-500 text-center">
  Hello
</div>
  <Hero/>
  <FeaturedProduct/>
  
   {/* <Navbar/>
   <Footer/> */}
  </>
  );
}
