export default function OffersSection() {
  const offers = [
    {
      title: "Free Delivery",
      description: "On orders over $25",
      bg: "from-green-100 to-white",
    },
    {
      title: "Up to 50% Off",
      description: "On partner restaurants",
      bg: "from-red-100 to-white",
    },
    {
      title: "New Users Deal",
      description: "$5 off first order",
      bg: "from-yellow-100 to-white",
    },
  ];

  return (
    <div className="px-6 lg:px-20 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {offers.map((offer, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-br ${offer.bg} rounded-2xl shadow-sm p-6`}
        >
          <h3 className="text-lg font-bold text-gray-900">{offer.title}</h3>
          <p className="text-gray-600 mt-1">{offer.description}</p>
        </div>
      ))}
    </div>
  );
}
