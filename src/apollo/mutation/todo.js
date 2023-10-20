import { gql } from "@apollo/client";

export const DELETE_TODO = gql`
    mutation delete($id: ID!) {
        removeTodo(id: $id) {
            id
        }
    }
`;
export const CREATE_TODO = gql`
    mutation creatTodo($title: String!, $description: String!, $completed: Boolean!) {
        createTodo(title: $title, description: $description, completed: $completed) {
            title
            description
            completed
        }
    }
`;
export const UPDATE_TODO = gql`
    mutation updateTodo($id: ID!, $title: String!, $description: String!, $completed: Boolean!) {
        updateTodo(id: $id, title: $title, description: $description, completed: $completed) {
            id
            title
            description
            completed
        }
    }
`;
export const UPDATE_COMPLITED = gql`
    mutation updateComplited($id: ID!, $completed: Boolean!) {
        updateTodo(id: $id, completed: $completed) {
            id
            title
            description
            completed
        }
    }
`;
