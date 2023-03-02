import React from "react";
import Link from "next/link";
import { BsTelegram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className=" lg:col-span-3">
            <span className="flex gap-2 w-32 h-10  rounded-lg text-white font-semibold text-4xl">
              <img src={"/logo/sharedasset.svg"} alt="logo" className="h-10" />
              SharedAsset
            </span>

            <p className="mt-4 text-sm text-gray-100">
              We provides real-time access to a wide range of global and local
              investment opportunities, with a focus on making the investment
              process fast, seamless, and secure. Users can fund their accounts
              in their local currency and start investing with just a few taps.
              sharedAsset places a strong emphasis on diversification and
              managing investment risk.
            </p>

            {/* <div className="flex mt-8 lg:col-span-1 text-gray-100 space-x-6">
              <a
                rel="noreferrer"
                className="hover:opacity-75"
                href="https://www.facebook.com/businessdayng/"
                target="_blank"
              >
                <span className="sr-only"> Facebook </span>

                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                className="hover:opacity-75"
                href="https://www.instagram.com/businessdayng/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Instagram </span>

                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                className="hover:opacity-75"
                href="https://twitter.com/BusinessDayNg"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Twitter </span>

                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>

              <Link
                className="hover:opacity-75"
                href=""
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> youtube </span>

                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="25px"
                  height="25px"
                >
                  <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z" />
                </svg>
              </Link>
            </div> */}
          </div>

          <div className="grid grid-cols-1 gap-10 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-2">
            <div>
              <p className="font-medium text-white">Contacts / support</p>

              <nav className="flex flex-col mt-4 text-sm text-gray-100 space-y-2">
                <a
                  className="hover:opacity-75 flex gap-4"
                  href="https://t.me/getsharedasset_support"
                >
                  <BsTelegram className="h-6 w-6" /> Telegram <br />
                </a>
                <div className="flex flex-col">
                  <br />
                  <br />
                  301 E. Fourth St. Cincinnati, OH 45202
                  <br />
                </div>
                <Link className="hover:opacity-75" href=""></Link>
              </nav>
            </div>

            <div>
              <p className="font-medium text-white">Legal</p>

              <nav className="flex flex-col mt-4 text-sm text-gray-100 space-y-2">
                <a
                  className="hover:opacity-75"
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://docs.google.com/document/d/e/2PACX-1vS6wnQHoJVsrRIyP7sKHgofy37rIy6Q7_jSRXFGjC6UpwIXHyzb3PtCXzTQYZ_yiNPX-J7-CG1LLdST/pub"
                >
                  Privacy Policy{" "}
                </a>
                <a
                  className="hover:opacity-75"
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://docs.google.com/document/d/e/2PACX-1vS6wnQHoJVsrRIyP7sKHgofy37rIy6Q7_jSRXFGjC6UpwIXHyzb3PtCXzTQYZ_yiNPX-J7-CG1LLdST/pub"
                >
                  Terms & Conditions{" "}
                </a>
                <a
                  className="hover:opacity-75"
                  href="https://wa.me/19295153736"
                >
                  Chat on Wastapp
                  <br />
                  (+1(929) 515-3736)
                </a>
              </nav>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-gray-100">
          All right reserved &copy; 2022 SharedAssetOnline
        </p>
      </div>
    </footer>
  );
};

export default Footer;
