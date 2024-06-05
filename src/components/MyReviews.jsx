import { FlatList, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import useMe from "../hooks/useMe";
import ReviewItem from './ReviewItem';
import ItemSeparator from "./ItemSeparator";

const styles = StyleSheet.create({
  container:  {
    backgroundColor: theme.colors.white,
    padding: 15,
  }
});

const MyReviews = () => {
  const { me, loading, error } = useMe(true);
  
  const reviewNodes = me?.reviews?.edges?.map(edge => edge.node);

  if(loading) {
    return (
      <View style={styles.container}>
        <Text fontSize='subheading' fontWeight='bold'>Loading...</Text>
      </View>
    );
  }

  if(error) {
    return (
      <View style={styles.container}> 
        <Text fontSize='subheading' fontWeight='bold'>Error: {error.toString()}.</Text>
      </View>
    );
  }

  if(reviewNodes.length === 0) {
    return(
      <View style={styles.container}>
        <Text fontSize="subheading" fontWeight="bold">No reviews yet!</Text>
      </View>
    );
  }
  return(
    <FlatList
      data={reviewNodes}
      keyExtractor={({ id }) => id}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <ReviewItem review={item} isMyItem />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;