import { FlatList, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import ItemSeparator from './ItemSeparator';


export const RepositoryList = () => {
  const [sortMethod, setSortMethod] = useState();
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDir] = useState("DESC");
  const { repositories } = useRepositories(orderBy, orderDirection);
  const navigate = useNavigate();

  //console.log('orderBy:' + orderBy);
  //console.log('orderDirection:' + orderDirection);

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
  
  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigate(`/${item.id}`)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };
  
  return (
    <FlatList
      data={repositoryNodes}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <Filter
          onSortMethod={(value) => onSortMethod(value)}
          sortMethod={sortMethod}
        />
      }
    />
  );
};

const Filter = ({ onSortMethod, sortMethod }) => {
  return (
    <Picker
      selectedValue={sortMethod}
      onValueChange={onSortMethod}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

export default RepositoryList;