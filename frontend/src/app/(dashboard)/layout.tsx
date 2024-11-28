import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar";

// Fontes personalizadas
const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}
    >
      <Sidebar />
      {children}
    </div>
  );
}