import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import React, { useState } from 'react';

export const Home = () => {
    const { user, signOut } = useContext(AuthGoogleContext);

    const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    setTodos([...todos, inputValue]);
    setInputValue('');
  };

  const deleteTask = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

    const userLogado = user ? JSON.parse(user) : null;
    const displayNameAuth = userLogado && userLogado.displayName ? userLogado.displayName : '';
    return (
      <>
    <div className="div-home">
      <h1 className="text-name-user">{`Olá, ${displayNameAuth}!`}
      </h1>
      <button
      className="button-logout"
       onClick={() => signOut()}
       >
        Sair
      </button>
    </div>
     <div class="div-father">
     <h1>Todo List</h1>
     <div className='input-set'>
     <form className='form-class'
     onSubmit={handleSubmit}
     >
       <input 
       type="text" 
       value={inputValue} 
       onChange={handleInputChange} />
       <button
       className="btn btn-primary"
       type="submit"
       >Add
       </button>
     </form>
     </div>
     <ul className='task-list'>
       {todos.map((todo, index) => (
        <div className='li-list'>
         <li key={index}>
           {todo}
           <button
       onClick={() =>deleteTask(index)}
       className="btn btn-primary"
       >
         Delete
       </button>
           </li>
         
        </div>
         ))
       }
       
     </ul>
   </div>
   </>
    )
};