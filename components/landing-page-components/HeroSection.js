import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";

const HeroSection = () => {
  return (
    <div className="relative bg-gray-50">
      <Navbar />
      <main className="lg:relative">
        <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">The modern way to </span>{" "}
              <span className="block text-[#008254] xl:inline">
                Invest in everything
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              SharedAsset is the easiest way to access smarter investment
              options and earn real returns. We make investing simple,
              accessible and affordable.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link
                  href="/register"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#008254] px-8 py-3 text-base font-medium text-white hover:bg-[#006642] md:py-4 md:px-10 md:text-lg"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
            alt=""
          />
        </div>
      </main>
    </div>
  );
};

export default HeroSection;
