import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../layouts/HomeLayout"
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLectures } from "../../redux/slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture() {

    const courseDetails = useLocation().state;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""
    });

    function handleInputChange(e){
        e.preventDefault();
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function handleVideo(e){
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        console.log(source);
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if (!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error("All fields are mandotory");
            return;
        }

        const response = await dispatch(addCourseLectures(userInput));

        if (response?.payload?.success) {
            navigate(-1)
            setUserInput(
                {
                    ...userInput,
                    lecture: video,
                    videoSrc: source
                }
            )
        }
    }

    useEffect(() => {
      if (!courseDetails) navigate("/courses")
    }, [])
    
  return (
    <HomeLayout>
        <div className="min-h-[90vh] text-black flex flex-col items-center justify-center mx-16 gap-10">
            <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                <header className="flex items-center justify-center relative">
                <button
                    className="absolute left-2 text-xl text-black"
                    onClick={() => navigate(-1)}
                >
                    <AiOutlineArrowLeft />
                </button>
                <h1 className="text-xl font-semibold text-[#2525AD]">Add new lecture</h1>
                </header>

                <form
                    className="flex flex-col gap-3"
                    onSubmit={onFormSubmit}
                >
                    <input 
                        type="text" 
                        name="title"
                        placeholder="Enter the title of the lecture"
                        onChange={handleInputChange}
                        className="bg-transparent px-3 py-1 border border-black"
                        value={userInput.title}
                    />

                    <textarea 
                        type="text" 
                        name="description"
                        placeholder="Enter the description of the lecture"
                        onChange={handleInputChange}
                        className="bg-transparent px-3 py-1 border border-black resize-none overflow-y-scroll no-scrollbar h-36"
                        value={userInput.description}
                    />

                    {userInput.videoSrc ? (
                        <video 
                            src={userInput.videoSrc}
                            muted 
                            controls
                            controlsList="nodownload nofullscreen"
                            disablePictureInPicture
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                        ></video>
                    ) : (
                        <div className="h-48 border border-black flex justify-center items-center cursor-pointer">
                            <label htmlFor="lecture" className="font-semibold text-xl cursor-pointer">Choose your video</label>
                            <input type="file" className="hidden" id="lecture" name="lecture" onChange={handleVideo} accept="video/mp4,video/x-m4v,video/*" />
                        </div>
                    )}
                    <button 
                        type="submit" 
                        className="mt-2 w-full bg-[#2525AD] font-semibold cursor-pointer text-lg text-white px-5 py-3 rounded-md hover:bg-[#2B59CE] transition-all ease-in-out duration-300"
                    >
                            Add new lecture
                    </button>
                </form>
            </div>
        </div>
    </HomeLayout>
  )
}

export default AddLecture