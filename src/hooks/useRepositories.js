import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = (first = 8, orderBy = 'CREATED_AT', orderDirection = 'DESC', searchKeyword) => {
  const variables = { first, orderBy, orderDirection, searchKeyword };

  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { repositories: data ? data.repositories : undefined, loading, error, fetchMore: handleFetchMore };
};

export default useRepositories;