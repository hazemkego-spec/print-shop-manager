import { useState } from "react";

export default function Teacher() {
  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
    copies: "",
    pagesPerCopy: "",
    pricePerPage: 0, // هنحدد السعر لكل مدرس مسبقًا
    paid: false,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const calculatePrice = () => {
    const copies = parseInt(teacher.copies) || 0;
    const pages = parseInt(teacher.pagesPerCopy) || 0;
    const price = teacher.pricePerPage || 0;
    const total = copies * pages * price;
    setTotalPrice(total);
  };

  const sendWhatsApp = () => {
    const message = `طلب طباعة جديد:
المدرس: ${teacher.name}
المادة: ${teacher.subject}
عدد النسخ: ${teacher.copies}
عدد أوراق النسخة: ${teacher.pagesPerCopy}
السعر للصفحة: ${teacher.pricePerPage} جنيه
الإجمالي: ${totalPrice} جنيه
حالة الدفع: ${teacher.paid ? "مدفوع" : "غير مدفوع"}`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ padding: 20 }}>
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

      <button onClick={calculatePrice}>احسب السعر</button>
      <h3>الإجمالي: {totalPrice} جنيه</h3>

      <label>
        <input
          type="checkbox"
          checked={teacher.paid}
          onChange={(e) => setTeacher({ ...teacher, paid: e.target.checked })}
        />
        تم الدفع
      </label>

      <button onClick={sendWhatsApp}>إرسال الطلب عبر واتساب</button>
    </div>
  );
}