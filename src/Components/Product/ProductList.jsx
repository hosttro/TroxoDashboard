import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../../api/productService";
import AddProductModal from "./AddProductModal"; // ✅ استيراد المودال

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // ✅ حالة المودال

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (err) {
      setError("فشل تحميل المنتجات");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا المنتج؟");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      fetchProducts(); // تحديث القائمة
    } catch {
      alert("فشل حذف المنتج، حاول مرة أخرى.");
    }
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    fetchProducts(); // إعادة تحميل بعد الإضافة
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 text-right space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">إدارة المنتجات</h2>
        <button
          onClick={handleOpenModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + إضافة منتج
        </button>
      </div>

      {loading && <p className="text-gray-500">جاري تحميل المنتجات...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && products.length === 0 && (
        <p className="text-gray-500">لا توجد منتجات حالياً</p>
      )}

      {!loading && products.length > 0 && (
        <table className="w-full text-right border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">الاسم</th>
              <th className="p-2">السعر</th>
              <th className="p-2">الكمية</th>
              <th className="p-2">العمليات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.price} ر.س</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && <AddProductModal onClose={handleCloseModal} />}
    </div>
  );
}
