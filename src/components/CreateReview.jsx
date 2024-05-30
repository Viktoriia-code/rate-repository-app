import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import useReview from '../hooks/useReview';
import { useNavigate } from 'react-router-native';
import Button from './Button';
import { View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    display: 'flex',
    gap: 15,
  }
});

const initialValues = {
  ownerName: '',
  repository: '',
  rating: '',
  review: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner is required'),
  repository: yup.string().required('Repository name is required'),
  rating: yup.number()
    .integer('Rating must be an integer')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating cannot exceed 100')
    .required('Rating is required'),
  review: yup.string().max(2000),
});

export const ReviewForm = ({ onSubmit }) => {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
      <View style={styles.container}>
        <FormikTextInput 
          name="ownerName"
          placeholder="Repository owner name"
          value={values.ownerName}
          onChangeText={handleChange('ownerName')}
          error={errors.ownerName}
        />
        <FormikTextInput 
          name="repository" 
          placeholder="Repository name" 
          value={values.repository}
          onChangeText={handleChange('repository')}
          error={errors.repository}
        />
        <FormikTextInput 
          name="rating" 
          placeholder="Rating between 0 and 100" 
          keyboardType="numeric"
          value={values.rating}
          onChangeText={handleChange('rating')}
          error={errors.rating}
        />
        <FormikTextInput 
          name="review" 
          placeholder="Review" 
          multiline
          value={values.review}
          onChangeText={handleChange('review')}
          error={errors.review}
        />
        <Button onPress={handleSubmit}>Create a review</Button>
      </View>
    )}


    </Formik>)
};

const Review = () => {
  const [ createReview, result ] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repository, rating, review } = values;

    try {
      await createReview({ ownerName, repository, rating, review });
      console.log(result);
      //navigate(`/${repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ReviewForm onSubmit={onSubmit} />
  );
};
 
export default Review;