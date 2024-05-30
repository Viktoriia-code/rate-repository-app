import { useState, useEffect } from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = () => {
  const id = useParams().id;
  const [reviews, setReviews] = useState();
  const reviewsResult = useQuery(GET_REVIEWS, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });

  const fetchReviews = async () => {
    if (reviewsResult.data) {
      setReviews(reviewsResult.data.repository.reviews);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [reviewsResult]);

  return { reviews, loading: reviewsResult.loading, refetch: fetchReviews };
};

export default useReviews;