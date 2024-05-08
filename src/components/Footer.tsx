import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="border py-5 dark:border-gray-800">
      <div className="container">
        <p className="text-center">
          &copy; <NavLink to={"/"}>Dicoding Forum</NavLink> &middot; 2024
        </p>
      </div>
    </div>
  );
}

export default Footer;
