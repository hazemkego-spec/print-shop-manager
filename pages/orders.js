import { useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ student: "", copies: "", price: "" });

  const handleChange = (field, value) => {
    setNewOrder({ ...newOrder, [field]: value });
  };

  const addOrder = () => {
    setOrders([...orders, newOrder]);
    setNewOrder({ student: "", copies: "", price: "" });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>📑 إدارة الطلبات</h1>

      {/* إدخال بيانات الطلب */}
      <input
        type="text"
        placeholder="اسم الطالب"
        value={newOrder.student}
        onChange={(e) => handleChange("student", e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />
      <input
        type="number"
        placeholder="عدد النسخ"
        value={newOrder.copies}
        onChange={(e) => handleChange("copies", e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />
      <input
        type="number"
        placeholder="السعر بالجنيه"
        value={newOrder.price}
        onChange={(e) => handleChange("price", e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />

      <button
        onClick={addOrder}
        style={{ marginTop: "15px", padding: "10px 20px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px" }}
      >
        إضافة الطلب
      </button>

      {/* عرض الطلبات */}
      <h2 style={{ marginTop: "20px" }}>📋 قائمة الطلبات</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {orders.map((order, index) => (
          <li key={index} style={{ margin: "10px 0", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
            👤 {order.student} | 📄 {order.copies} نسخة | 💰 {order.price} جنيه
          </li>
        ))}
      </ul>
    </div>
  );
}