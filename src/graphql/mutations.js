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