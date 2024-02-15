import { AiFillCheckCircle } from "react-icons/ai"
import HomeLayout from "../../layouts/HomeLayout"
import { Link } from "react-router-dom"

function CheckoutSuccess() {
  return (
    <HomeLayout>
        
      {/* container for checkout success card  */}
      <div className="min-h-[90vh] bg-white flex items-center justify-center text-black">
        {/* card to display message */}
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-[#2525AD] text-white absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Payment Successful
          </h1>

          <div className="px-4 flex flex-col text-[#2525AD] items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">
                Welcome to the Pro Bundle
              </h2>
              <p className="text-left text-black">
                Now you can enjoy the taste of learning from our vast library of
                courses from the top subject matter experts of the industry
              </p>
            </div>

            {/* adding the check symbol */}
            <AiFillCheckCircle className="text-5xl text-[#2525AD]" />
          </div>

          {/* adding back to homepage button */}
          <Link
            className="bg-[#2525AD] text-white hover:bg-[#2B59CE] transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg"
            to={"/"}
          >
            <button>Go to Dashboard</button>
          </Link>
        </div>
      </div>
    
    </HomeLayout>
  )
}

export default CheckoutSuccess