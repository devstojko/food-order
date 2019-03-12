const validate = values => {
  const { firstName, lastName, username } = values;
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

  return errors;
};

export default validate;
