import HomeLayout from "../layouts/HomeLayout"
import Frame from "../assets/course.png"
import { Link } from "react-router-dom"

function HomePage() {
  return (
    <HomeLayout>
        <div className="flex mt-0 text-black items-center justify-center ml-16  gap-10 h-[87vh]">
            <div className="w-1/2 space-y-6">
                {/* <div className="m-16"> */}
                <h1 className="text-5xl font-semibold">
                    Find out best 
                    <span className="text-[#2B59CE] font-bold">
                         Online Courses
                    </span>
                </h1>
                <p className="text-xl">
                    We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                </p>
                <div className="space-x-6">
                    <Link to="/courses">
                        <button className="bg-[#2B59CE] font-semibold cursor-pointer text-lg text-white px-5 py-3 rounded-md hover:bg-[#2525AD] transition-all ease-in-out duration-300">
                            Explore courses
                        </button>
                    </Link>
                    <Link to="/courses">
                        <button className="border-[#2B59CE] border-2 bg-white font-semibold cursor-pointer text-lg text-[#2525AD] px-5 py-3 rounded-md hover:bg-[#2B59CE] hover:text-white transition-all ease-in-out duration-300">
                            Contact Us
                        </button>
                    </Link>
                {/* </div> */}
                </div>

               
            </div>
            <div className="w-1/2 flex bottom-2 items-center justify-center ">
                <img src={Frame} alt="" className="h-[92vh]"/>
            </div>
            
            
        </div>
    </HomeLayout>
  )
}

export default HomePage