import { gql } from "@apollo/client";

export const DELETE_TODO = gql`
    mutation delete($id: ID!) {
        deleteTodo(id: $id)
    }
`;
