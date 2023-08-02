import css from './ErrorView.module.css';

export default function ErrorView({ message }) {
  return (
    <div className={css.error_div}>
      <p>{message}</p>
    </div>
  );
}
