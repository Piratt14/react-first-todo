import React, { Component } from 'react';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Eat your dinner'),
        ],
        term: '',
        filter: 'all',
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };

    addedItem = (text) => {

        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArray = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArray
            }
        })
    };

    deleteItem = (id) => {

        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            //нельзя изменять существующий state, поэтому создаем новый массив
            //на основе двух кусков ДО и ПОСЛЕ удаляемого элемента
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        })
    };

    searchItem = (text) => {
        this.setState({term: text})
    };

    onFilterChange = (name) => {
        this.setState({filter: name})
    };

    search = (arr, text) => {
        if (!text) return arr;

        const term = new RegExp(text, 'i');

        return arr.filter((el) => term.test(el.label));
    };

    filter(items, filter) {

        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        //используюя spread оператор создаем новый объект который
        // имеет все поля старого и затем передаем ещё одно поле,
        // которое перезапишет старое поле 'done'
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData,id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData,id, 'done')
            }
        });
    };

    render() {

        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(
            this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearch={ this.searchItem }/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={ this.onFilterChange }/>
                </div>

                <TodoList
                    todos={ visibleItems }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone }/>
                <ItemAddForm
                    onAdded={ this.addedItem }/>
            </div>
        );
    };
};
