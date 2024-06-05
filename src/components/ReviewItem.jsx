import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  reviewContainer: {
    flexDirection: 'row',
  },
  rateContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: theme.colors.primary,
    borderStyle: 'solid',
    borderWidth: 2,
    marginRight: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    display: 'flex',
    flexShrink: 1,
    alignItems: 'flex-start'
  },
});


const ReviewItem = ({ review, isMyItem }) => {
  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.rateContainer}>
          <Text fontWeight="bold" color="primary">{review.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
          {isMyItem ? 
          <Text fontWeight="bold" fontSize="subheading">{review.repository.fullName}</Text>
          :
          <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
          }
          <Text color="textSecondary">{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;