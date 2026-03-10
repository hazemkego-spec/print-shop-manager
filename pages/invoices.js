import Link from "next/link";
import { useState } from "react";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({ customer: "", amount: "" });

  const addInvoice = () => {
    if (newInvoice.customer.trim() === "" || newInvoice.amount.trim() === "") return;
    setInvoices([...invoices, newInvoice]);
    setNewInvoice({ customer: "", amount: "" });
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

      <h1>إدارة الفواتير</h1>
      <input
        type="text"
        placeholder="اسم العميل"
        value={newInvoice.customer}
        onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}
      />
      <input
        type="text"
        placeholder="المبلغ"
        value={newInvoice.amount}
        onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
      />
      <button onClick={addInvoice} style={{ ...buttonStyle, marginLeft: "10px" }}>
        إضافة فاتورة
      </button>
      <ul>
        {invoices.map((invoice, i) => (
          <li key={i}>
            {invoice.customer} - {invoice.amount} جنيه
          </li>
        ))}
      </ul>
    </div>
  );
}