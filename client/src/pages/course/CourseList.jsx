import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/slices/CourseSlice";
import { useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import CourseCard from "../../component/CourseCard";

function CourseList(){
    const dispatch = useDispatch();

    const { courseData } = useSelector((state) => state.course);

    async function loadCourses(){
        dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return(
        <HomeLayout>
            <div className="min-h-[90vh] sm:mr-0 mr-9 flex flex-col pt-12 pl-20 gap-10 text-black">
                <h1 className="mt-10 text-center text-3xl font-semibold mb-5">Explore the course made by
                <span className="font-bold text-[#2525AD]">
                    Industry experts
                </span>
                </h1>
                <div className="flex flex-wrap flex-row mb-10 gap-14 ">
                    {courseData?.map((element) => {
                        return <CourseCard key={element._id} data={element} />
                    })}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;