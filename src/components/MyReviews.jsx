import { FlatList, StyleSheet, View, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import useMe from "../hooks/useMe";
import ReviewItem from './ReviewItem';
import ItemSeparator from "./ItemSeparator";
import useDeleteReview from '../hooks/useDeleteReview';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container:  {
    backgroundColor: theme.colors.white,
    padding: 15,
  }
});

const MyReviews = () => {
  const { me, loading, error, refetch } = useMe(true);
  const [deleteReview] = useDeleteReview();
  const client = useApolloClient();
  
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

  const onDelete = async (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { deleteReview: success } = await deleteReview(id);
        
              if (success) {
                client.cache.evict({ id: `Review:${id}` });
                client.cache.gc();
                await refetch();
              } else {
                console.error("Failed to delete review");
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      ]
    )
  };

  return(
    <FlatList
      data={reviewNodes}
      keyExtractor={({ id }) => id}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <ReviewItem review={item} onDelete={onDelete} isMyItem />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;