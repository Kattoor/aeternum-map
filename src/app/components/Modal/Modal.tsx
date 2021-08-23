import { ReactNode } from 'react';
import styles from './Modal.module.css';

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};
function Modal({ children, title, onClose }: ModalProps): JSX.Element {
  return (
    <section className={styles.container} onClick={onClose}>
      <div className={styles.content}>
        <header>
          <h3>{title}</h3>
          <button onClick={onClose}>X</button>
        </header>
        <main>{children}</main>
      </div>
    </section>
  );
}

export default Modal;
