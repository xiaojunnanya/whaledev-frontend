
import ContainerDev from "./dev";
import ContainerProd from "./prod";
import { ComponentConfig } from "../interface";

export const ContainerConfig: ComponentConfig = {
    name: 'Container',
    defaultProps: {},
    desc: '容器',
    component: {
        dev: ContainerDev,
        prod: ContainerProd
    }
}