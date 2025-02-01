import { Typography } from "@material-tailwind/react"

function Overview() {
    return (
        <div className="flex gap-y-5 justify-around py-7">
            <div className="flex flex-col gap-x-2 items-center">
                <Typography variant="h1" className="dark:text-white">20</Typography>
                <Typography variant="h2" className="dark:text-white">Total Task</Typography>
            </div>
            <div className="flex flex-col gap-x-2 items-center">
                <Typography variant="h1" className="dark:text-white">10%</Typography>
                <Typography variant="h2" className="dark:text-white">Task Complete</Typography>
            </div>
            <div className="flex flex-col gap-x-2 items-center">
                <Typography variant="h1" className="dark:text-white">10</Typography>
                <Typography variant="h2" className="dark:text-white">Task Remaining</Typography>
            </div>
        </div>
    )
}

export { Overview }