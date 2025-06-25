import PropTypes from "prop-types";

export default function WalletCard({ balance }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-right border border-pink-950">
      <h2 className="text-xl font-semibold text-pink-950 mb-2">رصيد محفظتك</h2>
      <p className="text-3xl font-bold text-green-600 flex items-center gap-2">{balance}   <img
              src={ "/Icones/CurrencyGreen.svg"}
              alt="عملة"
              className="w-12 h-12 inline-block ml-2"
            /> </p>
    </div>
  );
}

WalletCard.propTypes = {
  balance: PropTypes.number.isRequired,
};
