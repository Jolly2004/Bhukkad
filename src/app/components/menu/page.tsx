export default function CategoryList() {
  const categories = [
    { name: "Salad", img: "https://plus.unsplash.com/premium_photo-1673590981774-d9f534e0c617?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Rolls", img: "https://media.istockphoto.com/id/665807568/photo/indian-popular-street-food-called-veg-franky-made-using-vegetables-wrapped-inside-paratha.webp?a=1&b=1&s=612x612&w=0&k=20&c=tRvuqMMQjse3fOSlbsiis4vdVLPgxFYRipBtYASbRmU=" },
    { name: "Deserts", img: "https://images.unsplash.com/photo-1537200900027-35a21559e661?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Sandwich", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Cake", img: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Pure Veg", img: "https://images.unsplash.com/photo-1646568109040-27893ba7d9fd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Pasta", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Noodles", img: "https://plus.unsplash.com/premium_photo-1694670234085-4f38b261ce5b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
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
