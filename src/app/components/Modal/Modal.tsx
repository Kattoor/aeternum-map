import { ReactNode } from 'react';
import CloseIcon from '../icons/CloseIcon';
import styles from './Modal.module.css';

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};
function Modal({ children, title, onClose }: ModalProps): JSX.Element {
  return (
    <section className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.content}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h3>{title}</h3>
          <button onClick={onClose} className={styles.close}>
            <CloseIcon />
          </button>
        </header>
        <main>{children}</main>
      </div>
    </section>
  );
}

export default Modal;
