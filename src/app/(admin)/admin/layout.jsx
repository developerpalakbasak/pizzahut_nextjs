import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import AdminNavBar from "@/admin_components/AdminNavBar";
import { PizzaProvider } from "@/context/pizzaContext";
import SessionWrapper from "@/lib/wrapper/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PizzaHut - Admin",
  description: "Developed By developerpalakbasak",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#daffe2]`}
      >
        <SessionWrapper>
          <PizzaProvider>
            <div>
              <ToastContainer />
              <AdminNavBar />
            </div>
            {/* Main Content */}
            <main className="w-[90vw] md:w-[80vw] max-w-6xl pb-5 mx-auto flex flex-col mt-16">
              {children}
            </main>
          </PizzaProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
