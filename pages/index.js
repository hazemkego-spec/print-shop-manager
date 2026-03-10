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
    width: "150px",
    height: "150px",
    marginBottom: "20px",
  };

  return (
    <div style={containerStyle}>
      {/* شعار المطبعة */}
      <img
        src="https://copilot.microsoft.com/th/id/BCO.6ba48088-92e9-4ae9-b100-517488d62e09.png"
        alt="لوجو مطبعة الرحاب"
        style={logoStyle}
      />

      {/* اسم المطبعة */}
      <h1>مطبعة الرحاب</h1>
      <p>مرحبًا بك في نظام إدارة المطبعة</p>
      <p>اضغط على الزر بالأسفل لتسجيل طلبك كمدرس</p>

      <Link href="/teacher">
        <button style={buttonStyle}>ابدأ تسجيل طلبك</button>
      </Link>
    </div>
  );
}