import { Link } from "react-router-dom";

function NotFound(){
    return(
        <div className="h-screen flex flex-col w-full justify-center items-center">
            <h1 className="text-9xl font-extrabold text-[#2525AD] tracking-widest">
                404
            </h1>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#2B59CE] sm:text-5xl">
          Page not found
        </h1>
            <p className="mt-4 text-base leading-7 text-[#2B59CE]">
          Sorry, we couldn&apos:t find the page you&apos;re looking for.
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
          <button
            type="button"
            className="border-[#2B59CE] border-2 bg-white font-semibold cursor-pointer text-lg text-[#2525AD] px-6 py-2 rounded-md hover:bg-[#2B59CE] hover:text-white transition-all ease-in-out duration-300"
          >
            <Link to="/">Go back</Link>
          </button>
          <button
            type="button"
            className="bg-[#2B59CE] font-semibold cursor-pointer text-lg text-white px-6 py-2 rounded-md hover:bg-[#2525AD] transition-all ease-in-out duration-300"
          >
            <Link to="/contact">Contact us</Link>
          </button>
        </div>
        </div>

    );
}

export default NotFound;