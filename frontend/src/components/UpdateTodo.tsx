import { Dialog } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { FC,useState } from "react";
import {AiOutlineEdit} from 'react-icons/ai';
import './UpdateTodo.scss';
import axios from "axios";
import { toastSucces } from "../toast/toastFunction";

interface IUpdateTodo{
    todoId: number;
    name: string;
    content: string;
    dialogHeader?: string;
}

const UpdateTodo:FC<IUpdateTodo> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [nameInput, setNameInput] = useState(props.name);
    const [contentInput, setContentInput] = useState(props.content);
    const queryClient = useQueryClient();

    const handleOpenDialog = () => {
        setIsOpen(!isOpen);
    }
    const apiRequest = async ({id, name, content} : {id: number,name: string, content: string}): Promise<any> => {
        return await axios.post('http://localhost:5000/todo/update', {
            id,name,content
        });
    }
    const updateTodo = useMutation({
        mutationFn: apiRequest,
        onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
        toastSucces("You have succesfully updated the Todo! 👍");
        },
      });

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        updateTodo.mutate({
            id: props.todoId,
            name: nameInput,
            content: contentInput
        });
        handleOpenDialog();
    }

    return (
        <>
            <AiOutlineEdit onClick={handleOpenDialog}/>
            <Dialog open={isOpen} onClose={handleOpenDialog}>
                <div className="update_dialog">
                    <div className="container">
                    <span>{props.dialogHeader}</span>
                        <form onSubmit={handleFormSubmit}>
                            <div className="flex_container">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" defaultValue={props.name} onChange={(e) => setNameInput((e.target as HTMLInputElement).value)}/>
                            </div>
                            <div className="flex_container">
                                <label htmlFor="content">Content</label>
                                <input type="text" name="content" id="content" defaultValue={props.content} onChange={(e) => setContentInput((e.target as HTMLInputElement).value)}/>
                            </div>
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default UpdateTodo;