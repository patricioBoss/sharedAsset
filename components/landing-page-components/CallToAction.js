import { useId } from "react";

export function CircleBackground({
  color,
  width = 558,
  height = 558,
  ...props
}) {
  let id = useId();

  return (
    <svg
      viewBox="0 0 558 558"
      width={width}
      height={height}
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient
          id={id}
          x1="79"
          y1="16"
          x2="105"
          y2="237"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        opacity=".2"
        d="M1 279C1 125.465 125.465 1 279 1s278 124.465 278 278-124.465 278-278 278S1 432.535 1 279Z"
        stroke={color}
      />
      <path
        d="M1 279C1 125.465 125.465 1 279 1"
        stroke={`url(#${id})`}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Container({ className, ...props }) {
  return (
    <div
      className={"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 " + className}
      {...props}
    />
  );
}

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Make Your First Profit Today
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            It takes 30 seconds to sign up. Click to create an account today and
            we’ll send you bonus tip guaranteed to double your first investment.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-700 md:py-4 md:px-10 md:text-lg"
            >
              Get started
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
