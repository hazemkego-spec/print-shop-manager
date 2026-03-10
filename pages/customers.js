import { useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState("");

  const addCustomer = () => {
    if (newCustomer.trim() === "") return;
    setCustomers([...customers, newCustomer]);
    setNewCustomer("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>إدارة العملاء</h1>
      <input
        type="text"
        value={newCustomer}
        onChange={(e) => setNewCustomer(e.target.value)}
        placeholder="أدخل اسم العميل"
      />
      <button onClick={addCustomer}>إضافة</button>
      <ul>
        {customers.map((customer, i) => (
          <li key={i}>{customer}</li>
        ))}
      </ul>
    </div>
  );
}