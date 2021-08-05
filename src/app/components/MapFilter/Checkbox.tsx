import { classNames } from '../../utils/styles';
import styles from './Checkbox.module.css';

type CheckboxProps = {
  imgSrc: string;
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function Checkbox({
  imgSrc,
  title,
  checked,
  onChange,
}: CheckboxProps): JSX.Element {
  return (
    <label className={classNames(styles.filter, checked && styles.checked)}>
      <input
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
        checked={checked}
      />
      <img src={imgSrc} alt="" />
      {title}
    </label>
  );
}

export default Checkbox;
