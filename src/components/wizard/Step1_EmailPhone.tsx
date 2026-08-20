import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateFormData, nextStep, setLoading, setError } from '../../store/signupSlice';
import { validateEmail, validatePhone } from '../../utils/validators';
import { mockSendOtp } from '../../utils/mockApi';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function Step1_EmailPhone() {
  const dispatch = useAppDispatch();
  const { formData, loading } = useAppSelector((state) => state.signup);

  const [email, setEmail] = useState(formData.email);
  const [phone, setPhone] = useState(formData.phone);
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const handleEmailBlur = () => {
    const error = validateEmail(email);
    setErrors((prev) => ({ ...prev, email: error || undefined }));
  };

  const handlePhoneChange = (value: string) => {
    // numeric-only input constraint
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
    setPhone(digitsOnly);
  };

  const handlePhoneBlur = () => {
    const error = validatePhone(phone);
    setErrors((prev) => ({ ...prev, phone: error || undefined }));
  };

  const handleContinue = async () => {
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);

    if (emailError || phoneError) {
      setErrors({ email: emailError || undefined, phone: phoneError || undefined });
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    const result = await mockSendOtp(email);

    dispatch(setLoading(false));

    if (!result.success) {
      dispatch(setError(result.message));
      return;
    }

    dispatch(updateFormData({ email: email.trim(), phone }));
    dispatch(nextStep());
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-bold text-white">Let's get started</h2>
        <p className="mt-1 text-sm text-gray-400">
          Enter your email and phone number to continue
        </p>
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleEmailBlur}
        error={errors.email}
        maxLength={100}
      />

      <Input
        label="Phone Number"
        type="tel"
        inputMode="numeric"
        placeholder="9876543210"
        value={phone}
        onChange={(e) => handlePhoneChange(e.target.value)}
        onBlur={handlePhoneBlur}
        error={errors.phone}
        maxLength={10}
      />

      <Button
        variant="primary"
        fullWidth
        isLoading={loading}
        onClick={handleContinue}
        className="mt-2"
      >
        Continue
      </Button>
    </div>
  );
}