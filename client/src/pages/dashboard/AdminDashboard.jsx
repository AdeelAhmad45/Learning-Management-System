import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourses } from "../../redux/slices/CourseSlice";
import { getStatData } from "../../redux/slices/StatSlice";
import { getPaymentRecord } from "../../redux/slices/RazorpaySlice";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  Title,
  LinearScale,
  Tooltip
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const myCourses = useSelector((state) => state?.course?.courseData);

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    fontColor: "black",
    datasets: [
      {
        label: "User details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["#2525AD", "orange"],
        borderWidth: 1,
        borderColor: ["#2525AD", "orange"],
      },
    ],
  };

  const salesData = {
    labels: [
      "jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "black",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["orange"],
        borderColor: "#2525AD",
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course ? ")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }

  return (
    <HomeLayout>
      <div className="pt-5  flex flex-col flex-wrap gap-10 text-black">
        <h1 className="text-center mt-4 pt-5 text-4xl font-semibold text-[#2525AD]">
          Admin Dashboard
        </h1>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 m-auto mt-5 mx-10">
        <div className="flex flex-col items-center gap-10 p-5 shadow-[0_0_10px_#2525AD] rounded-md">
          <div className="w-80 h-80">
            <Pie data={userData} />
          </div>

          <div className="grid grid-cols-2 gap-5 text-black">
            <div className="flex items-center justify-center gap-5 p-5 rounded-md shadow-[0_0_10px_#2525AD]">
              <div className="flex flex-col items-center">
                <p className="font-semibold">Registered User</p>
                <h3 className="font-4xl font-bold">
                  {allUsersCount}
                </h3>
              </div>
              <FaUsers className="text-5xl text-[#2525AD]" />
            </div>

            <div className="flex items-center justify-center gap-5 p-5 rounded-md shadow-[0_0_10px_#2525AD]">
              <div className="flex flex-col items-center">
                <p className="font-semibold">Subscribed User</p>
                <h3 className="font-4xl font-bold">
                  {subscribedCount}
                </h3>
              </div>
              <FaUsers className="text-5xl text-orange-500" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 p-5 rounded-md shadow-[0_0_10px_#2525AD]">
          <div className="h-80 w-full relative">
            <Bar data={salesData} className="absolute bottom-0 h-80 w-full" />
          </div>

          <div className="grid grid-cols-2 text-black gap-5">
            <div className="flex items-center justify-center gap-5 p-5 rounded-md shadow-[0_0_10px_#2525AD]">
              <div className="flex flex-col items-center">
                <p className="font-semibold">Subscription Count</p>
                <h3 className="font-4x font-bold">
                  {allPayments?.count}
                </h3>
              </div>
              <FcSalesPerformance className="text-5xl text-[#2525AD]" />
            </div>
            
            <div className="flex items-center justify-center gap-5 p-5 rounded-md shadow-[0_0_10px_#2525AD]">
              <div className="flex flex-col items-center">
                <p className="font-semibold">Total Revenue</p>
                <h3 className="font-4x font-bold">
                  {allPayments?.count * 499}
                </h3>
              </div>
              <GiMoneyStack className="text-5xl text-[#2525AD]" />
            </div>
          </div>
        </div>
        </div>

        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
            <div className="flex items-center justify-between w-full">
                <h1 className="font-semibold text-3xl text-center">Courses overview</h1>

                <button 
                    onClick={() => {
                        navigate("/courses/create")
                    }}
                    className="border-[#2B59CE] border-2 bg-white font-semibold cursor-pointer text-lg text-[#2525AD] px-5 py-3 rounded-md hover:bg-[#2B59CE] hover:text-white transition-all ease-in-out duration-300"
                >
                    Create new course
                </button>
            </div>

            <table className="table overflow-x-scroll">
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Course title</th>
                        <th>Course category</th>
                        <th>Instructor</th>
                        <th>Totle Lectures</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {myCourses?.map((course, idx) => {
                        return (
                        <tr key={course._id}>
                            <td>{idx+1}</td>
                            <td>
                                <textarea readOnly value={course?.title} className="w-40 h-auto bg-transparent resize-none"></textarea>
                            </td>
                            <td>{course?.category}</td>
                            <td>{course?.createdBy}</td>
                            <td>{course?.numbersOfLectures}</td>
                            <td className=" max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                <textarea 
                                    value={course?.description}
                                    className="w-40 h-auto bg-transparent resize-none"
                                ></textarea>
                            </td>
                            <td className="flex items-center gap-4">
                                <button 
                                    onClick={() => {
                                        navigate("/course/displaylectures", {state: {...course}})
                                    }}
                                    className="bg-[#2525AD] font-semibold cursor-pointer text-lg text-white px-3 py-1 rounded-md hover:bg-[#2B59CE] transition-all ease-in-out duration-300"
                                >
                                    <BsCollectionPlayFill />
                                </button>
                                <button 
                                    onClick={() => onCourseDelete(course?._id)}
                                    className="bg-orange-500 font-semibold cursor-pointer text-lg text-white px-3 py-1 rounded-md hover:bg-orange-300 transition-all ease-in-out duration-300"
                                >
                                    <BsTrash />
                                </button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
