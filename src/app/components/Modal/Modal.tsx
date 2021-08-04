import { classNames } from '../../utils/styles';
import styles from './Modal.module.css';

type ModalProps = {
  className?: string;
  fullHeight?: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({
  className,
  children,
  onClose,
  fullHeight,
}: ModalProps): JSX.Element {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <article
        className={classNames(
          styles.modal,
          fullHeight && styles.fullHeight,
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose}>
          <svg viewBox="0 0 10 10" stroke="currentColor">
            <line x1="0" y1="0" x2="10" y2="10" />
            <line x1="10" y1="0" x2="0" y2="10" />
          </svg>
        </button>
        {children}
      </article>
    </div>
  );
}

export default Modal;
