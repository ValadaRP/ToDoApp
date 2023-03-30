import React from 'react';
import {RiDeleteBack2Line} from 'react-icons/ri';
import axios from 'axios';
import { useQueryClient, useMutation} from '@tanstack/react-query';

interface IdeleteTodo{
    todoId: number;
}

const DeleteTodo: React.FC<IdeleteTodo> = (props) => {
    const queryClient = useQueryClient();

    const apiCall = async ({id}: {id: number}): Promise<any> => {
        return await axios.post('http://localhost:5000/todo/delete',{
          id
        });
      }
      const deleteTodo = useMutation({
        mutationFn: apiCall,
        onSuccess: () => {queryClient.invalidateQueries(['todos'])},
      });

      const todoDeleteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        deleteTodo.mutate({
            id: props.todoId
        });
    }

    return <RiDeleteBack2Line onClick={todoDeleteHandler}/>;
};

export default DeleteTodo;