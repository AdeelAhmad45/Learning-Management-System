import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import HomeLayout from "../layouts/HomeLayout";
import { createAccount } from "../redux/slices/AuthSlice";
function Signup(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState(""); 

    const[signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    function handleUserInput(e){
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    function getImage(event){
        event.preventDefault();
        // getting the image
        const uploadImage = event.target.files[0];

        if (uploadImage) {
            setSignupData({
                ...signupData,
                avatar: uploadImage
            })

            const fileReder = new FileReader();
            fileReder.readAsDataURL(uploadImage);
            fileReder.addEventListener("load", function(){
                console.log(this.result);
                setPreviewImage(this.result);
            })
        }
    }

    async function createNewAccount(event){
        event.preventDefault();

        if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
            toast.error("Please fill all the details");
            return;
        }

        // checking name field length
        if (signupData.fullName.length < 5) {
            toast.error("Name should be atleast 5 character");
            return;
        }

        // checking valid email
        if (!signupData.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            toast.error("Invalid email id");
            return;
        }
        if (!signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
            toast.error("Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        // dispatch create account action
        const response = await dispatch(createAccount(formData));
        if(response?.payload?.success) navigate("/");

        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        });
        setPreviewImage("");
    }

    return(
        <>
        <HomeLayout>
            <div className="flex h-[87vh] items-center justify-center">
                <form onSubmit={createNewAccount} noValidate className="flex flex-col bg-white gap-3 justify-center rounded-lg p-4 w-96 text-black shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>
                    <label htmlFor="image_uploads">
                        {previewImage ? (
                            <img className="w-24 h-24 m-auto rounded-full" src={previewImage}/>
                        ) : (
                            <BsPersonCircle className="w-24 h-24 m-auto"/>
                        )}
                    </label>
                    <input
                    onChange={getImage}
                        className="hidden" 
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg" 
                    />

                    <div className="flex flex-col gap-1">
                            <label htmlFor="fullName" className="font-semibold">Name</label>
                            <input 
                                type="fullName"
                                required
                                name="fullName"
                                id="fullName"
                                placeholder="Enter your name"
                                className="bg-transparent border px-2 py-1"
                                onChange={handleUserInput} 
                                value={signupData.fullName}
                            />
                    </div>

                    <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <input 
                                type="email"
                                required
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                className="bg-transparent border px-2 py-1"
                                onChange={handleUserInput} 
                                value={signupData.email}
                            />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="font-semibold">Password</label>
                            <input 
                                type="password"
                                required
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                className="bg-transparent px-2 py-1 border"
                                onChange={handleUserInput} 
                                value={signupData.password} 
                            />
                    </div>
                    <button type="submit" className="mt-2 bg-[#2525AD] font-semibold cursor-pointer text-lg text-white px-5 py-3 rounded-md hover:bg-[#2B59CE] transition-all ease-in-out duration-300">
                            Create account
                        </button>
                        <p className="text-center">
                            Already have an account ? <Link to="/login" className="link  cursor-pointer text-[#2525AD]">Login</Link>
                        </p>
                </form>
            </div>
        </HomeLayout>
        </>
    );
}

export default Signup;