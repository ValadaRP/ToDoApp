import { Dialog } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { FC,useState } from "react";
import {AiOutlineEdit} from 'react-icons/ai';

interface IUpdateTodo{
    todoId: number;
    name: string;
    content: string;
}

const UpdateTodo:FC<IUpdateTodo> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const handleOpenDialog = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <AiOutlineEdit onClick={handleOpenDialog}/>
            <Dialog open={isOpen} onClose={handleOpenDialog}>
                <div>
                    <p>{props.todoId}</p>
                    <p>{props.name}</p>
                    <p>{props.content}</p>
                </div>
            </Dialog>
        </>
    );
};

export default UpdateTodo;