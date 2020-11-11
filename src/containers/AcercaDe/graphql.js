import { gql } from "apollo-boost";

export const Query = {
    OBTENER_USUARIO: gql`
        query {
            me {
                id
                email
            }
        }
    `,
};

export const Mutation = {};
