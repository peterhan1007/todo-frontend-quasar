import gql from 'graphql-tag';

export const CREATE_USER_MUTATION = gql`
  mutation Register(
    $name: String!
    $password: String!
    $title: String!
    $email: String!
    $description: String!
  ) {
    register(
      name: $name
      password: $password
      title: $title
      email: $email
      description: $description
    )
  }
`;

export const SIGNIN_USER_MUTATION = gql`
  mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password)
  }
`;

export const GET_USERS_QUERY = gql`
  query {
    users {
      name
      title
      description
      email
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserDto: UpdateUserDto!) {
    updateUser(updateUserDto: $updateUserDto) {
      name
      title
      description
      email
      password
    }
  }
`;
