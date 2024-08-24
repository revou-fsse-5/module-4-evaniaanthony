import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import AddressInfoForm from './AddressInfoForm';
import AccountInfoForm from './AccountInfoForm';


const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    username: '',
    password: '',
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleFormDataChange = (newData: any) => {
    setFormData({ ...formData, ...newData });
  };

  return (
    <div className="w-full">
      {step === 1 && <PersonalInfoForm onNext={handleNextStep} onChange={handleFormDataChange} data={formData} />}
      {step === 2 && <AddressInfoForm onNext={handleNextStep} onPrev={handlePrevStep} onChange={handleFormDataChange} data={formData} />}
      {step === 3 && <AccountInfoForm onPrev={handlePrevStep} onChange={handleFormDataChange} data={formData} />}
    </div>
  );
};

export default MultiStepForm;
