import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useMe = (includeReviews = false) => {
  const variables = { includeReviews };
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return (
    { me: data ? data.me : null, loading, error }
  )
};

export default useMe;