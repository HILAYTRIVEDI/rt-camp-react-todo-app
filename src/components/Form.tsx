import React from 'react';
import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: number,
  title: string,
  description: string
}

interface TodoInput {
  title: string,
  description: string
}

function Form() {

  const [newTodo, setNewTodo] = useState({} as TodoInput);

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  /**
   * Handle the change of the title input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @returns {void}
   */
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setNewTodo({
      ...newTodo,
      title: e.target.value
    });
  }

  /**
   * Handle the change of the description input.
   * 
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e
   * @returns {void}
   */
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    e.preventDefault();
    setNewTodo({
      ...newTodo,
      description: e.target.value
    });
  }

  /**
   * Handle the creation of a new todo item.
   * 
   * @param {React.MouseEvent<HTMLButtonElement>} e
   * @returns {void}
   */
  const createListItem = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    // add alert if the title of the todo is empty.
    if (newTodo.title === '') {
      alert('Please enter a title for the todo.');
      return;
    }

    // Get the title and description from the form.
    const todo = {
      id: Math.max(...todos.map((todo: Todo) => todo.id), 0) + 1,
      title: newTodo.title,
      description: newTodo.description
    }

    // Add the todo to the todos array.
    setTodos([...todos, todo]);

    // Reset the form.
    setNewTodo({
      title: '',
      description: ''
    });
  }

  /**
   * Handle the deletion of a todo item.
   * 
   * @param {number} id
   * @returns {void}
   */
  const deleteListItem = (id: number): void => {
    // Filter the todos array to remove the todo item at the given index
    const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);

    // Update the todos state with the updated array
    setTodos(updatedTodos);
  }

  /**
   * Handle the editing of a todo item.
   * 
   * @param {number} id
   * @returns {void}
   */
  const saveEditedListItem = (id: number, title: string, description: string): void => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.title = title;
        todo.description = description;
      }
      return todo;
    });

    // Update the todos state with the updated array
    setTodos(updatedTodos);
  }



  return (
    <>
      <div className="todo-heading">
        <div className="container">
          <h1>Todo List</h1>
          <form className="todo-form">
            <div className="todo-form-info">
              <input type="text" name="" id="todo-title" placeholder='Title' value={newTodo.title} onChange={handleTitleChange} />
              <textarea name="todo-desc" id="todo-desc" cols={30}  rows={10} value={newTodo.description} placeholder='Description' onChange={handleDescChange} />
            </div>
            <button className='todo-create-btn' onClick={createListItem}> Create Task </button>
          </form>
        </div>
      </div>
      <div className='todo-list-wrapper'>
        <div className="container">
          <div className='todo-list'>
            {
              // Render todos from todos array
              todos.map((todo: Todo, index: number) => (
                <TodoItem key={index} todo={todo} editTodo={saveEditedListItem} onDelete={() => deleteListItem(todo.id)} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Form