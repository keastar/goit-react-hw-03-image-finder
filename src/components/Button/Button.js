import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick }) => (
  <div className={css.but}>
    <button type="button" className={css.button} onClick={onClick}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
