import { gql } from "@apollo/client";

export const GET_TODOS = gql`
    query GetTodos {
        allTodos {
            id
            title
            description
            completed
        }
    }
`;
