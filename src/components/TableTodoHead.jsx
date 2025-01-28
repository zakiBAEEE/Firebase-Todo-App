import { Typography } from "@material-tailwind/react"
import { TABLE_HEAD } from "../utils/tableTodoHead"

function TableTodoHead() {
    return (
        <thead>
            <tr>
                {TABLE_HEAD.map((head) => (
                    <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                        >
                            {head}
                        </Typography>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export { TableTodoHead }