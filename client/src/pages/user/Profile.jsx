import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { Link } from "react-router-dom";

function Profile() {

    const dispatch = useDispatch();
    const userData = useSelector((state) => state?.auth?.data);

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
                    <button className="w-full bg-[#2525AD] text-white hover:bg-[#2B59CE]  transition-all ease-in-out duration-300 rounded-lg font-semibold py-2 cursor-pointer text-center">
                        Cancel
                    </button>
                )}
            </div>
        </div>
    </HomeLayout>
  );
}

export default Profile;