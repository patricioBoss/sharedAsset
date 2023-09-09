// import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import BoxButton from './BoxButton';
import Image from 'next/image';
//import bgImage from '../assets/img/bg-drop.png';
import bgImage from '../../assets/img/bg-drop.png';
import { subHead } from './landingUtils';
// ----------------------------------------------------------------------

export default function HeaderSection() {
  const router = useRouter();
  const handleScroll = () => {};
  // useEffect(() => {
  //   if (router.pathname == '/') {
  //     router.push('/dashboard/one');
  //   }
  // });

  return (
    <>
      <header className="shadow-none md:shadow-xl">
        <div className="relative pb-20">
          <Image src={bgImage} alt="background" layout="fill" objectFit="cover" priority />
          <Navbar handleScroll={handleScroll} />
          <div className="relative lg:container px-4 flex justify-center mx-auto">
            <div className="flex flex-col md:flex-row mt-[12rem] w-full">
              <div className="flex-1 px-3 md:px-0 lg:max-w-[32.5rem]">
                <h1 className="font-display font-extrabold text-white text-[2.5rem] sm:text-[3rem] lg:text-[4.5rem] leading-[2.7rem] md:leading-[3.7rem] lg:leading-[4.813rem]">
                  Thinking and Planing for the future
                </h1>
                <p className="font-display mb-4 text-[1.125rem] sm:pt-3 pr-10 leading-[1.125rem] text-white font-medium">
                  Join us and invest in the Crypto, Forex and Real estate markets with our range of investment plans.
                  Earn mouth watering bonuses!
                </p>
                <div>
                  <BoxButton
                    className="hover:bg-blue-700 bg-primary text-white mr-3"
                    onClick={() => router.push('/investments')}
                  >
                    Discover more
                  </BoxButton>
                  <BoxButton
                    variant="outline"
                    className="text-white hover:bg-white hover:text-black py-3"
                    onClick={() => router.push('/register')}
                  >
                    Get Started
                  </BoxButton>
                </div>
              </div>
              <div className="flex-1 flex-col justify-center items-center hidden md:flex">
                {/* <button className="border-none focus:outline-none outline-none rounded-full bg-white text-black w-[4.75rem] h-[4.75rem] flex justify-center items-center mb-4">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.75 12.0219V23.8629L22.9815 17.9964L15.75 12.0219ZM15.684 27.0009C15.2235 27.0009 14.7585 26.9019 14.325 26.6979C13.353 26.2404 12.75 25.3284 12.75 24.3189V11.6799C12.75 10.6719 13.353 9.75989 14.325 9.30239C15.423 8.78489 16.725 8.93489 17.6385 9.68939L25.287 16.0104C25.9005 16.5144 26.25 17.2404 26.25 17.9994C26.25 18.7584 25.9005 19.4859 25.287 19.9899L17.6385 26.3079C17.0865 26.7654 16.3905 27.0009 15.684 27.0009V27.0009Z"
                      fill="black"
                    />
                  </svg>
                </button> */}
              </div>
            </div>
          </div>
        </div>

        <section className="lg:container mx-auto">
          <div className="flex flex-col md:flex-row py-6 lg:py-8">
            {subHead.map(({ title, details, img }) => (
              <div key={title} className="flex items-center w-full mb-4 px-5 md:px-0 md:mb-0 lg:w-1/3">
                <div>
                  {' '}
                  {/* <div
                    style={{
                      WebkitMask: `url(./icons/layers.svg) no-repeat center / contain`,
                      mask: `url(./icons/layers.svg) no-repeat center / contain`,
                    }}
                    className={'w-[4rem] h-[4rem]'}
                  ></div> */}
                  <div className={'w-[5.188rem] h-[5.188rem] p-2'}>
                    <img src={img} className={'w-full block'} alt="icon" />
                  </div>
                </div>
                <div className="px-3">
                  <h6 className="pb-2">{title}</h6>
                  <p className="text-[#4F4F4F]">{details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </header>
    </>
  );
}
