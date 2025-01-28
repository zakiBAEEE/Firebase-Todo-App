import { Button, Typography } from "@material-tailwind/react"
import PropTypes from "prop-types"
import { FaTrash } from "react-icons/fa"

function TodoItem({ todo, classes, onDelete }) {
    return (
        <tr key={todo.id}>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {todo.name}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {todo.status ? "Selesai" : "Belum Selesai"}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {todo.date}
                </Typography>
            </td>
            <td className={classes}>
                <Button size="sm" color="red" onClick={() => onDelete(todo.id)}><FaTrash /></Button>
            </td>
        </tr>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.bool.isRequired,
        date: PropTypes.string.isRequired
    }),
    classes: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export { TodoItem }