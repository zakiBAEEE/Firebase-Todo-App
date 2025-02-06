import PropTypes from "prop-types"
import { TaskItem } from "./TaskItem"


function TaskList({ taskList }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {
                taskList.map((task) => {
                    return (
                        <TaskItem key={task.id} {...task} />
                    )
                })
            }
        </div>
    )
}

TaskList.propTypes = {
    taskList: PropTypes.array.isRequired
}

export { TaskList }