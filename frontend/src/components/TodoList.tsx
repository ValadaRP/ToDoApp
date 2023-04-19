import React, { useEffect } from "react";
import './TodoList.scss';
import DeleteTodo from "./DeleteTodo";
import UpdateTodo from "./UpdateTodo";

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
                        <div key={todo.Id}>
                            <li>{todo.Id + "." + " " + todo.Content}</li>
                            <DeleteTodo todoId={parseInt(todo.Id)} dialogHeader="Are you sure you want to delete"/>
                            <UpdateTodo todoId={parseInt(todo.Id)} name={todo.Name} content={todo.Content}/>
                        </div>
                    )
                })}
            </ul>
        </div>
    );
}

export default TodoList;