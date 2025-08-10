import '../globals.css'
import GlassPane from "@/components/GlassPane"
export default function 
AuthRootLayout({children}){
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6"
     suppressHydrationWarning={true}>
        <GlassPane className="w-full h-full flex items-center justicy-center">{children}</GlassPane>
      </body>
    </html>
  );
}