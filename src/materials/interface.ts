import { PropsWithChildren } from "react";

export interface CommonComponentProps extends PropsWithChildren{
    id: string;
    name: string;
    [key: string]: any
}