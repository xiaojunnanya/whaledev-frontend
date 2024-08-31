import { ComponentEvent } from "@/materials/interface";
import { Segmented } from "antd";
import { useState } from "react";
import { GoToLink } from "./GoToLink";
import { ShowMessage } from "./ShowMessage";

interface ActionModalProps {
    eventConfig: ComponentEvent
}

export function ActionModal(props: ActionModalProps) {
    const {
        eventConfig,
    } = props;

    const [key, setKey] = useState<string>('访问链接');

    return  <div className="h-[500px]">
        <Segmented value={key} onChange={setKey} block options={['访问链接', '消息提示', '自定义 JS']} />
        {
            key === '访问链接' && <GoToLink event={eventConfig}/>
        }
        {
            key === '消息提示' && <ShowMessage event={eventConfig}/>
        }
    </div>
}