import React from 'react';
import FormikTextInput from './FormikTextInput';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Button from './Button';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import { useState } from 'react';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';
import * as yup from 'yup';
import Notify from './Notify';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    display: 'flex',
    gap: 15,
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const SignupSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const client = useApolloClient();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (values) => {
    const { username, password } = values;
    
    try {
      const { userId } = await createUser({ username, password });
      if (userId) {
        await signIn({ username, password });
        client.resetStore();
        navigate('/');
      } else {
        //console.error("No userId is provided");
      }       
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={handleSubmit} 
      validationSchema={SignupSchema}
    >
      {({ handleSubmit, values, handleChange, errors, touched }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="username"
            value={values.username}
            onChangeText={handleChange('username')}
            placeholder="Username"
            error={touched.username && errors.username}
          />
          <FormikTextInput
            name="password"
            value={values.password}
            onChangeText={handleChange('password')}
            placeholder="Password"
            secureTextEntry
            error={touched.password && errors.password}
          />
          <FormikTextInput
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChangeText={handleChange('passwordConfirm')}
            placeholder="Confirm password"
            secureTextEntry
            error={touched.passwordConfirm && errors.passwordConfirm}
          />
          <Notify errorMessage={errorMessage} />
          <Button onPress={ handleSubmit }>Sign up</Button>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;