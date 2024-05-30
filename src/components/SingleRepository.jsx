import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';

const SingleRepository = () => {
  const { repository, loading, error } = useRepository();

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!repository) {
    return <Text>Repository not found</Text>;
  }

  return (
    <RepositoryItem item={repository} />
  );
};

export default SingleRepository;