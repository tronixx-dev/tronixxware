import React from "react";

const categories = ["All", "Electronics", "Fashion", "Toys", "Home"];

export default function CategoryBar({ onSelectCategory }) {
  return (
    <div className="fixed top-16 left-0 w-full bg-white z-40 shadow-md flex justify-center gap-4 py-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className="px-4 py-1 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
