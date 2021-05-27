import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      errors {
        message
      }
      todo {
        id
        title
        notes
      }
    }
  }
`;
