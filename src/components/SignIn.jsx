import { StyleSheet, View } from 'react-native';
import Button from './Button';
import FormikTextInput from './FormikTextInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import theme from '../theme';
import Notify from './Notify';
import { useState } from 'react';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    display: 'flex',
    gap: 15,
  }
});

export const SignInForm = ({ onSubmit, errorMessage }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.container}>
      <View>
        <FormikTextInput 
          name="username" 
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          error={formik.touched.username && formik.errors.username}
        />
      </View>
      <View>
        <FormikTextInput
          name="password"
          placeholder="Password"
          error={formik.touched.password && formik.errors.password}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry
        />
      </View>
      <Notify errorMessage={errorMessage} />
      <Button 
        onPress={(signin) => {
          !(formik.errors.username || formik.errors.password) &&
            formik.handleSubmit(signin);
        }} 
        testID="SignInBtn">Sign in</Button>
    </View>
  );
};

export const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      navigate('/', { replace: true });
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <SignInForm onSubmit={onSubmit} errorMessage={errorMessage} />
  );
};

export default SignIn;