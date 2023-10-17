import { gql } from "@apollo/client";

export const GET_TODO = gql`
    query addTodo($id: ID!) {
        todo(id: $id) {
            id
            title
            completed
        }
    }
`;
