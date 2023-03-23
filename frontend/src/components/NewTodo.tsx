import React,{useState} from 'react';

export interface InewTodo{
    addFunction: (name: string, content: string) => void;
}

const NewTodo:React.FC<InewTodo> = (props) => {
    const [nameInput, setNameInput] = useState("");
    const [contentInput, setContentInput] = useState("");

    const todoSumbitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        props.addFunction(nameInput, contentInput);
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