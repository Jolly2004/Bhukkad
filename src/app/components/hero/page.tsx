import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative w-[90%] max-w-6xl mx-auto mt-8 rounded-2xl overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        alt="Food Background"
        className="w-full h-[400px] object-cover"
      />

      {/* Orange Overlay */}
      <div className="absolute inset-0 bg-orange-500/85"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-10 text-white">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Order your <br />
          favourite food here
        </h1>
        <p className="text-base md:text-lg mb-6 max-w-2xl">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
         <button className="w-fit px-5 py-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200 transition">
          View Menu
        </button>
      </div>
    </section>
    
  );
};

export default Hero;
