import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../layouts/HomeLayout"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCourseLectures, getCourseLectures } from "../../redux/slices/LectureSlice";

function DisplayLectures() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentVideo, setCurrentVideo] = useState(0);
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state?.lecture);
    const { role } = useSelector((state) => state?.auth);

    async function onLectureDelete(courseId, lectureId){
      console.log(courseId, lectureId);
      await dispatch(deleteCourseLectures({courseId: courseId, lectureId: lectureId}));
      await dispatch(getCourseLectures(courseId));
    }

    useEffect(() => {
        console.log(state);
        if (!state) navigate("/courses")
        dispatch(getCourseLectures(state._id))
    }, [])
  return (
    <HomeLayout>
      <div className="flex flex-col text-black min-h-[90vh] gap-10 items-center justify-center py-10  mx-[5%]">
        <div className="text-2xl text-[#2525AD] font-semibold">
        course name: {state?.title}
        </div>

        {/* left section for playing videos and displaying course details to admin */}
        {(lectures && lectures.length > 0) ? (<div className="flex justify-center gap-10 w-full">
          <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_#2525AD]">
            <video 
              src={lectures && lectures[currentVideo]?.lecture?.secure_url}
              className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            >

            </video>

            <div>
              <h1>
                <span className="text-[#2525AD]">
                  Title: {" "}
                </span>
                {lectures && lectures[currentVideo]?.title}
              </h1>
              <p>
              <span className="text-[#2525AD] line-clamp-4">
                  Description: {" "}
                </span>
                {lectures && lectures[currentVideo]?.description}
              </p>
            </div>
          </div>

          {/* right section for displaying list of lectures */}
          <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_#2525AD] space-y-4">
            <li className="flex font-semibold text-xl items-center justify-between text-[#2525AD]">
              <p>lectures list</p>
              {role === "ADMIN" && (
                <button onClick={() => navigate("/courses/addlecture", {state: {...state}})} className="rounded-md text-sm left-0 bottom-0 bg-[#2525AD] text-white hover:bg-[#2B59CE]  transition-all ease-in-out duration-300 font-semibold py-1 px-2 cursor-pointer text-center">Add new lecture</button>
              )}
            </li>
            {
              lectures && lectures.map((lecture, idx) => {
                return(
                  <li className="space-y-2" key={lecture.id}>
                    <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                      <span>
                        {" "} Lecture {idx + 1} : {" "}
                      </span>
                      {lecture.title}
                    </p>
                    {role === "ADMIN" && (
                <button onClick={() => onLectureDelete(state?._id, lecture._id)} className="rounded-md text-sm left-0 bottom-0 bg-[#2525AD] text-white hover:bg-[#2B59CE]  transition-all ease-in-out duration-300 font-semibold py-1 px-2 cursor-pointer text-center">Delete new lecture</button>
              )}
                  </li>
                );
              })
            }
          </ul>
        </div>) : ( role === "ADMIN" && (
                <button onClick={() => navigate("/courses/addlecture", {state: {...state}})} className="rounded-md text-sm left-0 bottom-0 bg-[#2525AD] text-white hover:bg-[#2B59CE]  transition-all ease-in-out duration-300 font-semibold py-1 px-2 cursor-pointer text-center">Add new lecture</button>
              ))}
      </div>
    </HomeLayout>
  )
}

export default DisplayLectures