import { useState } from "react";

export default function Home() {
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [copies, setCopies] = useState("");
  const [pagesPerCopy, setPagesPerCopy] = useState("");
  const [pricePounds, setPricePounds] = useState("");
  const [pricePiastres, setPricePiastres] = useState("");
  const [paidStatus, setPaidStatus] = useState("لم يتم الدفع");
  const [paidAmount, setPaidAmount] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1); // يبدأ من 1

  const calculateTotal = () => {
    const totalPages = Number(copies) * Number(pagesPerCopy);
    const pricePerPage = Number(pricePounds) + Number(pricePiastres) / 100;
    const total = totalPages * pricePerPage;
    return total.toFixed(2); // جنيه + قروش
  };

  const sendWhatsApp = () => {
    const total = calculateTotal();
    const message = `
🧾 فاتورة رقم: ${invoiceNumber}
👨‍🏫 المدرس: ${teacher}
📘 المادة: ${subject}
📄 عدد النسخ: ${copies}
📑 عدد صفحات النسخة: ${pagesPerCopy}
💵 سعر الورقة: ${pricePounds} جنيه و ${pricePiastres} قرش
💰 الإجمالي: ${total} جنيه
📌 حالة الدفع: ${paidStatus}
💳 المبلغ المدفوع: ${paidAmount} جنيه
    `;

    const url = `https://wa.me/201122947479?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    // بعد إرسال الطلب نزود رقم الفاتورة
    setInvoiceNumber(invoiceNumber + 1);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* اللوجو */}
      <img src="/logo.png" alt="شعار مطبعة الرحاب" style={{ width: "150px", marginBottom: "10px" }} />
      <h1>مطبعة الرحاب</h1>

      {/* زرار بدء الطلبات */}
      <h2>بدء الطلبات</h2>

      <input
        type="text"
        placeholder="اسم المدرس"
        value={teacher}
        onChange={(e) => setTeacher(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />
      <input
        type="text"
        placeholder="اسم المادة"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />
      <input
        type="number"
        placeholder="عدد النسخ"
        value={copies}
        onChange={(e) => setCopies(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />
      <input
        type="number"
        placeholder="عدد صفحات النسخة الواحدة"
        value={pagesPerCopy}
        onChange={(e) => setPagesPerCopy(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />
      <div style={{ margin: "10px auto" }}>
        <input
          type="number"
          placeholder="سعر الورقة بالجنيه"
          value={pricePounds}
          onChange={(e) => setPricePounds(e.target.value)}
          style={{ width: "45%", padding: "8px", marginRight: "5px" }}
        />
        <input
          type="number"
          placeholder="سعر الورقة بالقروش"
          value={pricePiastres}
          onChange={(e) => setPricePiastres(e.target.value)}
          style={{ width: "45%", padding: "8px" }}
        />
      </div>

      <select
        value={paidStatus}
        onChange={(e) => setPaidStatus(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      >
        <option>لم يتم الدفع</option>
        <option>تم الدفع بالكامل</option>
        <option>تم دفع جزء</option>
      </select>

      {paidStatus === "تم دفع جزء" && (
        <input
          type="number"
          placeholder="المبلغ المدفوع"
          value={paidAmount}
          onChange={(e) => setPaidAmount(e.target.value)}
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
        />
      )}

      <h3>💰 الإجمالي: {calculateTotal()} جنيه</h3>

      <button
        onClick={sendWhatsApp}
        style={{ marginTop: "15px", padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}
      >
        إرسال الطلب عبر واتساب
      </button>
    </div>
  );
}