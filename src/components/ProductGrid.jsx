import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">
        No products found
      </p>
    );
  }

  return (
    <div className="
      grid 
      grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      gap-6
    ">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
}
