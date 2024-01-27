import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";

function HomeLayout({ children }) {
  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 'auto';
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
  }
  return (
    <div className="bg-white">
    <div className="min-h-[87vh] shadow-xl mt-0 rounded-lg bg-[#EBEAEA]">
      <div className="drawer absolute z-50 left-0 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-black m-8 "
            />
          </label>
        </div>

        <div className="drawer-side w-0 bg-white shadow-md rounded-lg">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 text-base-content relative bg-[#FFFAFA]">
            <li className="w-fit absolute ease-in-out right-2 z-50 text-black">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} className="text-black"/>
              </button>
            </li>

            <li className="text-black">
              <Link to={"/"}>Home</Link>
            </li>

            <li className="text-black">
              <Link to={"/courses"}>All Courses</Link>
            </li>

            <li className="text-black">
              <Link to={"/contact"}>Contact Us</Link>
            </li>

            <li className="text-black">
              <Link to={"/about"}>About Us</Link>
            </li>
          </ul>
        </div>
      </div>

      {children}

      
    </div>
    <Footer />
    </div>
  );
}

export default HomeLayout;
