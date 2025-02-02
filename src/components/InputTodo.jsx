import { Button } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { ModalInput } from "./ModalInput";
import { ThemeContext } from "../contexts/ThemeContext";

function InputTodo() {
    const { theme } = useContext(ThemeContext);
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = (value) => setOpenModal(value);


    const handleOpenModal = () => handleOpen('lg')

    return (
        <>
            <Button size="sm" color={theme == 'light' ? "blue" : "green"} className="w-16 h-6 p-0 mb-1 cursor-pointer" onClick={handleOpenModal}>Add</Button>
            {openModal && <ModalInput handleOpen={handleOpen} />}
        </>
    )
}

export { InputTodo }