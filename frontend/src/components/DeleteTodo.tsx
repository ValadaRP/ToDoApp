import React, {useState} from 'react';
import {RiDeleteBack2Line} from 'react-icons/ri';
import axios from 'axios';
import { useQueryClient, useMutation} from '@tanstack/react-query';
import { toastError, toastSucces } from '../toast/toastFunction';
import { Dialog } from '@mui/material';
import './DeleteDialog.scss';
import { error } from './NewTodo';

interface IdeleteTodo{
    todoId: string;
    dialogHeader?: string;
}

const DeleteTodo: React.FC<IdeleteTodo> = (props) => {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDialog = () => {
      setIsOpen(!isOpen);
    };

    const apiCall = async ({id}: {id: string}): Promise<any> => {
        return await axios.post('http://localhost:5000/todo/delete',{
          id
        });
      }
      const deleteTodo = useMutation({
        mutationFn: apiCall,
        onSuccess: () => {queryClient.invalidateQueries(['todos'])
        toastSucces(`Todo with id ${props.todoId} deleted 👍`);
        },
        onError: (error) => {toastError(`${(error as error).response.data.message} 😢`)}
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
            <div className='container'>
              <span>{props.dialogHeader}</span>
              <div className='dialog_buttons'>
                <button onClick={todoDeleteHandler}>Yes</button>
                <button onClick={handleOpenDialog}>No</button>
              </div>
            </div>
          </div>
        </Dialog>
      </>
    );
};

export default DeleteTodo;