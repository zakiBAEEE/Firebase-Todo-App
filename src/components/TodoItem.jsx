import { Checkbox } from "@material-tailwind/react"
// import * as emoji from 'node-emoji'
import { useEffect, useState } from "react";
import { updateTodoItem } from "../firebase/firebaseFirestore";
import PropTypes from "prop-types";

function TodoItem({ taskId, todoId, todo }) {
    const [text, setText] = useState(todo);

    useEffect(() => {
        updateTodoItem(taskId, todoId, text);
    }, [taskId, text, todoId]); // Update Firestore setiap kali text berubah

    return (
        <div className="flex gap-2">
            <Checkbox color="green" />
            <input
                type="text"
                placeholder="Apa tugas Anda?"
                className="bg-transparent outline-none border-none text-gray-700 font-bold w-full"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
}

TodoItem.propTypes = {
    todoId: PropTypes.string.isRequired,
    todo: PropTypes.string.isRequired,
    taskId: PropTypes.string,
}

export { TodoItem }