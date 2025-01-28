
import {
    Avatar,
    Button,
    Navbar,
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router";
import { FaDoorOpen } from "react-icons/fa";
import { logout } from "../firebase/firebaseAuth";

function NavList() {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="black"
                className="p-1 font-medium"
            >
                <Link to="/" className="flex items-center hover:text-blue-500 transition-colors">
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="black"
                className="p-1 font-medium"
            >
                <Link to="/notes" className="flex items-center hover:text-blue-500 transition-colors">
                    Notes
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="black"
                className="p-1 font-medium flex gap-1"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                    Account
                </a>
                <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
            </Typography>
        </ul>
    );
}

export function NavbarSimple() {

    return (
        <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5"
                    color="black"
                >
                    Material Tailwind
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                    <Button onClick={logout}><FaDoorOpen /></Button>
                </div>
            </div>
        </Navbar>
    );
}