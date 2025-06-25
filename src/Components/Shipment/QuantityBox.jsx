// import { useEffect, useState } from "react";

import { useEffect, useState } from "react";

// // eslint-disable-next-line react/prop-types
// function QuantityBox({ getQuantity , fetchCalcCost }) {
//   const [quantity, setQuantity] = useState(1);
//   useEffect(() => {
//     if(quantity<1){
//       setQuantity(1);
//     }
//     // ننادي الدالة فقط إذا كانت معرفة فعلاً
//     if (typeof getQuantity === "function") {
//       getQuantity(quantity);
//     }
//   }, [quantity]);

//   return (
//     <div className="flex justify-between gap-10 items-center p-2 bg-white rounded-lg border border-neutral-400">
//       <button
//         className="flex justify-center items-center w-7 h-7 bg-red-50 rounded-lg"
//         onClick={() => {
//           setQuantity(Math.max(0, quantity - 1));
//           // إذا كانت الدالة fetchCalcCost معرفة، نناديها
//           fetchCalcCost(quantity - 1);
//           if (typeof fetchCalcCost === "function") {
//             fetchCalcCost(quantity - 1);
//           }
//         }}
//         aria-label="Decrease quantity"
//       >
//         -
//       </button>
//       <span className="text-lg md:text-xl font-bold">{quantity}</span>
//       <button
//         className="flex justify-center items-center w-7 h-7 bg-red-50 rounded-lg"
//         onClick={() => {
//           setQuantity(quantity + 1);
//           // إذا كانت الدالة fetchCalcCost معرفة، نناديها
//           fetchCalcCost(quantity+1 );
//           if (typeof fetchCalcCost === "function") {
//             fetchCalcCost(quantity+1 );
//           }
//         }}
//         aria-label="Increase quantity"
//       >
//         +
//       </button>
//     </div>
//   );
// }

// export default QuantityBox;



// import { useEffect, useState } from "react";

// function QuantityBox({ getQuantity, fetchCalcCost, value }) {
//   const [quantity, setQuantity] = useState(value || 1);

//   useEffect(() => {
//     setQuantity(value || 1);
//   }, [value]);

//   const handleQuantityChange = (newQuantity) => {
//     const qty = Math.max(1, newQuantity);
//     setQuantity(qty);
//     if (typeof getQuantity === "function") {
//       getQuantity(qty);
//     }
//     if (typeof fetchCalcCost === "function") {
//       fetchCalcCost(qty);
//     }
//   };

//   return (
//     <div className="flex justify-between gap-10 items-center p-2 bg-white rounded-lg border border-neutral-400">
//       <button
//         className="flex justify-center items-center w-7 h-7 bg-red-50 rounded-lg"
//         onClick={() => handleQuantityChange(quantity - 1)}
//         aria-label="Decrease quantity"
//       >
//         -
//       </button>
//       <span className="text-lg md:text-xl font-bold">{quantity}</span>
//       <button
//         className="flex justify-center items-center w-7 h-7 bg-red-50 rounded-lg"
//         onClick={() => handleQuantityChange(quantity + 1)}
//         aria-label="Increase quantity"
//       >
//         +
//       </button>
//     </div>
//   );
// }

// export default QuantityBox;


function QuantityBox({ getQuantity, fetchCalcCost, value }) {
  const [quantity, setQuantity] = useState(value || 1);

  useEffect(() => {
    setQuantity(value || 1);
  }, [value]);

  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(1, newQuantity);
    setQuantity(qty);
    
    if (typeof getQuantity === "function") {
      getQuantity(qty);
    }
    if (typeof fetchCalcCost === "function") {
      setTimeout(() => fetchCalcCost(qty), 0);
    }
  };

  return (
    <div className="flex justify-between gap-10 items-center p-2 bg-white rounded-lg border border-neutral-400">
      <button
        className="flex justify-center items-center w-7 h-7 bg-red-50 rounded-lg"
        onClick={() => handleQuantityChange(quantity - 1)}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="text-lg md:text-xl font-bold">{quantity}</span>
      <button
        className="flex justify-center items-center w-7 h-7 bg-red-50 rounded-lg"
        onClick={() => handleQuantityChange(quantity + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
 export default QuantityBox;