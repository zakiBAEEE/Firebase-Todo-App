import { Card } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { TodoItem } from "./TodoItem";
import { TableTodoHead } from "./TableTodoHead";



export function TodoList({ todos, onDelete }) {
    return (
        <Card className="h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
                <TableTodoHead />
                <tbody>
                    {todos.map((todo, index) => {
                        const isLast = index === todos.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <TodoItem key={todo.id} todo={todo} classes={classes} onDelete={onDelete} />
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
}