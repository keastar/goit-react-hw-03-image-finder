import css from './Container.module.css';
import PropTypes from 'prop-types';

const Container = ({ children }) => {
  return (
    <>
      <div className={css.Container}>{children}</div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Container;
