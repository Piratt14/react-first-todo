import React, { Component } from 'react';

import './todo-list-item.css';

export  default class TodoListItem extends Component{

    state = {
        done: false,
        important: false
    };

    onLabelClick = () => {
        this.setState(({ done }) => {
            return {
                done: !done
            };
        });
    };

    //тут используется прием с передачей не объекта в setState, а функции
    //которая возвращает объект . Это говорит реакту вызывать функцию только
    //когда состояние state будет финальным
    //если новое состояние зависит от предыдущего состояния то обязательно
    //нужно использовать функцию, а не просто объект
    onMarkImportant = () => {
        this.setState(({ important }) => {
            return {
                important: !important
            };
        });
    };

    render() {

        const { label } = this.props;
        const { done, important } = this.state;

        let classNames = 'todo-list-item';
        if (done) classNames += ' done';

        if (important) classNames += ' important';

        return (
            <span className={classNames}>
                <span
                    className="todo-list-item-label"
                    onClick={ this.onLabelClick }>
                    { label }
                </span>

                <button type="button"
                        className="btn btn-outline-success btn-sm float-right"
                        onClick={ this.onMarkImportant }>
                    <i className="fa fa-exclamation"/>
                </button>

                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-trash-o"/>
                </button>
            </span>
        );
    }
}
