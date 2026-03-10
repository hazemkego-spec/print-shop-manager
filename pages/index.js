import { useState, useEffect } from "react";

export default function Home() {
  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  // عند فتح الصفحة نسترجع البيانات من LocalStorage
  useEffect(() => {
    const savedName = localStorage.getItem("teacherName");
    const savedSubject = localStorage.getItem("teacherSubject");
    if (savedName || savedSubject) {
      setTeacher({
        name: savedName || "",
        subject: savedSubject || "",
      });
    }

    // إظهار البوب أب أول مرة فقط
    const seen = localStorage.getItem("installPopupSeen");
    if (!seen) {
      setShowPopup(true);
      localStorage.setItem("installPopupSeen", "true");
    }
  }, []);

  // حفظ البيانات في LocalStorage عند التغيير
  const handleChange = (field, value) => {
    setTeacher({ ...teacher, [field]: value });
    if (field === "name") localStorage.setItem("teacherName", value);
    if (field === "subject") localStorage.setItem("teacherSubject", value);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>مطبعة الرحاب</h1>
      <p>أهلاً بك في تطبيق المدرس</p>

      {/* إدخال بيانات المدرس */}
      <input
        type="text"
        placeholder="اسم المدرس"
        value={teacher.name}
        onChange={(e) => handleChange("name", e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />
      <input
        type="text"
        placeholder="اسم المادة"
        value={teacher.subject}
        onChange={(e) => handleChange("subject", e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />

      {/* رسالة منبثقة للتثبيت */}
      {showPopup && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "400px",
            textAlign: "center"
          }}>
            <h2>📱 كيفية تحميل التطبيق</h2>
            <p>1️⃣ افتح الرابط من متصفح Google Chrome أو Safari.</p>
            <p>2️⃣ اضغط على القائمة (⋮ أو ⌵).</p>
            <p>3️⃣ اختر "إضافة إلى الشاشة الرئيسية".</p>
            <p>4️⃣ هيظهر أيقونة مطبعة الرحاب على جهازك.</p>
            <img src="/install-step1.png" alt="خطوة 1" style={{width:"100%", margin:"10px 0"}} />
            <img src="/install-step2.png" alt="خطوة 2" style={{width:"100%", margin:"10px 0"}} />
            <button
              onClick={() => setShowPopup(false)}
              style={{ marginTop: "10px", padding: "8px 12px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px" }}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}