/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Emily Davis",
    role: "Representative",
    imageUrl: "/img/Emily Davis.jpg",
  },
  {
    name: "Zhang Wei",
    role: "Representative",
    imageUrl: "/img/Zhang Wei.jpg",
  },
  {
    name: "Jennifer Johnson",
    role: "Representative",
    imageUrl: "/img/Jennifer Johnson.jpg",
  },
  {
    name: "Markus Wagner",
    role: "Representative",
    imageUrl: "/img/Markus Wagner.jpg",
  },
  {
    name: "Madison Smith",
    role: "Representative",
    imageUrl: "/img/Madison Smith.jpg",
  },
  {
    name: "Ashley Rodriguez",
    role: "Representative",
    imageUrl: "/img/Ashley Rodriguez.jpg",
  },
  // More people...
];

export default function PathnersSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Meet Our Representatives
            </h2>
            <p className="text-xl text-gray-500">
              Our knowledgeable and friendly representatives are always ready to
              assist you and help you achieve your goals.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:max-w-5xl lg:grid-cols-3"
          >
            {people.map((person, index) => (
              <li key={index}>
                <div className="space-y-6">
                  <img
                    className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56"
                    src={person.imageUrl}
                    alt=""
                  />
                  <div className="space-y-2">
                    <div className="space-y-1 text-lg font-medium leading-6">
                      <h3>{person.name}</h3>
                      <p className="text-[#008254]">{person.role}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
