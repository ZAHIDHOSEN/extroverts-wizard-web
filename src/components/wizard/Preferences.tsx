import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateFormData, prevStep, setLoading, setSignupComplete, setError } from '../../store/signupSlice';
import { validateCity } from '../../utils/validators';
import { mockCompleteSignup, STATES, CITIES_BY_STATE } from '../../utils/mockApi';
import Button from '../ui/Button';

const INTEREST_OPTIONS = ['Music', 'Dance', 'Gaming', 'Food', 'Movies', 'Sports', 'Art', 'Travel'];

export default function Preferences() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.signup);

  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ city?: string; interests?: string }>({});

  const availableCities = selectedState ? CITIES_BY_STATE[selectedState] : [];

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setCity(''); // reset city when state changes 
    setErrors((p) => ({ ...p, city: undefined }));
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
    setErrors((p) => ({ ...p, interests: undefined }));
  };

  const handleFinish = async () => {
    const cityError = validateCity(city);
    const interestsError = interests.length === 0 ? 'Select at least one interest' : null;

    if (cityError || interestsError) {
      setErrors({ city: cityError || undefined, interests: interestsError || undefined });
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    const result = await mockCompleteSignup();

    dispatch(setLoading(false));

    if (!result.success) {
      dispatch(setError(result.message));
      return;
    }

    dispatch(updateFormData({ city, interests }));
    dispatch(setSignupComplete(true));
  };

  return (
    <div className="flex flex-col gap-5">
      <button onClick={() => dispatch(prevStep())} className="w-fit text-sm text-gray-400">
        ← Back
      </button>

      <div>
        <h2 className="text-2xl font-bold text-white">Almost there</h2>
        <p className="mt-1 text-sm text-gray-400">Pick your city and interests</p>
      </div>

      {/* State select */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">State</label>
        <select
          value={selectedState}
          onChange={(e) => handleStateChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-500"
        >
          <option value="" className="bg-black">Select a state</option>
          {STATES.map((state) => (
            <option key={state} value={state} className="bg-black">{state}</option>
          ))}
        </select>
      </div>

      {/* City select - depends on state */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">City</label>
        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setErrors((p) => ({ ...p, city: undefined }));
          }}
          disabled={!selectedState}
          className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-500 disabled:opacity-40 ${
            errors.city ? 'border-red-500' : 'border-white/10'
          }`}
        >
          <option value="" className="bg-black">
            {selectedState ? 'Select a city' : 'Select a state first'}
          </option>
          {availableCities.map((c) => (
            <option key={c} value={c} className="bg-black">{c}</option>
          ))}
        </select>
        {errors.city && <p className="mt-1.5 text-sm text-red-400">{errors.city}</p>}
      </div>

      {/* Interests */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">
          Interests <span className="text-gray-500">(select at least one)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                interests.includes(interest)
                  ? 'border-purple-500 bg-purple-600/20 text-white'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
        {errors.interests && <p className="mt-1.5 text-sm text-red-400">{errors.interests}</p>}
      </div>

      <Button variant="primary" fullWidth isLoading={loading} onClick={handleFinish} className="mt-2">
        Complete Signup
      </Button>
    </div>
  );
}