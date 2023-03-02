import React from "react";
import { Container } from "./Container";

const SideMessage = () => {
  return (
    <div className="relative bg-green-700 pt-12 pb-20">
      <div className=" absolute w-1/2 hidden md:block bottom-0 top-0 bg-[url(/img/sidecut.jpg)] bg-no-repeat bg-cover bg-center"></div>
      <Container>
        <div className=" flex ">
          <div className=" flex-1 hidden md:block" />
          <div className=" flex-1">
            <div className="px-8 text-center md:text-left">
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-5xl mb-8 sm:leading-[4rem]">
                Smart Automated{" "}
                <span className=" bg-orange-400 rounded-md px-1">
                  investing.
                </span>
              </h3>
              <p className="mt-3 text-lg text-gray-50 mb-8">
                Smart Portfolio is a robo-advisor that gives you a diversified
                portfolio based on your risk profile. It’s the easy way to
                invest. Using uptodate algorithms and technology to provide
                automated, algorithm-driven investment management services.With
                little minimum investment, making it accessible for people who
                want to start investing but may not have a lot of money to
                invest. We allow you to set specific financial goals with our
                provide personalized investment plans that will surely help you
                reach those goals
              </p>
              <a
                href="#"
                className="rounded-md border border-transparent px-8 py-3 text-base font-medium bg-white hover:bg-gray-50 text-[#006642] md:py-4 md:px-10 md:text-lg"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SideMessage;
