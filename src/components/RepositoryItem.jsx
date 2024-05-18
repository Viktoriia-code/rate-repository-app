import { Image, StyleSheet, Text, View } from "react-native";

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 20,
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
    gap: 5,
  },
  title: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  text: {
    color: theme.colors.textSecondary,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    alignSelf: 'flex-start',
    color: theme.colors.white,
    borderRadius: 5,
  },
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
    <View style={styles.flexItemA}>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  </View>
);

export default RepositoryItem;