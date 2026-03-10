import Link from "next/link";
import { useState } from "react";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() === "") return;
    setItems([...items, newItem]);
    setNewItem("");
  };

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
      <nav style={navStyle}>
        <Link href="/"><button style={buttonStyle}>الرئيسية</button></Link>
        <Link href="/inventory"><button style={buttonStyle}>المخزون</button></Link>
        <Link href="/customers"><button style={buttonStyle}>العملاء</button></Link>
        <Link href="/invoices"><button style={buttonStyle}>الفواتير</button></Link>
        <Link href="/teacher"><button style={buttonStyle}>المدرس</button></Link>
      </nav>

      <h1>إدارة المخزون</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="أدخل صنف جديد"
      />
      <button onClick={addItem} style={{ ...buttonStyle, marginLeft: "10px" }}>
        إضافة
      </button>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}