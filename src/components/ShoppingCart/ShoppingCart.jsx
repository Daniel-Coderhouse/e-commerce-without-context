const ShoppingCart = ({ cart, onRemove }) => {
  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  return (
    <aside className="bg-white p-6 rounded-xl shadow h-fit">
      <h2 className="text-2xl font-bold mb-4">🛒 Mi carrito</h2>

      {cart.length === 0 ? (
        <p className="text-slate-500">El carrito está vacío</p>
      ) : (
        <>
          {cart.map((product) => (
            <div
              key={product.id}
              className="border-b py-3 flex justify-between items-center gap-4"
            >
              <div>
                <h3 className="font-semibold">{product.title}</h3>

                <p className="text-sm text-slate-500">
                  {product.quantity} x ${product.price}
                </p>
              </div>

              <button
                onClick={() => onRemove(product.id)}
                className="text-red-500 cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          ))}

          <div className="mt-6 flex justify-between font-bold text-xl">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </aside>
  );
};

export default ShoppingCart;
