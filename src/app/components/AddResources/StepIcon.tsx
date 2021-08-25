import { classNames } from '../../utils/styles';
import CheckedIcon from '../icons/CheckedIcon';
import styles from './StepIcon.module.css';

type StepIconProps = {
  step: number;
  done: boolean;
  disabled: boolean;
};
function StepIcon({ step, done, disabled }: StepIconProps): JSX.Element {
  return (
    <span className={classNames(styles.step, disabled && styles.disabled)}>
      {done ? <CheckedIcon /> : step}
    </span>
  );
}

export default StepIcon;
