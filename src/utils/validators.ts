

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return 'Email is required';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) return 'Enter a valid email address';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return 'Phone number is required';
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length !== 10) return 'Enter a valid 10-digit phone number';
  return null;
};

export const validateOtp = (otp: string): string | null => {
  if (!otp.trim()) return 'OTP is required';
  if (!/^\d{6}$/.test(otp)) return 'OTP must be 6 digits';
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  if (name.trim().length > 50) return 'Name must be under 50 characters';
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) return 'Name can only contain letters';
  return null;
};

export const validateAge = (age: string): string | null => {
  if (!age.trim()) return 'Age is required';
  const numAge = Number(age);
  if (isNaN(numAge)) return 'Age must be a number';
  if (numAge < 18) return 'You must be 18 or older to sign up';
  if (numAge > 100) return 'Enter a valid age';
  return null;
};

export const validatePronouns = (pronouns: string): string | null => {
  if (!pronouns.trim()) return 'Please select your pronouns';
  return null;
};

export const validateCity = (city: string): string | null => {
  if (!city.trim()) return 'Please select your city';
  return null;
};