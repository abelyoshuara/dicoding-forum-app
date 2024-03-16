import { useRouteError } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function ErrorPage() {
  useDocumentTitle("Error Page");
  const error = useRouteError() as { statusText: string; message: string };

  return (
    <section
      id="error"
      className="flex min-h-screen items-center justify-center"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold">Oops!</h1>
        <p className="my-2">Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </section>
  );
}

export default ErrorPage;
