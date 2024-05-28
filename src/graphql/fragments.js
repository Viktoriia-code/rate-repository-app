import { gql } from "@apollo/client";

export const CORE_REPOSITORY_FIELDS = gql`
  fragment CoreRepositoryFields on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;

export const USER_FRAGMENT = gql`
  fragment userFragment on User {
    id
    username
    createdAt
  }
`;