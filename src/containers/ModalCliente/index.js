import React from "react";
import { Modal, Linking } from "react-native";
import { FORMULARIO_NUEVO_TELEFONO } from "../../navigations/NameScreens";

import fun from "./funciones";
import {
    ModalCliente,
    VistaPrevia,
    Informacion,
    Dato,
    ListaMedidas,
} from "./componentes";
import BotonSalir from "../../components/BotonSalir";
import ListaTelefonos from "../../components/ListaTelefonos";

let ModalArgs = {
    animationType: "fade",
    transparent: true,
};

let DatosTelefonosArgs = {
    label: "Telefonos",
    btnLabel: "Nuevo",
};

let ListaTelefonosArgs = {};

export default function TargetaCliente({ navigation: { navigate }, ...props }) {
    const { cliente, refetch } = props;
    const modalState = React.useState(false);

    const moveToAddPhone = () => {
        let params = {
            clientId: cliente.id,
        };
        navigate(FORMULARIO_NUEVO_TELEFONO, params);
        modalState[1](!modalState[0]);
    };

    ModalArgs["visible"] = modalState[0];
    DatosTelefonosArgs["callback"] = moveToAddPhone;
    ListaTelefonosArgs["telefonos"] = cliente.phones;
    ListaTelefonosArgs["clienteId"] = cliente.id;
    ListaTelefonosArgs["navigate"] = navigate;
    ListaTelefonosArgs["modalState"] = modalState;
    ListaTelefonosArgs["refetch"] = refetch;

    return (
        <>
            <Modal {...ModalArgs}>
                <ModalCliente>
                    <BotonSalir onSubmit={fun.cerrarModal(modalState)} />
                    <Informacion>
                        <Dato label="nombre" valor={cliente.name} />
                        <Dato {...DatosTelefonosArgs}>
                            <ListaTelefonos {...ListaTelefonosArgs} />
                        </Dato>
                        <Dato
                            label="Medidas"
                            btnLabel="Nuevo"
                            callback={fun.agregarMedidas(
                                navigate,
                                modalState,
                                cliente.id
                            )}
                        >
                            <ListaMedidas
                                medidas={cliente.measures}
                                clienteId={cliente.id}
                                navigate={navigate}
                                modalState={modalState}
                            />
                        </Dato>
                    </Informacion>
                </ModalCliente>
            </Modal>
            <VistaPrevia
                cliente={cliente}
                onSubmit={fun.abrirModal(modalState)}
            />
        </>
    );
}
