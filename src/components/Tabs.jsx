import { Button, Typography } from "@material-tailwind/react"
import { FaCalendarDay, } from "react-icons/fa"
import { FaCalendarWeek } from "react-icons/fa"
import { FaFilter } from "react-icons/fa"
import { FaSort } from "react-icons/fa"
import { FiSearch } from 'react-icons/fi'

function Tabs() {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <div className="flex gap-x-5 items-center">
                    <div className="flex gap-1">
                        <FaCalendarDay />
                        <Typography variant="small" color="black">This Week</Typography>
                    </div>
                    <div className="flex gap-1">
                        <FaCalendarWeek />
                        <Typography variant="small" color="black">This Month</Typography>
                    </div>
                </div>
                <div className="flex gap-x-4 items-center">
                    <FaFilter />
                    <FaSort />
                    <FiSearch />
                    <Button size="sm" color="blue" className="w-16 h-6 p-0 mb-1">Add</Button>
                </div>
            </div>
            <div className="dark:bg-white bg-gray-800 h-[1px] w-full"></div>
        </div>
    )
}

export { Tabs }

