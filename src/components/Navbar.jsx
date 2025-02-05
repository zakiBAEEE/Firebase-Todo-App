import {
    Navbar,
    Typography,
} from "@material-tailwind/react";
import { ProfileMenu } from "./ProfileMenu";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function Navigasi() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] ">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 dark:bg-gray-900">
                <div className="flex items-center justify-between text-blue-gray-900 px-7">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                        color={theme == 'light' ? "black" : 'white'}
                    >
                        ChoreHub
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-x-1">
                            <ProfileMenu />
                        </div>

                    </div>
                </div>
            </Navbar>
        </div>
    );
}

export { Navigasi }