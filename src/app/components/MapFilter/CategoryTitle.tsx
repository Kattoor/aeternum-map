import type { ReactNode } from 'react';
import styles from './CategoryTitle.module.css';

type CategoryTitleProps = {
  children: ReactNode;
};

function CategoryTitle({ children }: CategoryTitleProps): JSX.Element {
  return <h3 className={styles.title}>{children}</h3>;
}

export default CategoryTitle;
