import { Image, StyleSheet, View } from "react-native";
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 20,
    display: 'flex',
    gap: 20,
  },
  tinyLogo: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  flexItemA: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  flexItemB: {
    display: 'flex',
    gap: 10,
    flex: 1,
  },
  title: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.heading,
    lineHeight: 18,
  },
  text: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    alignSelf: 'flex-start',
    color: theme.colors.white,
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
  },
  flexDescA: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-around'
  },
  flexDescB: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  }
});

const RepositoryItem = ({item}) => (
  <View style={styles.container}>
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
  </View>
);

export default RepositoryItem;