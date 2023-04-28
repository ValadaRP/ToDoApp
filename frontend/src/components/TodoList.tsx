import React, { useEffect } from "react";
import './TodoList.scss';
import DeleteTodo from "./DeleteTodo";
import UpdateTodo from "./UpdateTodo";
import NewTodo from "./NewTodo";

export interface Itodo{
    todo: {id:string, name: string, content: string, date: string}[];
}


const TodoList:React.FC<{items:Itodo}> = props => {
    return(
        <div id="todoList">
            <div className="header_container">
                <h1>Your todo to do 😁</h1>
                <NewTodo />
            </div>
            <ul>
                {props.items.todo.map((todo) => {
                    return(
                        <div key={todo.id}>
                            <li>
                                <span>{todo.name}</span>
                                <span>{" " + todo.content}</span>
                            </li>
                            <DeleteTodo todoId={todo.id} dialogHeader="Are you sure you want to delete"/>
                            <UpdateTodo todoId={todo.id} name={todo.name} content={todo.content} dialogHeader="Update"/>
                        </div>
                    )
                })}
            </ul>
        </div>
    );
}

export default TodoList;