import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import HomeLayout from "../layouts/HomeLayout";
import { login } from "../redux/slices/AuthSlice";
function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const[loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    function handleUserInput(e){
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

   
    async function onLogin(event){
        event.preventDefault();

        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }

        // dispatch create account action
        const response = await dispatch(login(loginData));
        if(response?.payload?.success) navigate("/");

        setLoginData({
            email: "",
            password: ""
        });
    }

    return(
        <>
        <HomeLayout>
            <div className="flex h-[87vh] items-center justify-center">
                <form onSubmit={onLogin} noValidate className="flex flex-col bg-white gap-3 justify-center rounded-lg p-4 w-96 text-black shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>

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
                                value={login.email}
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
                                value={loginData.password} 
                            />
                    </div>
                    <button type="submit" className="mt-2 bg-[#2525AD] font-semibold cursor-pointer text-lg text-white px-5 py-3 rounded-md hover:bg-[#2B59CE] transition-all ease-in-out duration-300">
                            Login
                        </button>
                        <p className="text-center">
                            Don't have an account ? <Link to="/signup" className="link  cursor-pointer text-[#2525AD]">Signup</Link>
                        </p>
                </form>
            </div>
        </HomeLayout>
        </>
    );
}

export default Login;