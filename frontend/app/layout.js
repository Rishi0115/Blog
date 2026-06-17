import "./globals.css";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "My Blog",
  description: "A simple blog built with Next.js",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
