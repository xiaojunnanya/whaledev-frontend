import { Button, Space, Title } from "@/packages";
import {ButtonProps, SpaceProps, ButtonEvents } from "@/packages/config"

export type ItemTypeEnum = 'Button' | 'Space' | 'Title';

export const ItemType: { [key: string]: ItemTypeEnum } = {
    Button: 'Button',
    Space: 'Space',
    Title: 'Title',
};

export const ComponentMap: { [key: string]: React.ElementType } = {
    Space, Button, Title
};

export const componentPropsMap = {
    [ItemType.Button]: ButtonProps,
    [ItemType.Space]: SpaceProps,
}

export const componentEventMap = {
    [ItemType.Button]: ButtonEvents,
}