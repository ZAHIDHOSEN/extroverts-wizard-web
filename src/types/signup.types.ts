export interface SignupFormData {
  // Phone/Email
  email: string;
  phone: string;

  // OTP
  otp: string;
  isOtpVerified: boolean;

  //  Profile Details
  name: string;
  age: string;
  pronouns: string;

  interests: string[];
  city: string;
}

export interface SignupState {
  currentStep: number;
  formData: SignupFormData;
  loading: boolean;
  error: string | null;
  isSignupComplete: boolean;
}