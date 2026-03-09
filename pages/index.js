import { useState } from "react";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState("");

  const addOrder = () => {
    if (newOrder.trim() === "") return;
    setOrders([...orders, newOrder]);
    setNewOrder("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>إدارة المطبعة</h1>
      <input
        type="text"
        value={newOrder}
        onChange={(e) => setNewOrder(e.target.value)}
        placeholder="أدخل الطلب"
      />
      <button onClick={addOrder}>إضافة</button>
      <ul>
        {orders.map((order, i) => (
          <li key={i}>{order}</li>
        ))}
      </ul>
    </div>
  );
  }
