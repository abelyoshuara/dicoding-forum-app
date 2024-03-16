import { useDocumentTitle } from "../hooks/useDocumentTitle";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

function AuthLayout({ children, title }: AuthLayoutProps) {
  useDocumentTitle(title);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}

export default AuthLayout;
