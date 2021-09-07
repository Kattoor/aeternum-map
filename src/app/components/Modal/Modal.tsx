import type { ReactNode } from 'react';
import { useEffect } from 'react';
import CloseIcon from '../icons/CloseIcon';
import styles from './Modal.module.css';

type ModalProps = {
  title?: string;
  children: ReactNode;
  onClose: () => void;
};
function Modal({ children, title, onClose }: ModalProps): JSX.Element {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.content}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          <button onClick={onClose} className={styles.close}>
            <CloseIcon />
          </button>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </section>
  );
}

export default Modal;
