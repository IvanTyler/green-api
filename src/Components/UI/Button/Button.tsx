import type { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import style from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button = ({ label, className, ...rest }: IButtonProps) => {
  return (
    <button className={clsx(style.button, className)} {...rest}>
      {label}
    </button>
  );
};
