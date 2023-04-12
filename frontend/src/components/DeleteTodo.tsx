import React, {useState} from 'react';
import {RiDeleteBack2Line} from 'react-icons/ri';
import axios from 'axios';
import { useQueryClient, useMutation} from '@tanstack/react-query';
import { toastSucces } from '../toast/toastFunction';
import { Dialog } from '@mui/material';
import './Dialog.scss';

interface IdeleteTodo{
    todoId: number;
    dialogHeader: string;
}

const DeleteTodo: React.FC<IdeleteTodo> = (props) => {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDialog = () => {
      setIsOpen(!isOpen);
    };

    const apiCall = async ({id}: {id: number}): Promise<any> => {
        return await axios.post('http://localhost:5000/todo/delete',{
          id
        });
      }
      const deleteTodo = useMutation({
        mutationFn: apiCall,
        onSuccess: () => {queryClient.invalidateQueries(['todos'])
        toastSucces(`Todo with id ${props.todoId} deleted 👍`);
      },
      });

      const todoDeleteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        deleteTodo.mutate({
            id: props.todoId
        });
    }

    return (
      <>
        <RiDeleteBack2Line onClick={handleOpenDialog}/>
        <Dialog open={isOpen} onClose={handleOpenDialog}>
          <div className='delete_dialog'>
            <h1>{props.dialogHeader}</h1>
            <button onClick={todoDeleteHandler}>Yes</button>
            <button onClick={handleOpenDialog}>No</button>
          </div>
        </Dialog>
      </>
    );
};

export default DeleteTodo;