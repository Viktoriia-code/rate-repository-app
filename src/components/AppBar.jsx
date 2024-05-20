import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: theme.colors.bgSecondary,
    padding: 20,
  },
  scroll: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.white,
  },
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal contentContainerStyle={styles.scroll}>
      <Link to="/" style={styles.tab}>
        <Text style={styles.text}>Repositories</Text>
      </Link>
      <Link to="/signin" style={styles.tab}>
        <Text style={styles.text}>Sign in</Text>
      </Link>
    </ScrollView>
  </View>;
};

export default AppBar;