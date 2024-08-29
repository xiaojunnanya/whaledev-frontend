import styled from "styled-components";

export const PropsEventStyled = styled.div`
    height: 100%;

    &.whale-props-noselect{
        text-align: center;
        font-size: 12px;
        margin-top: 50px;
    }

    .ant-segmented{
        margin: 5px 0;
    }

    .whale-props-content{
        overflow: auto;
        height: calc(100% - 32px)
    }

`