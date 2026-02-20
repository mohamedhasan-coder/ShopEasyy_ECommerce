import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    description: "High quality sound with noise cancellation.",
    price: 99,
    image: "https://images.unsplash.com/photo-1518441902117-f6d35f9f9a7b",
  },
  {
    id: 2,
    title: "Smart Watch",
    description: "Track your fitness and notifications.",
    price: 129,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
  },
];

const Products = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default Products;