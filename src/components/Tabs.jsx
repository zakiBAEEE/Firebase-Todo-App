import { Button, Typography } from "@material-tailwind/react"
import { useContext, useState } from "react"
import { FaCalendarDay, } from "react-icons/fa"
import { FaCalendarWeek } from "react-icons/fa"
import { FaFilter } from "react-icons/fa"
import { FaSort } from "react-icons/fa"
import { FiSearch } from 'react-icons/fi'
import { ThemeContext } from "../contexts/ThemeContext"
import { ModalInput } from "./ModalInput"

function Tabs() {
    const { theme } = useContext(ThemeContext);
    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);

    return (size == null ?
        (<div className="flex flex-col">
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
                    <Button size="sm" color={theme == 'light' ? "blue" : "green"} className="w-16 h-6 p-0 mb-1 cursor-pointer" onClick={() => handleOpen("xl")}>Add</Button>
                </div>
            </div>
            <div className="dark:bg-white bg-gray-800 h-[1px] w-full"></div>
        </div>
        ) :
        <ModalInput handleOpen={handleOpen} size={size} />
    )
}

export { Tabs }

