import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


interface AddressFormData {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

const AddressInfoForm = ({ onNext, onPrev, onChange, data }: any) => {
  const validationSchema = Yup.object().shape({
    streetAddress: Yup.string().required('Street Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string()
      .required('Zip Code is required')
      .matches(/^\d{5}(-\d{4})?$/, 'Zip Code is invalid'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: AddressFormData) => {
    onChange(formData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <input
        {...register('streetAddress')}
        placeholder="Street Address"
        className={`input ${errors.streetAddress ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.streetAddress && <p className="text-red-500">{errors.streetAddress.message}</p>}

      <input
        {...register('city')}
        placeholder="City"
        className={`input ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.city && <p className="text-red-500">{errors.city.message}</p>}

      <input
        {...register('state')}
        placeholder="State"
        className={`input ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.state && <p className="text-red-500">{errors.state.message}</p>}

      <input
        {...register('zipCode')}
        placeholder="Zip Code"
        className={`input ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.zipCode && <p className="text-red-500">{errors.zipCode.message}</p>}

      <div className="flex justify-between">
        <button type="button" onClick={onPrev} className="btn-secondary">
          Previous
        </button>
        <button type="submit" className="btn-primary">
          Next
        </button>
      </div>
    </form>
  );
};

export default AddressInfoForm;
