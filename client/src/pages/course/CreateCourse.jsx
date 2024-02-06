import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createNewCourse } from "../../redux/slices/CourseSlice";
import HomeLayout from "../../layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
      title: "",
      category: "",
      createdBy: "",
      description: "",
      thumbnail: null,
      previewImage: ""
  })

  function handleImage(e){
      e.preventDefault();
      const  uploadImage = e.target.files[0];
      if (uploadImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load", function () {
              setUserInput(
                {
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadImage
                }
              )
            })
      }
  }

  function handleUserInput(e){
     const { name, value } = e.target;
     setUserInput({
        ...userInput,
        [name]: value
     })
  }

  async function onFormSubmit(e){
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.description ||
      !userInput.thumbnail
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    const response = await dispatch(createNewCourse(userInput))

    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: ""
      });
      navigate("/courses")
    }
  }

  return (
      <HomeLayout>
          <div className="flex items-center justify-center h-[87vh]">
            <form
                onSubmit={onFormSubmit}
                className="flex flex-col justify-center gap-5 rounded-lg p-4 text-[#2525AD] w-[700px] my-10 shadow-[0_0_10px_black] relative"
            >
                  <Link className="absolute top-8 text-2xl text-accent cursor-pointer"> 
                    <AiOutlineArrowLeft />
                  </Link>
                  <h1 className="text-2xl font-bold text-center">
                  Create course
                </h1>

                <main className="grid grid-cols-2 gap-x-10">
                  <div className="gap-y-6">
                    <div>
                      <label htmlFor="image_uploads" className="cursor-pointer">
                        {userInput.previewImage ? (
                          <img 
                            className="w-full h-44 m-auto border"
                            src={userInput.previewImage}
                          />
                        ): (
                          <div className="w-full m-auto h-44 justify-center items-center border border-black">
                            <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                          </div>
                        )}
                      </label>
                      <input 
                        type="file" 
                        className="hidden"
                        id="image_uploads"
                        accept=".jpg, jpeg, .png"
                        name="image_uploads"
                        onChange={handleImage}
                      />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="title" className="text-lg font-semibold">
                          Course title
                        </label>
                        <input 
                          type="text"
                          required
                          name="title" 
                          id="title"
                          placeholder="Enter course title"
                          value={userInput.title}
                          className="bg-transparent px-2 py-1 border border-black"
                          onChange={handleUserInput}
                        />
                      </div>
                  </div>
                  <div className="flex flex-col gap-1">
                        <label htmlFor="createdBy" className="text-lg font-semibold">
                          Course Instructor
                        </label>
                        <input 
                          type="text"
                          required
                          name="createdBy" 
                          id="createdBy"
                          placeholder="Enter course instructor"
                          value={userInput.createdBy}
                          className="bg-transparent px-2 py-1 border border-black"
                          onChange={handleUserInput}
                        />

                        <div className="flex flex-col gap-1">
                          <label htmlFor="category" className="text-lg font-semibold">
                            Course Category
                          </label>
                          <input 
                            type="text"
                            required
                            name="category" 
                            id="category"
                            placeholder="Enter course category"
                            value={userInput.category}
                            className="bg-transparent px-2 py-1 border border-black"
                            onChange={handleUserInput}
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label htmlFor="description" className="text-lg font-semibold">
                            Course description
                          </label>
                          <textarea 
                            type="text"
                            required
                            name="description" 
                            id="description"
                            placeholder="Enter course description"
                            value={userInput.description}
                            className="bg-transparent h-24 overflow-hidden resize-none px-2 py-1 border border-black"
                            onChange={handleUserInput}
                          />
                        </div>
                      </div>
                </main>
                <button type="submit" className="mt-2 bg-[#2525AD] font-semibold cursor-pointer text-lg text-white px-5 py-3 rounded-md hover:bg-[#2B59CE] transition-all ease-in-out duration-300">
                            Create course
                </button>
            </form>
          </div>
      </HomeLayout>
  );
}

export default CreateCourse;