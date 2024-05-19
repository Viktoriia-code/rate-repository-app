import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bgSecondary,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.white,
  },
});

const AppBar = () => {
  return <View style={styles.container}>
    <Link to="/" style={styles.tab}>
      <Text style={styles.text}>Repositories</Text>
    </Link>
    <Link to="/signin" style={styles.tab}>
      <Text style={styles.text}>Sign in</Text>
    </Link>
  </View>;
};

export default AppBar;