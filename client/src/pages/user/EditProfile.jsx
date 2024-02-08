import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { useState } from "react";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

function EditProfile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        previewImage: "",
        fullName: "",
        avatar: undefined,
        userId: useSelector((state) => state?.auth?.data?._id)
    });

    function handleImageUpload(e){
        e.preventDefault();

        const uploadImage = e.target.files[0]
        
        if (uploadImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage)
            fileReader.addEventListener("load", function(){
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadImage
                })
            })
        }
    }

    function handleInputChange(e){
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onSubmit(e){
        e.preventDefault();
        console.log(data);

        if (!data.fullName || !data.avatar) {
            toast.error("All fields are mandatory");
        }

        if (data.fullName.length < 5) {
            toast.error("Name should have more than 5 characters");
            return;
          }

        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);
        
        console.log(formData.entries().next());
        console.log(formData.entries().next());
        const newUserData = [data.userId, formData]
        await dispatch(updateProfile(newUserData));
        await dispatch(getUserData());

        navigate("/user/profile");


    }

  return (
    <HomeLayout>
        <div className="flex items-center justify-center h-[87vh]">
            <form
                onSubmit={onSubmit}
                className="flex flex-col text-black  items-center justify-center gap-5 rounded-lg p-4 w-80 shadow-[0_0_10px_black]"
            >
                <h1 className="text-center text-2xl font-semibold">
                    Edit profile
                </h1>
                <label htmlFor="image_uploads" className="cursor-pointer">
                    {data.previewImage ? (
                        <img 
                            src={data.previewImage}
                            className="w-28 h-28 rounded-full m-auto"
                        />
                    ) : (
                        <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
                    )}
                </label>
                <input 
                    type="file"
                    className="hidden" 
                    id="image_uploads"
                    onChange={handleImageUpload}
                    accept=".jpg, .png, .peg, .svg"
                />
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="fullName" className="text-lg font-semibold">Fullname</label>
                    <input 
                        type="text" 
                        required
                        name="fullName"
                        id="fullName"
                        className="bg-transparent px-2 py-1 border border-black"
                        placeholder="Enter your name..."
                        value={data.fullName}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className=" bg-[#2525AD] text-white hover:bg-[#2B59CE]  transition-all ease-in-out duration-300 rounded-lg font-semibold py-2 cursor-pointer text-center">
                        Update profile
                    </button>
                </div>
                
            </form>
        </div>
    </HomeLayout>
  )
}

export default EditProfile;