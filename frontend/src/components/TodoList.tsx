import React, { useEffect } from "react";
import './TodoList.scss';

export interface todo{
    todo: {Id:string, Name: string, Content: "Test", Date: string}[];
}
export interface items{
    items: todo;
}

const TodoList:React.FC<{items:todo}> = props => {

    console.log(props.items.todo[0].Content)
    
    return(
        <div className="todoContainer">
            {props.items.todo.map((todo) => {
                return(
                    <p>{todo.Date}</p>
                )
            })}
            
        </div>
    );
}

export default TodoList;