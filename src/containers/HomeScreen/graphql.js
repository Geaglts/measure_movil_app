import { gql } from "apollo-boost";

export const Query = {
    GET_CLIENTS: gql`
        query {
            getClients {
                id
                name
                mainPhone {
                    phone
                }
                phones {
                    id
                    phone
                    isMain
                    phoneType {
                        id
                        type
                    }
                }
                measures {
                    id
                    height
                    waist
                }
            }
        }
    `,
};

export const Mutation = {
    REMOVE_CLIENT: gql`
        mutation removeClient($clientId: ID!) {
            removeClient(clientId: $clientId) {
                message
                loading
            }
        }
    `,
};
