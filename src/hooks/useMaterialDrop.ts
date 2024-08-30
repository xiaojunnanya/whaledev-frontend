import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponetsStore } from "../stores/components";

export function useMaterailDrop(accept: string[], id: string) {
    const { addComponent } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

    const [{ canDrop }, drop] = useDrop(() => ({
        accept,
        drop: (item: { type: string}, monitor) => {
            // 处理过的就不在处理了
            const didDrop = monitor.didDrop()
            if (didDrop) return

            const config = componentConfig[item.type];

            addComponent({
                id: item.type + '_' + String(+new Date()),
                name: item.type,
                desc: config.desc,
                props: config.defaultProps
            }, id)
        },
        collect: (monitor) => ({
          canDrop: monitor.canDrop(),
        }),
    }));

    return { canDrop, drop }
}