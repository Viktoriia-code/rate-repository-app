import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { Link, useNavigate } from 'react-router-native';
import theme from '../theme';
import { useApolloClient } from '@apollo/client';
import useMe from '../hooks/useMe';
import useAuthStorage from '../hooks/useAuthStorage';

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
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const { me } = useMe();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
    navigate('/signIn');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <Link to="/" style={styles.tab}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        
        {
          me && me.username ? (
            <Pressable onPress={handleSignOut}>
              <Text style={styles.text}>Sign out</Text>
            </Pressable>
          ) : (
            <Link to="/signin" style={styles.tab}>
              <Text style={styles.text}>Sign in</Text>
            </Link>
          )
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;