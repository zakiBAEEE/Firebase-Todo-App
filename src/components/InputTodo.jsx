import { Button } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { ModalTodo } from "./ModalTodo";
import { ThemeContext } from "../contexts/ThemeContext";
import { addTodo } from "../firebase/firebaseFirestore";

function InputTodo() {
    const { theme } = useContext(ThemeContext);
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = (value) => setOpenModal(value);
    const [idDoc, setIdDoc] = useState(null);


    const handleOpenModal = async () => {
        handleOpen(openModal ? false : true)
        try {
            const idTodo = await addTodo();
            setIdDoc(idTodo);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button size="sm" color={theme == 'light' ? "blue" : "green"} className="w-16 h-6 p-0 mb-1 cursor-pointer" onClick={handleOpenModal}>Add</Button>
            {openModal && <ModalTodo handleOpen={handleOpen} idDoc={idDoc} />}
        </>
    )
}

export { InputTodo }