// Simulates network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fake existing emails 
const EXISTING_EMAILS = ['test@example.com', 'admin@extroverts.app'];

export const mockSendOtp = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  await delay(1500);

  if (EXISTING_EMAILS.includes(email.toLowerCase())) {
    return { success: false, message: 'An account with this email already exists' };
  }

  // Simulate occasional network failur
  if (Math.random() < 0.1) {
    return { success: false, message: 'Network error. Please try again.' };
  }

  return { success: true, message: 'OTP sent successfully' };
};

export const mockVerifyOtp = async (
  otp: string
): Promise<{ success: boolean; message: string }> => {
  await delay(1200);

  // Mock correct OTP is always "123456" 
  if (otp !== '123456') {
    return { success: false, message: 'Invalid OTP. Please try again.' };
  }

  return { success: true, message: 'OTP verified successfully' };
};

export const mockCompleteSignup = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  await delay(1800);
  return { success: true, message: 'Profile created successfully!' };
};

export const CITIES_BY_STATE: Record<string, string[]> = {
  Delhi: ['New Delhi', 'Dwarka', 'Rohini'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
  Karnataka: ['Bangalore', 'Mysore', 'Hubli'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur'],
};

export const STATES = Object.keys(CITIES_BY_STATE);