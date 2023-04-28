import React,{useState} from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toastError, toastSucces } from '../toast/toastFunction';
import {IoMdAddCircleOutline} from 'react-icons/io';
import { Dialog } from '@mui/material';
import './NewTodo.scss';

export interface InewTodo{
    addFunction: () => void | any;
}
export interface error{
    response: {
        data: {
            message: string;
        }
    }
}

const NewTodo:React.FC = (props) => {
    const queryClient = useQueryClient();
    const [nameInput, setNameInput] = useState("");
    const [contentInput, setContentInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    
    const apiRequest = async ({name, content} : {name: string, content: string}): Promise<any> => {
        return await axios.post('http://localhost:5000/todo/create', {
            name,content
        });
    }

    const handleOpenDialog = (event: React.FormEvent) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    const addTodo = useMutation({
        mutationFn: apiRequest,
        onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
        toastSucces("New Todo added 👍");
        setIsOpen(false);
        },
        onError: (error) => {
            toastError(`${(error as error).response.data.message} 😱`);
        },
      });

    const todoSumbitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        addTodo.mutate({
            name: nameInput,
            content: contentInput
        });
        setNameInput("");
        setContentInput("");
        
    }

    return(
        <>
            <IoMdAddCircleOutline onClick={() => setIsOpen(!isOpen)}/>
            <Dialog open={isOpen} onClose={handleOpenDialog}>
                <div className='add_dialog'>
                    <div className='container'>
                        <span>Add new Todo</span>
                        <form>
                            <div>
                                <label>Pass the name of the Todo</label>
                                <input type={"text"} value={nameInput} onChange={e => setNameInput((e.target as HTMLInputElement).value)}/>
                            </div>
                            <div>
                                <label>Pass the content of the Todo</label>
                                <input type={"text"} value={contentInput} onChange={e => setContentInput((e.target as HTMLInputElement).value)}/>
                            </div>
                            <div className='button_container'>
                                <button onClick={todoSumbitHandler}>Add new Todo</button>
                                <button onClick={handleOpenDialog}>Cancel</button>
                            </div>
                            
                        </form>
                    </div>
                    
                </div>
            </Dialog>
        </>
    )
}

export default NewTodo;