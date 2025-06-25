import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function QuantityShipment({ getQuantity }) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (typeof getQuantity === "function") {
      getQuantity(quantity);
    }
  }, [quantity]);

  return (
    <div className="flex justify-between gap-10 items-center p-2 bg-white rounded-lg border border-neutral-400">
      <button
        onClick={() => setQuantity(Math.max(0, quantity - 1))}
        className="w-7 h-7 bg-red-50 rounded-lg"
      >-</button>
      <span className="text-lg md:text-xl font-bold">{quantity}</span>
      <button
        onClick={() => setQuantity(quantity + 1)}
        className="w-7 h-7 bg-red-50 rounded-lg"
      >+</button>
    </div>
  );
}

export default QuantityShipment;
