import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import style from './LoginScreen.module.scss';
import { Input } from '../../../UI/Input/Input';
import { Button } from '../../../UI/Button/Button';
import { getStateInstance } from '../../../../api/greenApi';
import { ApiError } from '../../../../api/apiError';
import { loginSchema, type LoginFormValues } from './LoginScreen.schema';

interface ILoginScreenProps {
  onSubmit: (values: LoginFormValues) => void;
}

export const LoginScreen = ({ onSubmit }: ILoginScreenProps) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: getStateInstance,
    onSuccess: (data, variables) => {
      console.log('getStateInstance: успех, данные:', data);
      onSubmit(variables);
    },
    onError: (error) => {
      console.error('getStateInstance: ошибка запроса:', error);

      if (error instanceof ApiError && error.status === 403) {
        // idInstance не существует или указан неверно
        setError('idInstance', { message: 'Проверьте правильность idInstance' });
        return;
      }

      if (error instanceof ApiError && error.status === 401) {
        // idInstance верный, но apiTokenInstance неверный
        setError('apiTokenInstance', { message: 'Проверьте правильность apiTokenInstance' });
        return;
      }

      setError('root', {
        message: error instanceof Error ? error.message : 'Не удалось подключиться к инстансу',
      });
    },
  });

  const handleFormSubmit = handleSubmit((values) => {
    clearErrors('root');
    mutate(values);
  });

  return (
    <div className={style.loginScreen}>
      <form className={style.loginScreen__card} onSubmit={handleFormSubmit} noValidate>
        <h1 className={style.loginScreen__title}>GREEN-API Chat</h1>
        <p className={style.loginScreen__subtitle}>
          Введите параметры вашего инстанса GREEN-API
        </p>

        <Input
          label="idInstance"
          placeholder="310022752158"
          error={errors.idInstance?.message}
          {...register('idInstance')}
        />

        <Input
          label="apiTokenInstance"
          placeholder="d0e17d..."
          type="password"
          error={errors.apiTokenInstance?.message}
          {...register('apiTokenInstance')}
        />

        {errors.root?.message && (
          <p className={style.loginScreen__error}>{errors.root.message}</p>
        )}

        <Button
          type="submit"
          label={isPending ? 'Проверка...' : 'Подключиться'}
          disabled={isPending}
        />
      </form>
    </div>
  );
};
