import { useNavigate } from "react-router-dom";

function Denied(){
    const navigate = useNavigate();
    return(
        <main className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-[#2525AD] tracking-widest">
        403
      </h1>
      <div className="mt-2 text-3xl font-bold tracking-tight text-[#2B59CE] sm:text-5xl">
        Access Denied
      </div>
      <button
            onClick={() => navigate(-1)}
            type="button"
            className="border-[#2B59CE] mt-4 border-2 bg-white font-semibold cursor-pointer text-lg text-[#2525AD] px-6 py-2 rounded-md hover:bg-[#2B59CE] hover:text-white transition-all ease-in-out duration-300"
          >
            Go back
          </button>
    </main>
    );
}

export default Denied;