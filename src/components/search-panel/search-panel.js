import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        searchString: ''
    };

    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({
            searchString: term
        });
        this.props.onSearch(term);
    };

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   onChange={this.onSearchChange}
                   placeholder="type to search"
                   value={this.state.searchString}/>
        );
    }
};
