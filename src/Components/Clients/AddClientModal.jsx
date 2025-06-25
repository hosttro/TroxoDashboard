import PropTypes from "prop-types";

export default function AddClientModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center p-4 z-[1000]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-lg z-[1001] w-full max-w-md p-6 text-right">
        <h2 className="text-xl font-bold mb-4">إضافة عميل جديد</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            name="clientName"
            placeholder="اسم العميل"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="رقم الهاتف"
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-between gap-2">
            <button
              type="button"
              className="w-full bg-gray-300 py-2 rounded"
              onClick={onClose}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="w-full py-2 rounded bg-[#FFDDDD] hover:bg-gray-200"
            >
              إضافة العميل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ✅ تفادي تحذير ESLint
AddClientModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
