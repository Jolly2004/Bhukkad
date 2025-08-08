import Navbar from "./components/navbar/navbar/page";



// src/pages/HomePage.jsx
;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      
      {/* Main content */}
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to Tomato</h1>
        <p className="text-gray-700">Your favorite food, delivered fast.</p>
      </main>
    </div>
  );
}
