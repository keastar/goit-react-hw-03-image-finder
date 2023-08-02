// import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    console.log('Modal component did mount');

    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <>
        <div className={css.overlay}>
          <div className={css.modal}>
            {this.props.children}
            {/* <img src="" alt="" /> */}
          </div>
        </div>
      </>
    );
  }
}

// Modal.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
