import { gql } from "apollo-boost";

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export const REGISTRO = gql`
    mutation register($email: String!, $password: String!) {
        register(input: { email: $email, password: $password })
    }
`;
