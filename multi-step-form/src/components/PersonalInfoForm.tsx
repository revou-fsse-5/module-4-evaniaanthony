import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


interface PersonalFormData {
  fullName: string;
  email: string;
  dateOfBirth: string;
}

const PersonalInfoForm = ({ onNext, onChange, data }: any) => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    dateOfBirth: Yup.string().required('Date of Birth is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<PersonalFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: PersonalFormData) => {
    onChange(formData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <input
        {...register('fullName')}
        placeholder="Full Name"
        className={`input ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}

      <input
        {...register('email')}
        placeholder="Email"
        className={`input ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        {...register('dateOfBirth')}
        type="date"
        className={`input ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}

      <button type="submit" className="btn-primary">Next</button>
    </form>
  );
};

export default PersonalInfoForm;
