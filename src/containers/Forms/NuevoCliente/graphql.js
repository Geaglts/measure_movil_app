import { gql } from "apollo-boost";

export const Query = {
    GET_PHONETYPES: gql`
        query {
            getPhoneTypes {
                id
                type
            }
        }
    `,
};

export const Mutation = {
    ADD_CLIENT: gql`
        mutation addClient(
            $name: String!
            $height: Int!
            $waist: Int!
            $phone: String!
            $phoneType: ID!
        ) {
            addClient(
                input: {
                    name: $name
                    measures: { height: $height, waist: $waist }
                    phone: { phone: $phone, phoneType: $phoneType }
                }
            )
        }
    `,
};
