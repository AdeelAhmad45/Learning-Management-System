import { RxCrossCircled } from "react-icons/rx"
import { Link } from "react-router-dom"
import HomeLayout from "../../layouts/HomeLayout"

function CheckoutFailure() {
  return (
    <HomeLayout>
        
      {/* container for checkout success card  */}
      <div className="min-h-[90vh] bg-white flex items-center justify-center text-black">
        {/* card to display message */}
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-red-500 text-white absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Payment failure
          </h1>

          <div className="px-4 flex flex-col text-[#2525AD] items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">
                OOPs! payment fail
              </h2>
              <p className="text-left text-black">
                Please try again later
              </p>
            </div>

            {/* adding the check symbol */}
            <RxCrossCircled className="text-5xl text-red-500" />
          </div>

          {/* adding back to homepage button */}
          <Link
            className="bg-red-500 text-white hover:bg-red-700 transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg"
            to={"/checkout"}
          >
            <button>Try again</button>
          </Link>
        </div>
      </div>
    
    </HomeLayout>
  )
}

export default CheckoutFailure