import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';
import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    searchImgName: '',
  };

  handleNameChange = event => {
    this.setState({ searchImgName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchImgName.trim() === '') {
      return alert('Введите, что хотите найти из изображений!');
    }
    //2.И передаю в метод значение из этого файла state=searchName -> прокидываем пропс с App 'propName' и передаем ему значение с Searchbar -> searchImgName
    this.props.onSubmit(this.state.searchImgName);
    //5.Идет очистка формы поля input после ее сабмита
    this.setState({ searchImgName: '' });
  };

  render() {
    return (
      <>
        <header className={css.searchbar}>
          {/* // 1.при событии Submit формы -> вызываю метод из App -> handleSubmit -> this.props.propName */}
          <form className={css.form} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.button}>
              <ImSearch
                style={{
                  height: '20',
                  width: '20',
                }}
              />
            </button>
            <input
              className={css.input}
              type="text"
              name="searchImgName"
              value={this.state.searchImgName}
              onChange={this.handleNameChange}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
