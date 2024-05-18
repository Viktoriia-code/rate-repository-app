import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: theme.colors.bgSecondary,
    padding: 20,
  },
  text: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.white,
  },
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable>
      <Text style={styles.text}>Repositories</Text>
    </Pressable>
  </View>;
};

export default AppBar;