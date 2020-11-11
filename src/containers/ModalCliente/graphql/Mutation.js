import { gql } from "apollo-boost";

export const ELIMINAR_TELEFONO = gql`
    mutation eliminarTelefono($telefonoId: ID!, $clienteId: ID!) {
        eliminarTelefono(telefonoId: $telefonoId, clienteId: $clienteId) {
            message
            loading
            success
            error
        }
    }
`;

export const ELIMINAR_MEDIDA = gql`
    mutation eliminarMedida($medidasId: ID!, $clienteId: ID!) {
        deleteMeasure(medidasId: $medidasId, clienteId: $clienteId) {
            message
            success
            error
        }
    }
`;
