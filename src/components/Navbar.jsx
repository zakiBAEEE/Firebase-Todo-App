import React from "react";
import {
    Navbar,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import { FaSun } from "react-icons/fa";


function Navigasi() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <div className="-m-6 max-h-[768px] w-[calc(100%+48px)]">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900 px-7">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                        color="black"
                    >
                        ChoreHub
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-x-1">
                            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                        </div>

                    </div>
                </div>
            </Navbar>
        </div>
    );
}

export { Navigasi }