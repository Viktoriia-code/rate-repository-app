import React from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import useReviews from '../hooks/useReviews';
import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeparator';

const RepositoryInfo = ({ repository }) => {
  return (
    <>
      <RepositoryItem item={repository} />
      <ItemSeparator />
    </>
  );
};

const SingleRepository = () => {
  const { repository, loading, error } = useRepository();

  const { reviews, fetchMore } = useReviews(first = 3);
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!repository) {
    return <Text>Repository not found</Text>;
  }

  const onEndReached = () => {
    //console.log('You have reached the end of the list');
    fetchMore();
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;