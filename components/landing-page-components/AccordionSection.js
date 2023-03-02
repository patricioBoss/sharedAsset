/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "About Shared Asset",
    answer:
      "SharedAsset is a web-based investment platform that provides real-time access to a comprehensive range of global and local investment opportunities with ease and convenience, directly from any device with an internet connection. <br/>SharedAsset allows users to invest in or trade over 3,500 stocks listed on the U.S. stock market or their local exchanges in real-time. With a market cap of over $31 trillion, the U.S. stock market represents over 85% of all dollars invested in global markets",
  },
  {
    question: "What we offer",
    answer:
      "Finding the best global and local investment opportunities is fast and straightforward with SharedAsset. Users can fund their dollar wallet almost instantly and start investing in shares, ETFs or Fixed Returns with just a few clicks.",
  },
  {
    question: "How to sign up on SharedAsset",
    answer: `Sure, here's a simple step-by-step guide on how to sign up on SharedAsset:<br/>
        <br/>
      1. Open your preferred web browser and navigate to the stock investment web app's website.<br/>
      2. Look for the "Sign Up" or "Register" button and click on it to start the registration process.<br/>
      3. Fill in your personal information, including your name, email address, and phone number.<br/>
      4. Choose a strong password and confirm it.<br/>
      5. Complete any additional verification steps required by the app, such as email verification or phone number verification.<br/>
      6. Provide your financial information, such as your bank account details, to fund your account and start investing.<br/>
      7. Once your account is set up, you can start exploring the app's features, such as browsing available investments and buying and selling stocks.<br/>`,
  },
  {
    question:
      "Can I own multiple assets on SharedAsset to diversify my portfolio?",
    answer: `Yes, with sharedAsset, you can own multiple assets to diversify your portfolio and reduce your investment risk.<br/>
          <br/>
    Currently, sharedAsset allows you to invest in US Stocks and ETFs, and in the near future, you'll also have the option to purchase units of a dollar-denominated mutual fund, Eurobonds, and other assets, all at once.`,
  },
  {
    question: "When is the Best Time to Invest",
    answer:
      "The best time to invest is often considered to be anytime, as long as you have the financial means to do so.",
  },
  {
    question: "Our Fixed plans",
    answer:
      "SharedAsset's Fixed Returns* is a fixed-income dollar-denominated investment that provides up to 40% USD monthly returns, while eliminating investment risk. This feature enables users to earn higher yields than what is obtainable with regular dollar savings accounts, without the fear of losing their investment.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "Investment Cycle and Affiliate plan",
    answer:
      "Once approved, an investment lasts for 30 days, with daily interest added. We provide an affiliate program as well as bonuses on investments made by people you referred to our platform.",
  },
  // More questions...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AccordionSection() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
          <h2 className="text-center text-xl font-medium tracking-tight text-gray-400 sm:text-2xl mb-16">
            Advice and answers from the SharedAsset Team
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq, idx) => (
              <Disclosure as="div" key={idx} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                        <span className="font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-6 w-6 transform"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p
                        className="text-base text-gray-500"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
