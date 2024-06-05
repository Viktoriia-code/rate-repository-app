import { useState, useEffect } from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (first=3) => {
  const id = useParams().id;
  const variables = { repositoryId: id, first: first }
  const [reviews, setReviews] = useState();
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const fetchReviews = async () => {
    if (data) {
      setReviews(data.repository.reviews);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [data]);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { reviews, error, loading, refetch: fetchReviews, fetchMore: handleFetchMore };
};

export default useReviews;