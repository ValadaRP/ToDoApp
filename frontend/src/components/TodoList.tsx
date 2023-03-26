import React, { useEffect } from "react";
import './TodoList.scss';

export interface Itodo{
    todo: {Id:string, Name: string, Content: string, Date: string}[];
}


const TodoList:React.FC<{items:Itodo}> = props => {
    return(
        <div id="todoList">
            <h1>Your todo to do 😁</h1>
            <ul>
                {props.items.todo.map((todo) => {
                    return(
                        <li key={todo.Id}>{todo.Id + "." + " " + todo.Content}</li>
                    )
                })}
            </ul>
        </div>
    );
}

export default TodoList;