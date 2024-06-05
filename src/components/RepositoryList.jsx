import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import RepositoryListContainer from './RepositoryListContainer';


export const RepositoryList = () => {
  const [sortMethod, setSortMethod] = useState('latest');
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDir] = useState("DESC");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);
  const { repositories, fetchMore } = useRepositories(first = 8, orderBy, orderDirection, debouncedKeyword);

  const onSortMethod = (sortValue) => {
    switch( sortValue ) {
    case "latest":
      setOrderDir("DESC");
      setOrderBy("CREATED_AT");
      break;
    case "highest":
      setOrderDir("DESC");
      setOrderBy("RATING_AVERAGE");
      break;
    case "lowest":
      setOrderDir("ASC");
      setOrderBy("RATING_AVERAGE");
      break;
    default:
      //console.log("No such sorting value:", sortValue);
    } 

    setSortMethod(sortValue);
    //console.log("Repositories", repositories.edges.map(item => item.node.createdAt));
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  
  const onEndReached = () => {
    //console.log('You have reached the end of the list');
    fetchMore();
  };
  
  return (
    <RepositoryListContainer 
      repositories={repositories} 
      onSortMethod={onSortMethod}
      sortMethod={sortMethod}
      onSearchKeyword={setSearchKeyword}
      searchKeyword={searchKeyword}
      onEndReached={onEndReached} />
  );
};

export default RepositoryList;