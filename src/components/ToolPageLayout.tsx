import Header from "./Header";
import Footer from "./Footer";

export default function ToolPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "28px 28px 60px",
          flex: 1,
          width: "100%",
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
