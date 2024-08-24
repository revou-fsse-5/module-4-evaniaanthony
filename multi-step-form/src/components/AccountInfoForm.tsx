import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface AccountFormData {
  username: string;
  password: string;
}

const AccountInfoForm = ({ onPrev, onChange, data }: any) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        'Password must contain one uppercase, one lowercase, one number, and one special character'
      ),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<AccountFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: AccountFormData) => {
    onChange(formData);
    alert('Registration complete!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <input
        {...register('username')}
        placeholder="Username"
        className={`input ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.username && <p className="text-red-500">{errors.username.message}</p>}

      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        className={`input ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <div className="flex justify-between">
        <button type="button" onClick={onPrev} className="btn-secondary">
          Previous
        </button>
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AccountInfoForm;