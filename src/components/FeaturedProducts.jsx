import ProductCard from "./ProductCard";
import { products } from "../data/products";

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);
  return (
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {featured.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
