import styles from "./Modal.module.css";

interface Props {
  show: boolean;
}

const Modal: React.FC<Props> = (props) => {
  if (props.show) {
    return (
      <div className={styles.backdrop}>
        <div className={styles.modalBody}>{props.children}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
