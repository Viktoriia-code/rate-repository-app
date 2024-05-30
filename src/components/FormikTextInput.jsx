import { StyleSheet, View } from 'react-native';
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
    <View>
      <TextInput
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
export default FormikTextInput;