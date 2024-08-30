import PageDev from "./dev";
import PageProd from "./prod";
import { ComponentConfig } from "../interface";

export const PageConfig: ComponentConfig = {
    name: 'Page',
    defaultProps: {},
    desc: '页面',
    component: {
        dev: PageDev,
        prod: PageProd
    }
}