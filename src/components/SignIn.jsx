import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const onSubmit = (values) => {
  console.log(values);
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 20,
    padding: 20,
    backgroundColor: theme.colors.white,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.bgMain,
    fontSize: theme.fontSizes.subheading,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    color: theme.colors.white,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    textAlign: 'center',
  }
});

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={styles.input}
        secureTextEntry
      />
      <Pressable 
        onPress={formik.handleSubmit} 
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;