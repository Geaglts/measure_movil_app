import { gql } from "apollo-boost";

export const TELEFONO_PRINCIPAL = gql`
    query getMainPhone($clientId: ID!) {
        getMainPhone(clientId: $clientId) {
            phone {
                phone
            }
        }
    }
`;
