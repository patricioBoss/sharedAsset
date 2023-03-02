import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useInView } from "framer-motion";

import { Container } from "./Container";

const reviews = [
  {
    title: "It is a Game-changer.",
    body: '"sharedAsset has been a game-changer for me. As someone who always wanted to invest in US stocks but found the process complicated, this app has made it so easy. I love the real-time access to global investment opportunities, and the fixed-income investment option is a great bonus."',
    author: "CrazyInvestor",
    rating: 4,
  },
  {
    title: "Easy to Use",
    body: "I was initially hesitant to invest in stocks, but sharedAsset made it less intimidating for me. The user-friendly interface and top-tier security measures put me at ease, and I've seen some great returns on my investments so far.",
    author: "Mike bolten",
    rating: 5,
  },
  {
    title: "Outsanding",
    body: "I've tried a few other investment apps before, but sharedAsset stands out for its fast and seamless investment process. I love that I can fund my account in my local currency and start investing in just a few taps.",
    author: "Tony chase",
    rating: 4,
  },
  {
    title: "Nice Investment Options",
    body: "The diversity of investment options on sharedAsset is impressive, and it's great to know that they are constantly expanding to offer even more choices. I appreciate that they emphasize diversification and managing risk, too",
    author: "Jordan Belfort",
    rating: 5,
  },
  {
    title: "Access to Global Opportunies",
    body: "As someone who lives in Africa, I always felt like I was missing out on global investment opportunities. sharedAsset has opened up a whole new world of possibilities for me, and I'm excited to see where my investments will take me.",
    author: "Dr Olamide",
    rating: 4,
  },
  {
    title: "Too good to be true.",
    body: "I was making money so fast with Pocket that it felt like a scam. But I sold my shares and withdrew the money and it’s really there, right in my bank account. This app is crazy!",
    author: "Julia Schulz",
    rating: 5,
  },
  {
    title: "Wish I could give 6 stars",
    body: "I love that sharedAsset makes it easy to monitor my investments in real-time. The app is always updating with the latest market information, which helps me make informed investment decisions.",
    author: "Sarah Luvz",
    rating: 5,
  },
  {
    title: "Simplify complicated processes",
    body: "sharedAsset has made it possible for me to invest in US stocks without having to go through a complicated brokerage process. I appreciate that the app is designed to make investing accessible to everyone.",
    author: "Katja Schmidt",
    rating: 3,
  },
  {
    title: "No more debt!",
    body: "I've been using sharedAsset for a few months now, and I'm already seeing the benefits of investing regularly. The app makes it easy to set up recurring investments and track my progress toward my financial goals",
    author: "Bruce Mariot",
    rating: 4,
  },
  {
    title: "I’m 13 and I’m rich.",
    body: "The fixed-income investment option on sharedAsset is a great way to earn steady returns while minimizing risk. I love that I can invest in a dollar-denominated fund and earn higher yields than I would with a regular savings account.",
    author: "Micheal Lin",
    rating: 5,
  },
  {
    title: "Started an investment firm.",
    body: "sharedAsset's commitment to top-tier security measures and licensing gives me peace of mind when it comes to investing my money. I trust that my investments are in good hands with this app.",
    author: "Yang Hong",
    rating: 4,
  },
  {
    title: "Inbuilt Porfolio Managment",
    body: "I love how sharedAsset allows me to diversify my portfolio with a variety of investment options. It's great to have everything in one place",
    author: "Mc Clark",
    rating: 5,
  },
  {
    title: "Quit my job.",
    body: "I downloaded Pocket three days ago and quit my job today. I can’t believe no one else thought to build a stock trading app that works this way!",
    author: "Rose",
    rating: 5,
  },
  {
    title: "Safe an Secure",
    body: "sharedAsset has exceeded my expectations with its range of investment options and user-friendly interface. It's the perfect platform for anyone interested in investing.",
    author: "Koddy Banks",
    rating: 4,
  },
];

function StarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map((index) => (
        <StarIcon
          key={index}
          className={clsx(
            "h-5 w-5",
            rating > index ? "fill-orange-300" : "fill-gray-300"
          )}
        />
      ))}
    </div>
  );
}

function Review({ title, body, author, rating, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = [
      "0s",
      "0.1s",
      "0.2s",
      "0.3s",
      "0.4s",
      "0.5s",
    ];
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ];
  }, []);

  return (
    <figure
      className={clsx(
        "animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base leading-7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  );
}

function splitArray(array, numParts) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

function ReviewColumn({
  className,
  reviews,
  reviewClassName = () => {},
  msPerPixel = 0,
}) {
  let columnRef = useRef();
  let [columnHeight, setColumnHeight] = useState(0);
  let duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current.offsetHeight);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={clsx("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration }}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  );
}

function ReviewGrid() {
  let containerRef = useRef();
  let isInView = useInView(containerRef, { once: true, amount: 0.4 });
  let columns = splitArray(reviews, 3);
  columns = [columns[0], columns[1], splitArray(columns[2], 2)];

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...columns[0], ...columns[2].flat(), ...columns[1]]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= columns[0].length + columns[2][0].length &&
                  "md:hidden",
                reviewIndex >= columns[0].length && "lg:hidden"
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...columns[1], ...columns[2][1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= columns[1].length && "lg:hidden"
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={columns[2].flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white" />
    </div>
  );
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pt-20 pb-16 sm:pt-32 sm:pb-24"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          Everyone is changing their life With SharedAsset.
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
          Thousands of people have doubled their net-worth in the last 30 days.
        </p>
        <ReviewGrid />
      </Container>
    </section>
  );
}
