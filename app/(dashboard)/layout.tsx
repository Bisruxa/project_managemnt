import "../globals.css";
import GlassPane from "@/components/GlassPane";
export default function DashboardRootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        className="h-screen w-screen rainbow-mesh p-6"
        suppressHydrationWarning={true}
      >
        <GlassPane >
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
