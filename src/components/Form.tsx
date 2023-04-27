import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

interface TodoFormProps {
  title: string;
  description: string;
}

function Form(attrs: TodoFormProps) {

  var { title, description } = attrs;

  const [newTodo, setNewTodo] = useState("");

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
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
  const createListItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // add alert if the title of the todo is empty.
    if (newTodo.title === '') {
      alert('Please enter a title for the todo.');
      return;
    }

    // Get the title and description from the form.
    const todo = {
      id: Math.max(...todos.map((todo) => todo.id), 0) + 1,
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
   * @param {number} index
   * @returns {void}
   */
  const deleteListItem = (index: number) => {
    // Copy the current todos array to a new array
    const updatedTodos = [...todos];

    // Remove the todo item at the given index
    updatedTodos.splice(index, 1);

    // Update the todos state with the updated array
    setTodos(updatedTodos);
  }

  /**
   * Handle the editing of a todo item.
   * 
   * @param {number} id
   * @returns {void}
   */
  const saveEditedListItem = (id: number, title: string, description: string) => {
    // Copy the current todos array to a new array
    const updatedTodos = [...todos];

    // Find the index of the todo item with the given id
    const index = updatedTodos.findIndex((todo) => todo.id === id);

    // Update the todo item at the given index
    updatedTodos[index] = {
      id,
      title,
      description
    };

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
              <textarea name="todo-desc" id="todo-desc" cols="30" rows="10" value={newTodo.description} placeholder='Description' onChange={handleDescChange} />
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
              todos.map((todo, index) => (
                <TodoItem key={index} todo={todo} editTodo={saveEditedListItem} onDelete={() => deleteListItem(index)} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Form