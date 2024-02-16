import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../redux/slices/RazorpaySlice";
import { getUserData } from "../../redux/slices/AuthSlice";
import toast from "react-hot-toast";

function Profile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.auth?.data);

    async function handleCancellation() {
        toast("Initiating cancellation")
        await dispatch(cancelCourseBundle());
        await dispatch(getUserData());
        toast.success("Cancellation successfully");
        navigate("/")

    }

  return (
    <HomeLayout>
        <div className="min-h-[87vh] flex items-center justify-center">
            <div className="flex flex-col my-10 gap-4 rounded-lg p-4 text-black w-96 shadow-[0_0_10px_black]">
                <img 
                    src={userData?.avatar?.secure_url}
                    className="w-40 m-auto rounded-full border border-black"
                />
                <h3 className="text-xl font-semibold capitalize text-center">
                    {userData?.fullName}
                </h3>
                <div className="grid grid-cols-2">
                    <p>Email: </p>
                    <p> {userData?.email} </p>
                    <p>Role: </p>
                    <p> {userData?.role} </p>
                    <p>Subscription: </p>
                    <p> {userData?.subscription?.status === "active" ? "Active" : "Inactive"} </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <Link 
                        to="/changepassword"
                        className="w-1/2 bg-[#2525AD] text-white hover:bg-[#2B59CE]  transition-all ease-in-out duration-300 rounded-lg font-semibold py-2 cursor-pointer text-center"
                    >
                        <button>
                            change password
                        </button>
                    </Link>
                    <Link 
                        to="/user/editprofile"
                        className="w-1/2 bg-[#2525AD] text-white hover:bg-[#2B59CE]  transition-all ease-in-out duration-300 rounded-lg font-semibold py-2 cursor-pointer text-center"
                    >
                        <button>
                            Edit profile
                        </button>
                    </Link>
                </div>
                {userData?.subscription?.status === "active" && (
                    <button onClick={handleCancellation} className="border-[#2B59CE] border-2 bg-white font-semibold cursor-pointer text-lg text-[#2525AD] w-full py-2 rounded-md hover:bg-[#2B59CE] hover:text-white transition-all ease-in-out duration-300">
                        Cancel subscription
                    </button>
                )}
            </div>
        </div>
    </HomeLayout>
  );
}

export default Profile;