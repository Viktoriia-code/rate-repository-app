import { StyleSheet, View } from 'react-native';
import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
  errorInput: {
    borderColor: theme.colors.error,
  }
});

const FormikTextInput = ({ style, error, ...props }) => {
  const inputStyle = [
    style,
    error && styles.errorInput
  ];

  return (
    <View>
      <TextInput
        style={inputStyle}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
export default FormikTextInput;