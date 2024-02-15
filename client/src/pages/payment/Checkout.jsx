import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../layouts/HomeLayout"
import { useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi"
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../redux/slices/RazorpaySlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

function Checkout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);
    const userData = useSelector((state) => state?.auth?.data);
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }

    async function handleSubscription(e){
        e.preventDefault();
        if (!razorpayKey || !subscription_id) {
            toast.error("Something went wrong");
            return;
        }

        const option = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Integral education Pvt. Ltd.",
            description: "Subscription",
            theme: {
                color: "#F37254"
            },
            prefill: {
                email: userData.email,
                name: userData.fullName
            },
            handler: async function(response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;

                toast.success("Payment successful");

                const res = await dispatch(verifyUserPayment(paymentDetails));
                (res?.payload?.success) ? navigate("/checkout/success") : navigate("/checkout/fail");

            }
        }
        const paymentObject = new window.Razorpay(option);
        paymentObject.open();
    }

    // async function load(){
    //     await dispatch(getRazorPayId());
    //     await dispatch(purchaseCourseBundle());

    // }

    // useEffect(() => {
    //   load();
    // }, [])

    useEffect(() => {
        (async () => {
            await dispatch(getRazorPayId());
                await dispatch(purchaseCourseBundle());
        })();
      }, []);
    

  return (
    <HomeLayout>
        <form
            onSubmit={handleSubscription}
            className="flex items-center justify-center text-black min-h-[90vh]"
        >
            <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0px_0px_10px_black] rounded-lg relative">
                <h1 className="absolute top-0 bg-[#2525AD] text-white w-full text-center py-4 text-2xl rounded-sm rounded-tl-lg rounded-tr-lg font-bold">Subscription bundle</h1>
                <div className="px-4 space-y-5 text-center">
                    <p className="text-[17px]">
                        This purchase allow you to access all available course of our plateform for {" "}
                        <span className="text-[#2525AD] font-bold">
                            <br />
                            1 Year duration
                        </span> {" "}
                        All the existing and new launched courses will be also available
                    </p>

                    <p className="flex items-center justify-center gap-1 text-2xl font-bold text-[#2525AD]">
                        <BiRupee /><span>1</span>only
                    </p>
                    <div>
                        <p>100% refund on cancellation</p>
                        <p>* Terms and conditions are applied *</p>
                    </div>
                    <button type="submit" className="absolute rounded-bl-lg rounded-br-lg w-full left-0 bottom-0 bg-[#2525AD] text-white hover:bg-[#2B59CE]  transition-all ease-in-out duration-300 font-semibold py-3 cursor-pointer text-center">
                        Buy now
                    </button>
                </div>
            </div>
        </form>
    </HomeLayout>
  )
}

export default Checkout