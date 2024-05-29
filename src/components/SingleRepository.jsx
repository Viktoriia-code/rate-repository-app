import React from 'react';
import { FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import * as Linking from 'expo-linking';

const SingleRepository = () => {
  const { repository } = useRepository();

  console.log(repository);

  return (
    <FlatList
      data={repository}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      //ListHeaderComponent={() => <RepositoryItem item={data} />}
    />
  );
};

export default SingleRepository;