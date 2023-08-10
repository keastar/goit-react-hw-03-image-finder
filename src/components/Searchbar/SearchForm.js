import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

class SearchFrom extends Component {
  state = {
    query: '',
  };

  handleSearchInput = e => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    // Запрещает отправку пустого инпута
    if (!this.state.query) return;

    // Отдать данные внешнему компоненту
    this.props.onSearch(this.state.query);

    this.resetForm();
  };

  resetForm = () =>
    this.setState({
      query: '',
    });

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <button type="submit" className={css.button}>
          <span>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          name="query"
          value={this.state.query}
          onChange={this.handleSearchInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    );
  }
}

SearchFrom.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchFrom;
