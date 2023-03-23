import React,{useState} from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface InewTodo{
    addFunction: () => void | any;
}

const NewTodo:React.FC = (props) => {
    const queryClient = useQueryClient();
    const [nameInput, setNameInput] = useState("");
    const [contentInput, setContentInput] = useState("");
    
    const apiRequest = async ({name, content} : {name: string, content: string}): Promise<any> => {
        return await axios.post('http://localhost:5000/todo/create', {
            name,content
        });
      }

    const addTodo = useMutation({
        mutationFn: apiRequest,
        onSuccess: () => {queryClient.invalidateQueries(['todos'])},
      });

    const todoSumbitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        addTodo.mutate({
            name: nameInput,
            content: contentInput
        });
        setNameInput("");
        setContentInput("");
        // apiRequest();
    }

    return(
        <form onSubmit={todoSumbitHandler}>
            <div>
                <label>Pass the name of the Todo</label>
                <input type={"text"} value={nameInput} onChange={e => setNameInput((e.target as HTMLInputElement).value)}/>
            </div>
            <div>
                <label>Pass the content of the Todo</label>
                <input type={"text"} value={contentInput} onChange={e => setContentInput((e.target as HTMLInputElement).value)}/>
            </div>
            <button type="submit" >Add new Todo</button>
        </form>
    )
}

export default NewTodo;