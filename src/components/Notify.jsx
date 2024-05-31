import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <Text style={styles.errorText}>{errorMessage}</Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Notify;