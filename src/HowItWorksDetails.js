import React from "react";

function HowItWorksDetails({ children, heading, paragraph }) {
  return (
    <div className="flex flex-row items-center md:pl-4 md:w-1/2 lg:w-1/3 md:flex-col md:space-y-2">
      {children}
      <div className="flex flex-col space-y-2 pl-2">
        <h1 className="text-xl font-normal md:text-center">{heading}</h1>
        <p className="md:text-center">{paragraph}</p>
      </div>
    </div>
  );
}

export default HowItWorksDetails;
