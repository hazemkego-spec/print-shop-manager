import { useState } from "react";

export default function Teacher() {
  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
    grade: "", // الصف الدراسي
    copies: "",
    pagesPerCopy: "",
    pricePerPage: "",
    paid: false,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState(1); // رقم الفاتورة يبدأ من 1

  // حساب السعر بالجنيهات والقروش
  const calculatePrice = () => {
    const copies = parseInt(teacher.copies) || 0;
    const pages = parseInt(teacher.pagesPerCopy) || 0;
    const price = parseFloat(teacher.pricePerPage) || 0;
    const total = copies * pages * price;
    setTotalPrice(total);
  };

  // إرسال الطلب لرقم واتساب ثابت مع رسالة ترحيب + رقم فاتورة + وقت
  const sendWhatsApp = () => {
    const pounds = Math.floor(totalPrice); // الجنيهات
    const piastres = Math.round((totalPrice - pounds) * 100); // القروش
    const now = new Date();
    const dateTime = now.toLocaleString("ar-EG"); // التاريخ والوقت بالعربية

    const message = `أهلاً بك في مطبعة الرحاب 🌸
فاتورة رقم: ${invoiceNumber}
تاريخ الطلب: ${dateTime}

طلب طباعة جديد:
المدرس: ${teacher.name}
المادة: ${teacher.subject}
الصف الدراسي: ${teacher.grade}
عدد النسخ: ${teacher.copies}
عدد أوراق النسخة: ${teacher.pagesPerCopy}
سعر الصفحة: ${teacher.pricePerPage} جنيه
الإجمالي: ${pounds} جنيه و ${piastres} قرش
حالة الدفع: ${teacher.paid ? "مدفوع" : "غير مدفوع"}`;

    const phone = "01122947479"; // رقم ثابت
    const url = `https://wa.me/2${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    // زيادة رقم الفاتورة بعد كل إرسال
    setInvoiceNumber(invoiceNumber + 1);
  };

  const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
  };

  const logoStyle = {
    width: "120px",
    height: "120px",
    marginBottom: "15px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      {/* شعار المطبعة */}
      <img src="/logo.png" alt="لوجو مطبعة الرحاب" style={logoStyle} />
      <h1>مطبعة الرحاب</h1>
      <p>تسجيل طلب طباعة للمدرس</p>

      {/* فورم إدخال بيانات المدرس */}
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
        type="text"
        placeholder="الصف الدراسي"
        value={teacher.grade}
        onChange={(e) => setTeacher({ ...teacher, grade: e.target.value })}
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

      <button onClick={calculatePrice} style={buttonStyle}>
        احسب السعر
      </button>

      {/* عرض السعر بالجنيهات والقروش */}
      <h3>
        الإجمالي: {Math.floor(totalPrice)} جنيه و{" "}
        {Math.round((totalPrice - Math.floor(totalPrice)) * 100)} قرش
      </h3>

      <label style={{ marginTop: "10px" }}>
        <input
          type="checkbox"
          checked={teacher.paid}
          onChange={(e) => setTeacher({ ...teacher, paid: e.target.checked })}
        />
        تم الدفع
      </label>

      <button onClick={sendWhatsApp} style={buttonStyle}>
        إرسال الطلب عبر واتساب
      </button>
    </div>
  );
}