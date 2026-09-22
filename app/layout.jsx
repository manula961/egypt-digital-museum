import "./globals.css";

export const metadata = {
  title: "Egypt Digital Museum",
  description: "An immersive digital museum exploring the history, art and archaeology of Egypt."
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}