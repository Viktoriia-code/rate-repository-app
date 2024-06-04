import { FlatList, StyleSheet, View } from "react-native";
import useReviews from "../hooks/useReviews";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container:  {
    backgroundColor: theme.colors.white,
    padding: 15,
  }
});

const MyReviews = () => {
  const { reviews, error, loading } = useReviews();
  console.log(reviews);

  const reviewNodes = reviews ? reviews : [];


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
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={reviewNodes}
        keyExtractor={({ id }) => id}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <ReviewListItem item={item} onDelete={onDelete} isMyItem/>}
      />
    </View>
  );
};

export default MyReviews;