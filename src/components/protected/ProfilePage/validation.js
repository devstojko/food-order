const validate = values => {
  const { passwordOne, passwordTwo } = values;
  const errors = {};

  if (!passwordOne) {
    errors.passwordOne = "Password field can't be empty";
  } else if (passwordOne.length < 6) {
    errors.passwordOne = 'Password needs to be at least 6 characters long';
  }

  if (!passwordTwo) {
    errors.passwordTwo = 'Please confirm password';
  } else if (passwordTwo !== passwordOne) {
    errors.passwordTwo = "Passwords don't match";
  }

  return errors;
};

export default validate;
