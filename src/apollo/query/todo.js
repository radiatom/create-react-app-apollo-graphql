import { gql } from "@apollo/client";

export const GET_TODO = gql`
    query Todo($id: ID!) {
        Todo(id: $id) {
            id
            title
            completed
            description
        }
    }
`;
