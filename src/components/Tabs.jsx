import { Typography } from "@material-tailwind/react"
import { useContext } from "react"
import { FaCalendarDay, } from "react-icons/fa"
import { FaCalendarWeek } from "react-icons/fa"
import { FaFilter } from "react-icons/fa"
import { FaSort } from "react-icons/fa"
import { FiSearch } from 'react-icons/fi'
import { ThemeContext } from "../contexts/ThemeContext"
import { InputTodo } from "./InputTodo"


function Tabs() {
    const { theme } = useContext(ThemeContext);


    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <div className="flex gap-x-5 items-center">
                    <div className="flex gap-1 cursor-pointer">
                        <FaCalendarDay color={theme == 'light' ? "black" : "white"} />
                        <Typography variant="small" color={theme == 'light' ? "black" : "white"}>This Week</Typography>
                    </div>
                    <div className="flex gap-1 cursor-pointer">
                        <FaCalendarWeek color={theme == 'light' ? "black" : "white"} />
                        <Typography variant="small" color={theme == 'light' ? "black" : "white"}>This Month</Typography>
                    </div>
                </div>
                <div className="flex gap-x-4 items-center">
                    <FaFilter color={theme == 'light' ? "black" : "white"} className="cursor-pointer" />
                    <FaSort color={theme == 'light' ? "black" : "white"} className="cursor-pointer" />
                    <FiSearch color={theme == 'light' ? "black" : "white"} className="cursor-pointer" />
                    <InputTodo />
                </div>
            </div>
            <div className="dark:bg-white bg-gray-800 h-[1px] w-full"></div>
        </div>


    )
}

export { Tabs }

