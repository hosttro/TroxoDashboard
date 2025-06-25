import { useEffect, useState } from "react";
import { getTopProducts } from "../../api/productService";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [period, setPeriod] = useState("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getTopProducts(period);
        setProducts(response.data);
      } catch (err) {
        setError("فشل تحميل المنتجات");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [period]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">المنتجات الأعلى</h2>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="day">اليوم</option>
          <option value="week">الأسبوع</option>
          <option value="month">الشهر</option>
        </select>
      </div>

      {loading && <p className="text-center text-gray-500">جاري التحميل...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500">لا توجد بيانات منتجات</p>
      )}

      {!loading && products.length > 0 && (
        <table className="w-full text-right">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">المنتج</th>
              <th className="p-2">الطلبات</th>
              <th className="p-2">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.totalOrders}</td>
                <td className="p-2">{product.totalAmount} ر.س</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
