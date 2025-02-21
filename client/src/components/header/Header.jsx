import { Link } from "react-router-dom"
import { Button } from "../ui/button"

const Header = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between py-2 w-11/12 md:w-10/12 mx-auto">
        <Link to={'/'}>
          <div className="flex items-center">
            <img className="w-14 h-14" src="/logo.webp" alt="" />
            <p className="font-bold">DragDrop</p>
          </div></Link>
        <ul className="flex items-center gap-5">
          <Link to="/"><li><Button variant={"link"}>Home</Button></li></Link>
          <Link to="/service"><li><Button variant={"link"}>Service</Button></li></Link>
          <Link to="/contact"><li><Button variant={"link"}>Contact</Button></li></Link>
          <Link to={"/auth/login"}><li><Button>Login</Button></li></Link>
        </ul>
      </div>
    </div>
  )
}

export default Header