import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SignupState, SignupFormData } from '../types/signup.types';

const initialState: SignupState = {
  currentStep: 1,
  formData: {
    email: '',
    phone: '',
    otp: '',
    isOtpVerified: false,
    name: '',
    age: '',
    pronouns: '',
    interests: [],
    city: '',
  },
  loading: false,
  error: null,
  isSignupComplete: false,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<SignupFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    nextStep: (state) => {
      if (state.currentStep < 4) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    goToStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setOtpVerified: (state, action: PayloadAction<boolean>) => {
      state.formData.isOtpVerified = action.payload;
    },
    setSignupComplete: (state, action: PayloadAction<boolean>) => {
      state.isSignupComplete = action.payload;
    },
    resetSignup: () => initialState,
  },
});

export const {
  updateFormData,
  nextStep,
  prevStep,
  goToStep,
  setLoading,
  setError,
  setOtpVerified,
  setSignupComplete,
  resetSignup,
} = signupSlice.actions;

export default signupSlice.reducer;