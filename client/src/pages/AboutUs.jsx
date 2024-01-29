import HomeLayout from "../layouts/HomeLayout";
import aboutMainImage from "../assets/aboutMainImage.png"
import apj from "../assets/apj.png"
import billGates from "../assets/billGates.png"
import einstein from "../assets/einstein.png"
import nelsonMandela from "../assets/nelsonMandela.png"
import steveJobs from "../assets/steveJobs.png"

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
              <div id="slide1" className="carousel-item relative w-full">
                <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
                <img src={apj} className="w-40 rounded-full border-2 border-black" />
                <p className="text-xl">
                  {"Determination is the power that sees us through all our frustration and obstacles."}
                </p>
                <h3 className="text-2xl font-semibold">APJ Abdul Kalam</h3>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide5" className="btn btn-circle">❮</a> 
                  <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
                </div>
              </div> 
              <div id="slide2" className="carousel-item relative w-full">
              <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
                <img src={einstein} className="w-40 rounded-full border-2 border-black" />
                <p className="text-xl">
                  {"Anyone who has never made a mistake has never tried anything new."}
                </p>
                <h3 className="text-2xl font-semibold">Albert Einstein</h3>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">❮</a> 
                  <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
                </div>
              </div> 
              <div id="slide3" className="carousel-item relative w-full">
              <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
                <img src={billGates} className="w-40 rounded-full border-2 border-black" />
                <p className="text-xl">
                  {"Television is not real life. In real life people actually have to leave the coffee shop and go to jobs."}
                </p>
                <h3 className="text-2xl font-semibold">Bill Gates</h3>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">❮</a> 
                  <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
                </div>
              </div> 
              <div id="slide4" className="carousel-item relative w-full">
              <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
                <img src={nelsonMandela} className="w-40 rounded-full border-2 border-black" />
                <p className="text-xl">
                  {"Education is the most powerful tool you use to change the world."}
                </p>
                <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide3" className="btn btn-circle">❮</a> 
                  <a href="#slide5" className="btn btn-circle">❯</a>
                </div>
                </div>
              </div>
              <div id="slide5" className="carousel-item relative w-full">
              <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
                <img src={steveJobs} className="w-40 rounded-full border-2 border-black" />
                <p className="text-xl">
                  {"The most important decisions you make are not the things you do, but the things you decide not to do."}
                </p>
                <h3 className="text-2xl font-semibold">Steve Jobs</h3>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide4" className="btn btn-circle">❮</a> 
                  <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
                </div>
              </div>
            </div>
        </div>
        </HomeLayout>
    );
}

export default AboutUs;