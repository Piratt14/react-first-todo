import React from 'react';
import TodoListItem from "./todo-list-item";

const TodoList = ({ todos }) => {

    const elements = todos.map((item) => {

        const { id, ...itemProps } = item;

        return (
            // { ... item } - использование spread оператора для объекта
            // и одновременно с тем использование свойства
            // { label: label } === { label
            <li key={id}>
                <TodoListItem { ...itemProps } />
            </li>
        );
    });

    return (
        <ul>
            { elements }
        </ul>
    );
};

export default TodoList;
