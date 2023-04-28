import React from 'react';
import { useState } from 'react';

interface ToDoItemProps {
  todo: {
    id: number;
    title: string;
    description: string;
  };
  editTodo: (id: number, title: string, description: string) => void;
  onDelete: () => void;
}

function TodoItem({ todo, onDelete, editTodo }: ToDoItemProps) {
  const { id, title, description } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedDescription(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    editTodo(id, updatedTitle, updatedDescription);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedTitle(title);
    setUpdatedDescription(description);
  };

  return (
    <div className="todo-list-item">
      <div className="todo-list-item__content">
        <div className="todo-list-item__heading">
          {/* Add a checkbox. */}
          <input type="checkbox" className="todo-list-item__checkbox" />
          {isEditing ? (
            <input
              type="text"
              className="todo-list-item__title--edit"
              value={updatedTitle}
              onChange={handleTitleChange}
            />
          ) : (
            <h3 className="todo-list-item__title">{title}</h3>
          )}
        </div>
        <div className="todo-list-item__info">
          {isEditing ? (
            <textarea
              className="todo-list-item__description"
              value={updatedDescription}
              onChange={handleDescriptionChange}
            />
          ) : (
            <p className="todo-list-item__description">{description}</p>
          )}
        </div>
        <div className="todo-list-item__btns">
          {isEditing ? (
            <>
              <button
                className="todo-list-item__btn todo-list-item__btn--edit"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="todo-list-item__btn todo-list-item__btn--cancel"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="todo-list-item__btn todo-list-item__btn--edit"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
          <button
            className="todo-list-item__btn todo-list-item__btn--delete"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
