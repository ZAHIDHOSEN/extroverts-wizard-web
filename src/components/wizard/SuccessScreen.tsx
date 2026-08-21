import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetSignup } from '../../store/signupSlice';
import Button from '../ui/Button';

export default function SuccessScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { formData } = useAppSelector((state) => state.signup);

  const handleDone = () => {
    dispatch(resetSignup());
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-600/20">
        <span className="text-4xl">🎉</span>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white">Welcome, {formData.name}!</h2>
        <p className="mt-2 text-sm text-gray-400">
          Your profile is ready. Time to find your next party.
        </p>
      </div>

      <Button variant="primary" fullWidth onClick={handleDone} className="mt-2">
        Start Exploring
      </Button>
    </div>
  );
}