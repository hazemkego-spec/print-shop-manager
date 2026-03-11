import { useState } from "react";

export default function Home() {
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState(""); // الصف الدراسي
  const [copies, setCopies] = useState("");
  const [pagesPerCopy, setPagesPerCopy] = useState("");
  const [pricePiastres, setPricePiastres] = useState(""); // السعر بالقروش فقط
  const [paidStatus, setPaidStatus] = useState("لم يتم الدفع");
  const [paidAmount, setPaidAmount] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);

  const calculateTotal = () => {
    const totalPages = Number(copies) * Number(pagesPerCopy);
    const pricePerPage = Number(pricePiastres) / 100; // تحويل القروش إلى جنيه
    const total = totalPages * pricePerPage;
    return total.toFixed(2);
  };

  const sendWhatsApp = () => {
    const total = calculateTotal();
    const message = `
🧾 فاتورة رقم: ${invoiceNumber}
👨‍🏫 المدرس: ${teacher}
📘 المادة: ${subject}
🏫 الصف الدراسي: ${grade}
📄 عدد النسخ: ${copies}
📑 عدد صفحات النسخة: ${pagesPerCopy}
💵 سعر الورقة: ${pricePiastres} قرش
💰 الإجمالي: ${total} جنيه
📌 حالة الدفع: ${paidStatus}
💳 المبلغ المدفوع: ${paidAmount} جنيه
    `;

    const url = `https://wa.me/201122947479?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    setInvoiceNumber(invoiceNumber + 1);
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundImage: "url('/logo.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ backgroundColor: "rgba(255,255,255,0.8)", display: "inline-block", padding: "10px 20px", borderRadius: "10px" }}>
        مطبعة الرحاب
      </h1>

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
        type="text"
        placeholder="الصف الدراسي"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
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
      <input
        type="number"
        placeholder="سعر الورقة بالقروش (مثال: 80)"
        value={pricePiastres}
        onChange={(e) => setPricePiastres(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />

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