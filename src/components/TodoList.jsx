import { TodoItem } from "./TodoItem"
import PropTypes from "prop-types";

function TodoList({ todos, taskId }) {

    return (
        <div>
            {todos.map(todo => (
                <TodoItem key={todo.todoId} todo={todo.todo} taskId={taskId} todoId={todo.todoId} />
            ))}
        </div>
    );
}

TodoList.propTypes = {
    taskId: PropTypes.string,
    todos: PropTypes.array
}

export { TodoList }