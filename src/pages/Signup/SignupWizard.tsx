
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setError } from '../../store/signupSlice';
import WizardProgress from '../../components/wizard/WizardProgress';
import Toast from '../../components/ui/Toast';
import Step1_EmailPhone from '../../components/wizard/Step1_EmailPhone';
import SuccessScreen from '../../components/wizard/SuccessScreen';
import OtpVerify from '../../components/wizard/Otpverify';
import Preferences from '../../components/wizard/Preferences';
import ProfileDetails from '../../components/wizard/ProfileDetails';

export default function SignupWizard() {
  const dispatch = useAppDispatch();
  const { currentStep, error, isSignupComplete } = useAppSelector((state) => state.signup);

  const renderStep = () => {
    if (isSignupComplete) return <SuccessScreen />;

    switch (currentStep) {
      case 1: return <Step1_EmailPhone />;
      case 2: return <OtpVerify></OtpVerify>
      case 3: return <ProfileDetails></ProfileDetails>
      case 4: return <Preferences></Preferences>
      default: return <Step1_EmailPhone />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-6 py-10">
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />

      {error && <Toast message={error} type="error" onClose={() => dispatch(setError(null))} />}

      <div className="relative z-10 mx-auto max-w-md">
        {!isSignupComplete && <WizardProgress currentStep={currentStep} totalSteps={4} />}
        {renderStep()}
      </div>
    </div>
  );
}
