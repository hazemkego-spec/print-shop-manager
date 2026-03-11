import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [teacher, setTeacher] = useState({ name: "", subject: "" });
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedName = localStorage.getItem("teacherName");
    const savedSubject = localStorage.getItem("teacherSubject");
    if (savedName || savedSubject) {
      setTeacher({ name: savedName || "", subject: savedSubject || "" });
    }

    const seen = localStorage.getItem("installPopupSeen");
    if (!seen) {
      setShowPopup(true);
      localStorage.setItem("installPopupSeen", "true");
    }
  }, []);

  const handleChange = (field, value) => {
    setTeacher({ ...teacher, [field]: value });
    if (field === "name") localStorage.setItem("teacherName", value);
    if (field === "subject") localStorage.setItem("teacherSubject", value);
  };

  const handleSave = () => {
    alert(`✅ تم حفظ البيانات: ${teacher.name} - ${teacher.subject}`);
  };

  const handleStartOrders = () => {
    router.push("/orders"); // ينقلك لصفحة جديدة اسمها orders
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* اللوجو واسم المطبعـة */}
      <img src="/logo.png" alt="شعار مطبعة الرحاب" style={{ width: "80px", marginBottom: "10px" }} />
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

      {/* زرار حفظ */}
      <button
        onClick={handleSave}
        style={{ marginTop: "15px", padding: "10px 20px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px" }}
      >
        حفظ البيانات
      </button>

      {/* زرار بدء الطلبات */}
      <button
        onClick={handleStartOrders}
        style={{ marginTop: "15px", padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}
      >
        بدء الطلبات
      </button>

      {/* الرسالة المنبثقة للتثبيت */}
      {showPopup && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
          justifyContent: "center", alignItems: "center", zIndex: 9999
        }}>
          <div style={{
            background: "white", padding: "20px", borderRadius: "10px",
            maxWidth: "400px", textAlign: "right", direction: "rtl"
          }}>
            <h2>📱 كيفية تحميل التطبيق</h2>
            <p>✅ افتح الرابط من متصفح Chrome أو Safari.</p>
            <p>☰ اضغط على زر القائمة (⋮).</p>
            <p>📲 اختر "إضافة إلى الشاشة الرئيسية".</p>
            <p>🎉 هيظهر التطبيق كأيقونة باسم "مطبعة الرحاب".</p>
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