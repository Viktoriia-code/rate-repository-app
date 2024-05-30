import { gql } from '@apollo/client';
import { USER_FRAGMENT } from './fragments';

export const SIGN_IN = gql`
  mutation authorize($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        ...userFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const CREATE_REVIEW = gql`
  mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
    createReview(review: { repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text }) {
      repositoryId
    }
  }
`;