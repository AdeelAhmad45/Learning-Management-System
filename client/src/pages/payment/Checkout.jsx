import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../layouts/HomeLayout"
import { useNavigate } from "react-router-dom";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../redux/slices/RazorpaySlice";
import toast from "react-hot-toast";

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
        if (!razorpayKey || subscription_id) {
            toast.error("Something went wrong");
            return;
        }

        const option = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Integral education Pvt. Ltd.",
            handler: async function(response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;

                toast.success("Payment successful");

                const res = await dispatch(verifyUserPayment(paymentDetails));

            }
        }
    }

    async function load(){
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());

    }

    useEffect(() => {
      load();
    }, [])
    

  return (
    <HomeLayout>

    </HomeLayout>
  )
}

export default Checkout