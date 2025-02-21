import { Button } from "../ui/button"

const Banner = () => {
    return (
        <div className="">
            <div className="grid grid-cols-2 w-11/12 mx-auto md:w-10/12 py-20">
                <div className="col-span-1 flex flex-col justify-center gap-5">
                    <p className="text-4xl font-bold ">Drag and Drop Task Management Application</p>
                    <p className="text-[#786c65]">Our intuitive drag and drop task management application empowers you to effortlessly organize your projects, boost productivity, and achieve your goals with ease</p>
                    <div className="flex items-center gap-5">
                        <Button className={"bg-[#22c085]"}>Get Started</Button>
                        <Button className={"bg-white text-black hover:text-white"}>Learn More</Button>
                    </div>
                </div>
                <div className="col-span-1 flex justify-end">
                    <img className="w-96" src="/image1.webp" alt="" />
                </div>
            </div>

        </div>
    )
}

export default Banner