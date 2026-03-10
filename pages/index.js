import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState("");

  const addOrder = () => {
    if (newOrder.trim() === "") return;
    setOrders([...orders, newOrder]);
    setNewOrder("");
  };

  // تنسيق الأزرار
  const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  };

  const navStyle = {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Navigation Menu */}
      <nav style={navStyle}>
        <Link href="/">
          <button style={buttonStyle}>الرئيسية</button>
        </Link>
        <Link href="/inventory">
          <button style={buttonStyle}>المخزون</button>
        </Link>
        <Link href="/customers">
          <button style={buttonStyle}>العملاء</button>
        </Link>
        <Link href="/invoices">
          <button style={buttonStyle}>الفواتير</button>
        </Link>
        <Link href="/teacher">
          <button style={buttonStyle}>المدرس</button>
        </Link>
      </nav>

      {/* Main Content */}
      <h1>إدارة المطبعة</h1>
      <input
        type="text"
        value={newOrder}
        onChange={(e) => setNewOrder(e.target.value)}
        placeholder="أدخل الطلب"
      />
      <button onClick={addOrder} style={{ ...buttonStyle, marginLeft: "10px" }}>
        إضافة
      </button>
      <ul>
        {orders.map((order, i) => (
          <li key={i}>{order}</li>
        ))}
      </ul>
    </div>
  );
}
