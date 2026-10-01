import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import style from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, className, ...rest }, ref) => {
    return (
      <label className={clsx(style.input, className)}>
        {label && <span className={style.input__label}>{label}</span>}
        <input
          ref={ref}
          className={clsx(style.input__field, error && style.input__field_error)}
          {...rest}
        />
        {error && <span className={style.input__error}>{error}</span>}
      </label>
    );
  }
);

Input.displayName = 'Input';
