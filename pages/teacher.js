import Link from "next/link";
import { useState } from "react";

export default function Teacher() {
  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
    copies: "",
    pagesPerCopy: "",
    pricePerPage: "",
    paid: false,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const calculatePrice = () => {
    const copies = parseInt(teacher.copies) || 0;
    const pages = parseInt(teacher.pagesPerCopy) || 0;
    const price = parseFloat(teacher.pricePerPage) || 0;
    const total = copies * pages * price;
    setTotalPrice(total);
  };

  const sendWhatsApp = () => {
    const message = `طلب طباعة جديد:
المدرس: ${teacher.name}
المادة: ${teacher.subject}
عدد النسخ: ${teacher.copies}
عدد أوراق النسخة: ${teacher.pagesPerCopy}
سعر الصفحة: ${teacher.pricePerPage} جنيه
الإجمالي: ${totalPrice} جنيه
حالة الدفع: ${teacher.paid ? "مدفوع" : "غير مدفوع"}`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
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
      {/* Navigation Menu */}
      <nav style={navStyle}>
        <Link href="/"><button style={buttonStyle}>الرئيسية</button></Link>
        <Link href="/inventory"><button style={buttonStyle}>المخزون</button></Link>
        <Link href="/customers"><button style={buttonStyle}>العملاء</button></Link>
        <Link href="/invoices"><button style={buttonStyle}>الفواتير</button></Link>
        <Link href="/teacher"><button style={buttonStyle}>المدرس</button></Link>
      </nav>

      {/* Main Content */}
      <h1>تسجيل طلب طباعة للمدرس</h1>
      <input
        type="text"
        placeholder="اسم المدرس"
        value={teacher.name}
        onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="اسم المادة"
        value={teacher.subject}
        onChange={(e) => setTeacher({ ...teacher, subject: e.target.value })}
      />
      <input
        type="number"
        placeholder="عدد النسخ"
        value={teacher.copies}
        onChange={(e) => setTeacher({ ...teacher, copies: e.target.value })}
      />
      <input
        type="number"
        placeholder="عدد أوراق النسخة"
        value={teacher.pagesPerCopy}
        onChange={(e) => setTeacher({ ...teacher, pagesPerCopy: e.target.value })}
      />
      <input
        type="number"
        placeholder="سعر الصفحة (جنيه)"
        value={teacher.pricePerPage}
        onChange={(e) => setTeacher({ ...teacher, pricePerPage: e.target.value })}
      />

      <button onClick={calculatePrice} style={{ ...buttonStyle, marginTop: "10px" }}>
        احسب السعر
      </button>
      <h3>الإجمالي: {totalPrice} جنيه</h3>

      <label style={{ display: "block", marginTop: "10px" }}>
        <input
          type="checkbox"
          checked={teacher.paid}
          onChange={(e) => setTeacher({ ...teacher, paid: e.target.checked })}
        />
        تم الدفع
      </label>

      <button onClick={sendWhatsApp} style={{ ...buttonStyle, marginTop: "10px" }}>
        إرسال الطلب عبر واتساب
      </button>
    </div>
  );
}