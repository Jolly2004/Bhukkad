export default function CategoryList() {
  const categories = [
    { name: "Salad", img: "https://via.placeholder.com/150" },
    { name: "Rolls", img: "https://via.placeholder.com/150" },
    { name: "Deserts", img: "https://via.placeholder.com/150" },
    { name: "Sandwich", img: "https://via.placeholder.com/150" },
    { name: "Cake", img: "https://via.placeholder.com/150" },
    { name: "Pure Veg", img: "https://via.placeholder.com/150" },
    { name: "Pasta", img: "https://via.placeholder.com/150" },
    { name: "Noodles", img: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="flex justify-center gap-6 flex-wrap py-6">
      {categories.map((cat, i) => (
        <div
          key={i}
          className="flex flex-col items-center cursor-pointer group"
        >
          <div
            className={`w-20 h-20 rounded-full overflow-hidden border-4 border-transparent group-hover:border-orange-500 transition-all duration-300`}
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-2 text-sm font-medium">{cat.name}</p>
        </div>
      ))}
    </div>
  );
}
