import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = (orderBy = 'CREATED_AT', orderDirection = 'DESC') => {
  const variables = { orderBy, orderDirection };

  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  return { repositories: data ? data.repositories : undefined, loading, error };
};

export default useRepositories;