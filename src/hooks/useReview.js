import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';

const useReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ username, repository, rating, review }) => {
    await mutate({ variables: { username, repository, rating, review } });
    apolloClient.resetStore();
  };

  return [ createReview, result ];
};

export default useReview;