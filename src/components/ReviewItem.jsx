import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import Button from './Button';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    display: 'flex',
    gap: 15,
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
  btnContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  customButton: {
    flex: 1
  }
});


const ReviewItem = ({ review, isMyItem, onDelete }) => {
  const navigate = useNavigate();
  const handlePress = () => {
    navigate(`/${review.repository.id}`);
  };

  const renderButtons = () => {
    if (isMyItem) {
      return (
        <View style={styles.btnContainer}>
          <Button style={styles.customButton} onPress={handlePress}>View repository</Button>
          <Button style={[styles.deleteButton, styles.customButton]} onPress={()=> onDelete(review.id)}>Delete review</Button>  
        </View>
      );
    }
  };
  
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
      {renderButtons()}
    </View>
  );
};

export default ReviewItem;