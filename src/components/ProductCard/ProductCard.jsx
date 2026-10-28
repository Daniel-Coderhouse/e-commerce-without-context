const ProductCard = ({ product, onAddToCart }) => {
  return (
    <article className="bg-white p-4 rounded-xl shadow">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-contain"
      />

      <h2 className="font-bold mt-4">{product.title}</h2>

      <p className="text-slate-500">${product.price}</p>

      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-4 cursor-pointer"
        onClick={() => onAddToCart(product)}
      >
        Agregar al carrito
      </button>
    </article>
  );
};

export default ProductCard;
