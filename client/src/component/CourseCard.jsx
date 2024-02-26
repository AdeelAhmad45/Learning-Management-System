import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return(
        <div
            onClick={() => navigate("/courses/description", { state: { ...data } })} 
            className="text-[#2525AD] w-[22rem] h-[410px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-white">
            <div className="overflow-hidden">
                <img
                    className="h-40 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1, 2] transition-all ease-in-out duration-300"
                    src={data?.thumbnail?.secure_url}
                    alt="course thumbnail"
                 />
                 <div className="p-3 space-y-1 text-black">
                    <h2 className="text-xl font-bold text-[#2B59CE] line-clamp-2">
                    {data?.title}
                    </h2>
                    <p className="line-clamp-2">
                        {data?.description}
                    </p>
                    <p className="font-semibold">
                        <span className="font-bold text-[#2B59CE]">Category :</span>
                        {data?.category}
                    </p>
                    <p className="font-semibold">
                        <span className="font-bold text-[#2B59CE]">Totle lectures :</span>
                        {data?.numbersOfLectures}
                    </p>
                    <p className="font-semibold">
                        <span className="font-bold text-[#2B59CE]">Instructor :</span>
                        {data?.createdBy}
                    </p>
                 </div>
            </div>
        </div>
    );
}

export default CourseCard;