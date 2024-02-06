import { useLocation } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useSelector } from "react-redux";

function CourseDescription() {

    const { state } = useLocation();
    const { role, data } = useSelector((state) => state.auth);

    return(
            <HomeLayout>
                <div className="flex flex-col min-h-[87vh] pt-12 px-20 items-center justify-center text-black">
                    <div className="flex flex-row gap-14 py-10 relative">
                        <div className="space-y-5">
                            <img
                                className="w-full h-64" 
                                alt="thumbnail"
                                src={state?.thumbnail?.secure_url}
                            />
                            <div className="space-y-4">
                                <div className="flex flex-col items-center justify-between text-xl">
                                    <p className="font-semibold">
                                        <span className="text-[#2525AD] font-bold">
                                            Total lectures: {" "}
                                        </span>
                                        {state?.numbersOfLectures}
                                    </p>
                                    <p className="font-semibold">
                                        <span className="text-[#2525AD] font-bold">
                                            Instructor: {" "}
                                        </span>
                                        {state?.createdBy}
                                    </p>
                                </div>
                                {
                                    role === "ADMIN" || data?.subscription?.status === "ACTIVE" ? (
                                        <button type="submit" className="mt-2 w-full bg-[#2525AD] font-semibold cursor-pointer text-lg text-white px-5 py-3 rounded-md hover:bg-[#2B59CE] transition-all ease-in-out duration-300">
                                            Watch lectures
                                        </button>
                                    ) : (
                                        <button type="submit" className="mt-2 w-full bg-[#2525AD] font-semibold cursor-pointer text-lg text-white px-5 py-3 rounded-md hover:bg-[#2B59CE] transition-all ease-in-out duration-300">
                                            Subscribe
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                        
                        <div className="space-y-2 test-xl">
                            <h1 className="text-xl font-bold text-[#2525AD] mb-5 text-center">
                                {state?.title}
                            </h1>
                            <p className="text-[#2525AD]">
                                Course description
                            </p>
                            <p>
                                {state?.description}
                            </p>
                        </div>
                    </div>

                </div>
            </HomeLayout>
    );
}

export default CourseDescription;