import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./_hooks/useAuth";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Technology E Notes Portal",
  description: "Powered By Easy Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-bg">
      <body className={outfit.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
