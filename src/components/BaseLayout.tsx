import Footer from "./Footer";
import Header from "./Header";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

interface BaseLayoutProps {
  children: React.ReactNode;
  title: string;
}

function BaseLayout({ children, title }: BaseLayoutProps) {
  useDocumentTitle(title);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mb-10 mt-20 flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default BaseLayout;
