// String and formatting utilities
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Email validation
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Phone validation
export const isValidPhone = (phone) => {
  const regex = /^[\d\s\-\+\(\)]{10,}$/;
  return regex.test(phone);
};

// Generic formatting utilities
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};
