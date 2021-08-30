import { classNames } from '../../utils/styles';
import styles from './Checkbox.module.css';

type CheckboxProps = {
  imgSrc?: string;
  title: string;
  checked: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
};

function Checkbox({
  imgSrc,
  title,
  checked,
  className,
  onChange,
}: CheckboxProps): JSX.Element {
  return (
    <label
      className={classNames(
        className,
        styles.filter,
        checked && styles.checked
      )}
    >
      <input
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
        checked={checked}
      />
      {imgSrc && <img src={imgSrc} alt="" />}
      {title}
    </label>
  );
}

export default Checkbox;
