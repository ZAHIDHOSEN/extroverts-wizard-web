import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { nextStep, prevStep, setLoading, setOtpVerified } from '../../store/signupSlice';
import { mockVerifyOtp, mockSendOtp } from '../../utils/mockApi';
import Button from '../ui/Button';

export default function OtpVerify() {
  const dispatch = useAppDispatch();
  const { formData, loading } = useAppSelector((state) => state.signup);

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setLocalError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // numeric-only
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setLocalError(null);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setLocalError('Please enter the complete 6-digit OTP');
      return;
    }

    dispatch(setLoading(true));
    const result = await mockVerifyOtp(otpString);
    dispatch(setLoading(false));

    if (!result.success) {
      setLocalError(result.message);
      return;
    }

    dispatch(setOtpVerified(true));
    dispatch(nextStep());
  };

  const handleResend = async () => {
    setResending(true);
    await mockSendOtp(formData.email);
    setResending(false);
    setResendTimer(30);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="flex flex-col gap-5">
      <button onClick={() => dispatch(prevStep())} className="w-fit text-sm text-gray-400">
        ← Back
      </button>

      <div>
        <h2 className="text-2xl font-bold text-white">Verify your email</h2>
        <p className="mt-1 text-sm text-gray-400">
          We sent a 6-digit code to <span className="text-white">{formData.email}</span>
        </p>
      </div>

      <div className="flex justify-between gap-2">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`h-14 w-12 rounded-xl border bg-white/5 text-center text-xl font-semibold text-white outline-none focus:border-purple-500 ${
              error ? 'border-red-500' : 'border-white/10'
            }`}
          />
        ))}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button variant="primary" fullWidth isLoading={loading} onClick={handleVerify}>
        Verify OTP
      </Button>

      <div className="text-center text-sm text-gray-400">
        {resendTimer > 0 ? (
          <span>Resend code in {resendTimer}s</span>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-purple-400 hover:underline disabled:opacity-50"
          >
            {resending ? 'Sending...' : 'Resend OTP'}
          </button>
        )}
      </div>

      {/* Dev hint - remove before final submission if you want, or keep for demo recording */}
      <p className="text-center text-xs text-gray-600">Demo hint: use 123456</p>
    </div>
  );
}