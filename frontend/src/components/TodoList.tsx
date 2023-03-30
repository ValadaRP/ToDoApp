import React, { useEffect } from "react";
import './TodoList.scss';

import { UseMutationResult } from "@tanstack/react-query";
import DeleteTodo from "./DeleteTodo";

export interface Itodo{
    todo: {Id:string, Name: string, Content: string, Date: string}[];
    onDelete: (id:number) => UseMutationResult<{id:number}>;
}


const TodoList:React.FC<{items:Itodo}> = props => {
    return(
        <div id="todoList">
            <h1>Your todo to do 😁</h1>
            <ul>
                {props.items.todo.map((todo) => {
                    return(
                        <div key={todo.Id}>
                            <li>{todo.Id + "." + " " + todo.Content}</li>
                            <DeleteTodo todoId={parseInt(todo.Id)}/>
                        </div>
                    )
                })}
            </ul>
        </div>
    );
}

export default TodoList;