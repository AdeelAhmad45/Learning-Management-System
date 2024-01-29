import HomeLayout from "../layouts/HomeLayout";
import aboutMainImage from "../assets/aboutMainImage.png"
import { celebrities } from "../constant/CelebrityDate";
import Carousel from "../component/Carousel";

function AboutUs() {

  
    return(
        <HomeLayout>
        <div className="pl-20 pt-20 flex flex-col text-black h-[100%]">
            <div className="flex flex-col sm:flex-row items-center gap-5 mx-10 ">
                <section className="w-1/2 space-y-10">
                    <h1 className="text-5xl font-semibold text-[#2525AD]">
                        Affordable and quality education.
                    </h1>
                    <p className="text-xl ">
                        Our goal is to provide the affordable and quality education to the world. We are providing the platform for the aspiring teachers and students to share their skills, creativity and knowledge to each other to empower and contribute in the growth and wellness of mankind.
                    </p>

                </section>
                <div>
                    <img
                        id="text1"
                        style={{
                            filter: "drop-shadow(0px 10px 10px rgb(0, 0,0))"
                        }}
                        src={aboutMainImage} 
                        className="drop-shadow-2xl" 
                        alt="main image" 
                    />
                </div>
            </div>

            <div className="carousel w-1/2 m-auto my-16">
               {celebrities && celebrities.map(celebrity => (<Carousel 
                                                              {...celebrity} 
                                                              key={celebrity.slideNumber} 
                                                              totleSlide={celebrities.length} 
                                                            />))}
            </div>
        </div>
        </HomeLayout>
    );
}

export default AboutUs;