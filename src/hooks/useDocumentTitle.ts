import { useEffect, useState } from "react";

const useDocumentTitle = (title: string = "Untitle") => {
  const [document_title, setDocumentTitle] = useState(title);

  useEffect(() => {
    document.title = `Dicoding Forum | ${document_title}`;
  }, [document_title]);

  return [document_title, setDocumentTitle];
};

export { useDocumentTitle };
