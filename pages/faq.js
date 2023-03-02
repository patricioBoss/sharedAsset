import React from "react";
import AccordionSection from "../components/landing-page-components/AccordionSection";
import Footer from "../components/landing-page-components/Footer";
import Navbar from "../components/landing-page-components/Navbar";

const faq = () => {
  return (
    <>
      <div className=" bg-[url(/logo/overlay-img.svg)] bg-cover bg-no-repeat bg-center">
        <Navbar />
        <div className=" pt-[199px] flex flex-col items-center justify-center pb-28">
          <h1 className=" text-green-700 sm:text-[2.375rem]  sm:text-justify  leading-[3.5625rem] text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <div className="w-full">
            <div className="relative mt-[27px] max-w-lg mx-auto">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-[#FAFBFC] border border-gray-300 text-gray-500 rounded-[3px] focus:ring-green-500 focus:border-green-500 outline-none block w-full pr-10 pl-2 py-2"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div>
      <AccordionSection />
      <Footer />
    </>
  );
};

export default faq;
