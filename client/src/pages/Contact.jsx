import { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../helpers/AxiosInstance";

function Contact() {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    })

    function handleInputChange(e){
        const { name, value } = e.target;
        console.log(name, value);
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault()
        // check for empty fields
        if (!userInput.email || !userInput.name || !userInput.message) {
            toast.error("All fields are mandatory");
            return;
        }

        if (
            !userInput.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
          ) {
            toast.error("Invalid email id");
            return;
          }
        try {
            const response = axiosInstance.post("/contact", userInput);
            toast.promise(response, {
                loading: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit form"
            })
            const contactResponse = await response;
            if (contactResponse?.data?.success) {
                setUserInput({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        } catch (error) {
            toast.error("Operation failed...")
        }
    }

    return(
        <HomeLayout>
            <div className="flex justify-center items-center h-[90vh] flex-wrap">
                <form
                    noValidate
                    onSubmit={onFormSubmit} 
                    className="flex flex-col items-center bg-white justify-center gap-2 p-5 rounded-md shadow-[0_0_10px_black] text-black w-[22rem]"
                >
                    <h1 className="text-3xl font-semibold">Contact Page</h1>
                    
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-xl font-semibold">
                            Name
                        </label>
                        <input 
                            type="text"
                            id="name"
                            className="bg-transparent border-black hover:border-[#2525AD] border px-2 py-1 rounded-md"
                            name="name"
                            placeholder="Enter your name..."
                            onChange={handleInputChange}
                            value={userInput.name} 
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-xl font-semibold">
                            Email
                        </label>
                        <input 
                            type="email"
                            id="email"
                            className="bg-transparent border-black hover:border-[#2525AD] border px-2 py-1 rounded-md"
                            name="email"
                            placeholder="Enter your email..."
                            onChange={handleInputChange} 
                            value={userInput.email} 
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-xl font-semibold">
                            Message
                        </label>
                        <textarea 
                            id="message"
                            className="bg-transparent border-black hover:border-[#2525AD] border px-2 py-1 rounded-md resize-none h-40"
                            name="message"
                            placeholder="Enter your message..." 
                            onChange={handleInputChange}
                            value={userInput.message} 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="mt-2 w-full bg-[#2525AD] font-semibold cursor-pointer text-lg text-white px-5 py-3 rounded-md hover:bg-[#2B59CE] transition-all ease-in-out duration-300"
                    >
                            Submit
                    </button>
                </form>

            </div>
        </HomeLayout>
    );
}

export default Contact;