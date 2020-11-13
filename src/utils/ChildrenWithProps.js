import { Children, cloneElement } from "react";

export default function childrenWithProps(children, props) {
    return Children.map(children, (child, i) => {
        return cloneElement(child, props);
    });
}
