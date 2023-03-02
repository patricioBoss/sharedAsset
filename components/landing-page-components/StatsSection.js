/* This example requires Tailwind CSS v2.0+ */
export default function StatsSection() {
  return (
    <div className="bg-[#006642]">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trusted by over I million Users across the World.
          </h2>
          <p className="mt-3 text-xl text-green-200 sm:mt-4">
            view some of our stats and counting.
          </p>
        </div>
        <dl className="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8">
          <div className="flex flex-col">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-green-200">
              Secure
            </dt>
            <dd className="order-1 text-5xl font-bold tracking-tight text-white">
              100%
            </dd>
          </div>
          <div className="mt-10 flex flex-col sm:mt-0">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-green-200">
              customer support
            </dt>
            <dd className="order-1 text-5xl font-bold tracking-tight text-white">
              24/7
            </dd>
          </div>
          <div className="mt-10 flex flex-col sm:mt-0">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-green-200">
              Users
            </dt>
            <dd className="order-1 text-5xl font-bold tracking-tight text-white">
              900k+
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
