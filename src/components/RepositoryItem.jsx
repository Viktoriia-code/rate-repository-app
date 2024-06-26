import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from './Text';
import theme from '../theme';
import Button from './Button';
import * as Linking from 'expo-linking';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    display: 'flex',
    gap: 20,
  },
  tinyLogo: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  flexItemA: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  flexItemB: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
  },
  title: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.heading,
    marginBottom: 5,
  },
  text: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    marginBottom: 10,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
    color: theme.colors.white,
    borderRadius: theme.roundness,
    fontSize: theme.fontSizes.subheading,
  },
  flexDescA: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  flexDescB: {
    display: 'flex',
    alignItems: 'center',
  },
});

const RepositoryItem = ({ item }) => {
  const navigate = useNavigate();
  
  return (
    <Pressable onPress={() => navigate(`/${item.id}`)} style={styles.container} testID="repositoryItem">
      <View style={styles.flexItemA}>
        <Image
          style={styles.tinyLogo}
          source={{uri: item.ownerAvatarUrl}}
        />
        <View style={styles.flexItemB}>
          <Text style={styles.title}>{item.fullName}</Text>
          <Text style={styles.text}>{item.description}</Text>
          <Text style={styles.badge}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.flexDescA}>
        <View style={styles.flexDescB}>
          <Text style={styles.title}>{item.stargazersCount >= 1000 ? (item.stargazersCount/1000).toFixed(1) + 'k' : item.stargazersCount}</Text>
          <Text style={styles.text}>Stars</Text>
        </View>
        <View style={styles.flexDescB}>
          <Text style={styles.title}>{item.forksCount >= 1000 ? (item.forksCount/1000).toFixed(1) + 'k' : item.forksCount}</Text>
          <Text style={styles.text}>Forks</Text>
        </View>
        <View style={styles.flexDescB}>
          <Text style={styles.title}>{item.reviewCount}</Text>
          <Text style={styles.text}>Reviews</Text>
        </View>
        <View style={styles.flexDescB}>
          <Text style={styles.title}>{item.ratingAverage}</Text>
          <Text style={styles.text}>Rating</Text>
        </View>
      </View>
      {item.url &&
        <Button onPress={()=> Linking.openURL(item.url)}>Open in GitHub</Button>
      }
    </Pressable>
  );
}

export default RepositoryItem;