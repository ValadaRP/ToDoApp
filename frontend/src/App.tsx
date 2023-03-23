import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import { useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
 


function App() {
  const queryClient = useQueryClient();

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/todo/');
    return res.json();
  }

  const {data, isLoading} = useQuery({
    queryKey: ["todos"],
    queryFn: fetchData
  });
  
  
  if (isLoading){
    return <h1>Loading...</h1>
  }

  return (
    <>
      <TodoList items={data}/>
    </>
  )
}

export default App
