import Link from "next/link";

export default function Home() {
  const buttonStyle = {
    padding: "15px 25px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  };

  const logoStyle = {
    width: "100px",
    height: "100px",
    marginBottom: "20px",
  };

  return (
    <div style={containerStyle}>
      {/* شعار أو أيقونة */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
        alt="شعار الطابعة"
        style={logoStyle}
      />

      <h1>مرحبًا بك في نظام إدارة المطبعة</h1>
      <p>اضغط على الزر بالأسفل لتسجيل طلبك كمدرس</p>
      <Link href="/teacher">
        <button style={buttonStyle}>ابدأ تسجيل طلبك</button>
      </Link>
    </div>
  );
}