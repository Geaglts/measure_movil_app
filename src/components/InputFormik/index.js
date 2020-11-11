import React from "react";
import { TextInput } from "react-native";
import { useField } from "formik";

// Error
import Error from "./Error";

export default ({ fieldName, ...props }) => {
    const [field, meta] = useField(fieldName);
    return (
        <>
            <TextInput
                onChangeText={field.onChange(fieldName)}
                value={field.value}
                autoCapitalize="none"
                {...props}
            />
            {meta.error && meta.touched ? <Error error={meta.error} /> : null}
        </>
    );
};
