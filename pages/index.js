import HeroSection from "../components/landing-page-components/HeroSection.js";

// ----------------------------------------------------------------------

import dynamic from "next/dynamic";
import StatsSection from "../components/landing-page-components/StatsSection";
import FeatureSection from "../components/landing-page-components/FeatureSection";
import PathnersSection from "../components/landing-page-components/PathnersSection";
import Newsletter from "../components/landing-page-components/Newsletter";
import { CallToAction } from "../components/landing-page-components/CallToAction.js";
import { Reviews } from "../components/landing-page-components/Reviews.js";
import SideMessage from "../components/landing-page-components/SideMessage.js";
import Footer from "../components/landing-page-components/Footer.js";

const TickerTape = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.TickerTape),
  {
    ssr: false,
  }
);

const tapeSymbol = [
  {
    title: "TESLA, INC.",
    proName: "NASDAQ:TSLA",
  },
  {
    title: "APPLE INC.",
    proName: "NASDAQ:AAPL",
  },
  {
    title: "AMAZON.COM, INC.",
    proName: "NASDAQ:AMZN",
  },
  {
    title: " MICROSOFT CORPORATION",
    proName: "NASDAQ:MSFT",
  },
  {
    title: "NETFLIX, INC.",
    proName: "NASDAQ:NFLX",
  },
  {
    title: " META PLATFORMS, INC.",
    proName: "NASDAQ:META",
  },
  {
    title: "GOOGLE INC.",
    proName: "NASDAQ:GOOGL",
  },
  {
    title: "ALIBABA",
    proName: "NYSE:BABA",
  },
  {
    title: " SHOPIFY INC.",
    proName: "NYSE:SHOP",
  },
  {
    title: "UBER",
    proName: "NYSE:UBER",
  },
];

export default function Index() {
  return (
    <>
      <HeroSection />
      <TickerTape symbols={tapeSymbol} displayMode={"compact"} />
      <StatsSection />
      <FeatureSection />
      <CallToAction />
      <PathnersSection />
      <SideMessage />
      <Reviews />
      <Newsletter />
      <Footer />
    </>
  );
}
