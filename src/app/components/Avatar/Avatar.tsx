import styles from './Avatar.module.css';

type AvatarProps = {
  src: string;
  alt: string;
};

function Avatar({ src, alt }: AvatarProps): JSX.Element {
  return <img className={styles.avatar} src={src} alt={alt} />;
}

export default Avatar;
