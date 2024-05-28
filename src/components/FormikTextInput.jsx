import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
});

const FormikTextInput = ({ style, error, ...props }) => {

  return (
    <>
      <TextInput
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};
export default FormikTextInput;