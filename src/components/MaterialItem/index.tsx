import { useDrag } from "react-dnd";
import { MaterialItemStyled } from "./style";

export interface MaterialItemProps {
    name: string
}

export function MaterialItem(props: MaterialItemProps) {

    const { name } = props;

    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name
        }
    });

    return (
        <MaterialItemStyled ref={drag}>
            {name}
        </MaterialItemStyled>
    )
}