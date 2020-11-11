import { gql } from "apollo-boost";

export const Query = {};

export const Mutation = {
    UPDATE_CLIENT: gql`
        mutation updateClient($clientId: ID!, $name: String!) {
            updateClient(clientData: { name: $name, clientId: $clientId })
        }
    `,
};
