const validate = values => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    confirmPassword
  } = values;
  const errors = {};

  if (!firstName) {
    errors.firstName = 'First name is required';
  } else if (firstName.length < 2) {
    errors.firstName = 'First name is too short';
  }

  if (!lastName) {
    errors.lastName = 'Last name is required';
  } else if (lastName.length < 2) {
    errors.lastName = 'Last name is too short';
  }

  if (!username) {
    errors.username = 'Username is required';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password needs to be at least 6 characters long';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm password';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords don't match";
  }

  return errors;
};

export default validate;
