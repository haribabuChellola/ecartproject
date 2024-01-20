import React from "react";

import { useNavigate } from "react-router-dom";

function Category({ categoryName, id, imgsrc }) {
  const navigate = useNavigate();
  return (
    <div
      className="overflow-hidden   hover:cursor-pointer rounded-lg"
      id={id}
      onClick={() => navigate(`/categories/${categoryName}`)}
    >
      <div className="relative border  overflow-hidden h-40 md:h-52 lg:h-60 flex items-center justify-start md:justify-center rounded-lg ">
        <img
          className="absolute -z-20 w-full h-full object-cover"
          src={imgsrc}
          alt={categoryName}
        />
        <p
          aria-label="overlay"
          className="absolute bg-gradient-to-r from-cyan-600  w-full -z-10 h-full"
        ></p>
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1
            className="text-white text-center pl-4 text-lg uppercase tracking-wide "
            id="shadow"
          >
            {categoryName}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Category;
