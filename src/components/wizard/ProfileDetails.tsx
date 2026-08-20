import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateFormData, nextStep, prevStep } from '../../store/signupSlice';
import { validateName, validateAge, validatePronouns } from '../../utils/validators';
import Input from '../ui/Input';
import Button from '../ui/Button';

const PRONOUN_OPTIONS = ['He/Him', 'She/Her', 'They/Them', 'Prefer not to say'];

export default function ProfileDetails() {
  const dispatch = useAppDispatch();
  const { formData } = useAppSelector((state) => state.signup);

  const [name, setName] = useState(formData.name);
  const [age, setAge] = useState(formData.age);
  const [pronouns, setPronouns] = useState(formData.pronouns);
  const [errors, setErrors] = useState<{ name?: string; age?: string; pronouns?: string }>({});

  const handleAgeChange = (value: string) => {
    // numeric-only, max 3 digits
    const digitsOnly = value.replace(/\D/g, '').slice(0, 3);
    setAge(digitsOnly);
  };

  const handleContinue = () => {
    const nameError = validateName(name);
    const ageError = validateAge(age);
    const pronounsError = validatePronouns(pronouns);

    if (nameError || ageError || pronounsError) {
      setErrors({
        name: nameError || undefined,
        age: ageError || undefined,
        pronouns: pronounsError || undefined,
      });
      return;
    }

    dispatch(updateFormData({ name: name.trim(), age, pronouns }));
    dispatch(nextStep());
  };

  return (
    <div className="flex flex-col gap-5">
      <button onClick={() => dispatch(prevStep())} className="w-fit text-sm text-gray-400">
        ← Back
      </button>

      <div>
        <h2 className="text-2xl font-bold text-white">Tell us about you</h2>
        <p className="mt-1 text-sm text-gray-400">Let's set up your profile</p>
      </div>

      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => setErrors((p) => ({ ...p, name: validateName(name) || undefined }))}
        error={errors.name}
        maxLength={50}
      />

      <Input
        label="Age"
        type="text"
        inputMode="numeric"
        placeholder="21"
        value={age}
        onChange={(e) => handleAgeChange(e.target.value)}
        onBlur={() => setErrors((p) => ({ ...p, age: validateAge(age) || undefined }))}
        error={errors.age}
        maxLength={3}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Pronouns</label>
        <div className="grid grid-cols-2 gap-2">
          {PRONOUN_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setPronouns(option);
                setErrors((p) => ({ ...p, pronouns: undefined }));
              }}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                pronouns === option
                  ? 'border-purple-500 bg-purple-600/20 text-white'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.pronouns && <p className="mt-1.5 text-sm text-red-400">{errors.pronouns}</p>}
      </div>

      <Button variant="primary" fullWidth onClick={handleContinue} className="mt-2">
        Continue
      </Button>
    </div>
  );
}