import { Button } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { ModalTodo } from "./ModalTodo";
import { ThemeContext } from "../contexts/ThemeContext";
import { addTask } from "../firebase/firebaseFirestore";

function InputTodo() {
    const { theme } = useContext(ThemeContext);
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = (value) => setOpenModal(value);
    const [taskId, setTaskId] = useState(null);


    const handleOpenModal = async () => {
        handleOpen(openModal ? false : true)
        try {
            const idTask = await addTask();
            setTaskId(idTask);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button size="sm" color={theme == 'light' ? "blue" : "green"} className="w-16 h-6 p-0 mb-1 cursor-pointer" onClick={handleOpenModal}>Add</Button>
            {openModal && <ModalTodo handleOpen={handleOpen} taskId={taskId} className="overflow-scroll" />}
        </>
    )
}

export { InputTodo }