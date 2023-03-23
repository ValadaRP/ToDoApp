import { useState, useEffect } from 'react';
import TodoList, { Itodo } from './components/TodoList';
import { useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import axios from 'axios';
import NewTodo, { InewTodo } from './components/NewTodo';
 

function App() {
  const queryClient = useQueryClient();

  const fetchDataAxios = async (): Promise<Itodo> => {
    const res = await axios.get('http://localhost:5000/todo/');
    return res.data;
  }

  

  const {data, isLoading} = useQuery({
    queryKey: ["todos"],
    queryFn: fetchDataAxios
  }) as {data: Itodo, isLoading: boolean};
  
  
  if (isLoading){
    return <h1>Loading...</h1>
  }
  
  return (
    <>
      <div className="todoContainer">
        <TodoList items={data} />
        <NewTodo />
      </div>
    </>
  )
}

export default App
