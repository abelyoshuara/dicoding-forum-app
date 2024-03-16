import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { useSetIsPreloadQuery } from "./services/isPreloadService";

function Root() {
  useSetIsPreloadQuery();

  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}

export default Root;
