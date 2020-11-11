import { gql } from "apollo-boost";

export const AGREGAR_MEDIDA = gql`
    mutation addMeasure($waist: Int!, $height: Int!, $clientId: ID!) {
        addMeasure(
            clientId: $clientId
            measures: { waist: $waist, height: $height }
        ) {
            loading
            error
            message
            success
        }
    }
`;

export const ACTUALIZAR_MEDIDA = gql`
    mutation actualizarMedida(
        $height: Int!
        $waist: Int!
        $clienteId: ID!
        $medidasId: ID!
    ) {
        updateMeasure(
            medidas: { waist: $waist, height: $height }
            medidasId: $medidasId
            clienteId: $clienteId
        ) {
            message
            success
            error
            loading
        }
    }
`;
