import { useState } from "react";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({ customer: "", amount: "" });

  const addInvoice = () => {
    if (newInvoice.customer.trim() === "" || newInvoice.amount.trim() === "") return;
    setInvoices([...invoices, newInvoice]);
    setNewInvoice({ customer: "", amount: "" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>إدارة الفواتير</h1>
      <input
        type="text"
        value={newInvoice.customer}
        onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}
        placeholder="اسم العميل"
      />
      <input
        type="text"
        value={newInvoice.amount}
        onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
        placeholder="المبلغ"
      />
      <button onClick={addInvoice}>إضافة فاتورة</button>
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