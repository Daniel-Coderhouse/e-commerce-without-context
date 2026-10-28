import { useProducts } from "./hooks/useProducts";
import ProductCard from "./components/ProductCard/ProductCard";
import { useState } from "react";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

function App() {
  const { products, loading, error } = useProducts();
  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  const addToCart = (product) => {
    //Busca si el producto ya existe en el carrito. Si no lo encuentra, devuelve undefined.
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      //Si el producto ya existe, recorremos el carrito y actualizamos solamente su cantidad, creando un nuevo array.
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      //Agregamos un nuevo objeto sin modificar directamente el array original.
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  if (loading) return <h2>Cargando productos...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">MiniShop 🛒</h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full max-w-md p-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>

        <ShoppingCart cart={cart} onRemove={removeFromCart} />
      </div>
    </main>
  );
}

export default App;
