import { useState } from "react";

export default function Home() {
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [cover, setCover] = useState("بدون غلاف");
  const [copies, setCopies] = useState("");
  const [pagesPerCopy, setPagesPerCopy] = useState("");
  const [pricePiastres, setPricePiastres] = useState("");
  const [paidStatus, setPaidStatus] = useState("لم يتم الدفع");
  const [paidAmount, setPaidAmount] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);

  const calculateTotal = () => {
    const totalPages = Number(copies) * Number(pagesPerCopy);
    const pricePerPage = Number(pricePiastres) / 100;
    const total = totalPages * pricePerPage;
    return total.toFixed(2);
  };

  const calculateRemaining = () => {
    const total = parseFloat(calculateTotal());
    if (paidStatus === "تم دفع جزء" && paidAmount) {
      return (total - Number(paidAmount)).toFixed(2);
    }
    if (paidStatus === "تم الدفع بالكامل") return "0.00";
    return total.toFixed(2);
  };

  const sendWhatsApp = () => {
    const total = calculateTotal();
    const remaining = calculateRemaining();
    const message = `
🧾 فاتورة رقم: ${invoiceNumber}
👨‍🏫 المدرس: ${teacher}
📘 المادة: ${subject}
🏫 الصف الدراسي: ${grade}
📦 الغلاف: ${cover}
📄 عدد النسخ: ${copies}
📑 عدد ورق النسخة الواحدة: ${pagesPerCopy}
💵 سعر الورقة: ${pricePiastres} قرش
💰 الإجمالي: ${total} جنيه
📌 حالة الدفع: ${paidStatus}
💳 المبلغ المدفوع: ${paidAmount} جنيه
💳 المبلغ المتبقي: ${remaining} جنيه
    `;

    const url = `https://wa.me/201122947479?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    setInvoiceNumber(invoiceNumber + 1);
  };

  const labelStyle = {
    display: "inline-block",
    width: "160px",
    textAlign: "right",
    fontWeight: "bold",
    color: "#0070f3",
    marginRight: "10px"
  };

  const inputStyle = {
    padding: "8px",
    margin: "5px",
    width: "200px"
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* اللوجو */}
      <img src="/logo.png" alt="شعار مطبعة الرحاب" style={{ width: "300px", marginBottom: "20px" }} />

      {/* إدخال البيانات داخل بلوك منسق */}
      <div style={{
        display: "inline-block",
        textAlign: "left",
        marginTop: "10px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9"
      }}>
        <div>
          <label style={labelStyle}>اسم المدرس:</label>
          <input type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>اسم المادة:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>الصف الدراسي:</label>
          <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>الغلاف:</label>
          <select value={cover} onChange={(e) => setCover(e.target.value)} style={inputStyle}>
            <option>غلاف</option>
            <option>بدون غلاف</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>عدد النسخ:</label>
          <input type="number" value={copies} onChange={(e) => setCopies(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>عدد ورق النسخة:</label>
          <input type="number" value={pagesPerCopy} onChange={(e) => setPagesPerCopy(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>سعر الورقة (بالقرش):</label>
          <input type="number" value={pricePiastres} onChange={(e) => setPricePiastres(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>حالة الدفع:</label>
          <select value={paidStatus} onChange={(e) => setPaidStatus(e.target.value)} style={inputStyle}>
            <option>لم يتم الدفع</option>
            <option>تم الدفع بالكامل</option>
            <option>تم دفع جزء</option>
          </select>
        </div>

        {paidStatus === "تم دفع جزء" && (
          <div>
            <label style={labelStyle}>المبلغ المدفوع:</label>
            <input type="number" value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} style={inputStyle} />
          </div>
        )}
      </div>

      <h3 style={{ marginTop: "20px" }}>💰 الإجمالي: {calculateTotal()} جنيه</h3>
      <h3 style={{ marginTop: "5px" }}>💳 المتبقي: {calculateRemaining()} جنيه</h3>

      <button
        onClick={sendWhatsApp}
        style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}
      >
        إرسال الطلب عبر واتساب
      </button>
    </div>
  );
}