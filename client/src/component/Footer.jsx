import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { IoIosCall, IoMdMail } from "react-icons/io";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <>
    {/* adding the footer */}
    <footer className="relative m-2 left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between sm:px-20 text-black bg-white shadow-2xl rounded-lg">
      {/* adding copyright section */}
      <section className="text-lg">
        Copyright {year} | All Rights Reserved
      </section>

      {/* adding the social media section */}
      <section className="flex items-center justify-center gap-5 text-2xl text-black">
        <a
          className="hover:text-[#2B59CE] transition-all ease-in-out duration-300"
          href="#"
        >
          <BsFacebook />
        </a>
        <a
          className="hover:text-[#2B59CE] transition-all ease-in-out duration-300"
          href="#"
        >
          <BsInstagram />
        </a>
        <a
          className="hover:text-[#2B59CE] transition-all ease-in-out duration-300"
          href="#"
        >
          <BsTwitter />
        </a>
        <a
          className="hover:text-[#2B59CE] transition-all ease-in-out duration-300"
          href="#"
        >
          <BsLinkedin />
        </a>
      </section>
    </footer>
  </>
  );
}

export default Footer;
