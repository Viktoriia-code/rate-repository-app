import React from 'react';
import { FlatList, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from "react-native-paper";
import theme from '../theme';
import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  placeholder: {
    color: theme.colors.textPlaceholder,
  },
  itemStyle: {
    color: theme.colors.textPrimary,
  },
  search: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.roundness,
    margin: 15,
  }
});

const RepositoryListHeader = ({ 
  onSortMethod, 
  sortMethod, 
  onSearchKeyword, 
  searchKeyword
  }) => {

  return (
    <>
      <Searchbar
        placeholder='Search'
        onChangeText={onSearchKeyword}
        value={searchKeyword}
        style={styles.search}
      />
      <Picker
        selectedValue={sortMethod}
        onValueChange={onSortMethod}
      >
        <Picker.Item label="Select an item..." value="" enabled={false} style={styles.placeholder} />
        <Picker.Item label="Latest repositories" value="latest" style={styles.itemStyle} />
        <Picker.Item label="Highest rated repositories" value="highest" style={styles.itemStyle} />
        <Picker.Item label="Lowest rated repositories" value="lowest" style={styles.itemStyle} />
      </Picker>
    </>
  );
};

class RepositoryListContainer extends React.Component { 
  constructor() {
    super();
    this.repositoryNodes = this.repositoryNodes.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }
  
  renderHeader = () => <RepositoryListHeader 
    onSortMethod={(value) => this.props.onSortMethod(value)}
    sortMethod={this.props.sortMethod}   
    onSearchKeyword={(value) => this.props.onSearchKeyword(value)}
    searchKeyword={this.props.searchKeyword}
  />;
    
  renderItem = ({item}) => <RepositoryItem item={item} />;

  itemSeparator = () => <ItemSeparator />;

  repositoryNodes = () => this.props.repositories 
    ? this.props.repositories.edges.map(edge => edge.node)
    : [];

  render(){
    return (
      <FlatList
        style={styles.container}
        data={this.repositoryNodes()}
        keyExtractor={this.keyExtractor}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.itemSeparator}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

export default RepositoryListContainer;