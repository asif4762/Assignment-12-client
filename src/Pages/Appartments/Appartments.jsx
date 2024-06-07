import React from "react";
import Cards from "../../Components/Cards/Cards";

const Appartments = () => {
  return (
    <div className="pt-40">
      <div className="text-center w-1/3 mx-auto font-bold mb-10 border-y-4 pt-6 pb-6 border-green-700">
        <h1 className="text-3xl mb-2">Our Apartments</h1>
        <p className="text-lg">Find The Best Deal Here</p>
      </div>
      <Cards />
    </div>
  );
};

export default Appartments;
