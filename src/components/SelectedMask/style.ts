import styled from "styled-components";

export const SelectedMaskStyled = styled.div`

    .whale-mask-container{
        background-color: rgba(0,191,255, 0.1);
        border: 1px dashed;
        border-color: ${props => props.theme.color.primaryColor};
        pointer-events: none;
        z-index: 99;
        border-radius: 4;
        box-sizing: border-box;
    }

    .whale-mask{
        font-size: 14px;
        z-index: 99;
        transform: translate(-100%, -100%);
        display: flex;
        color: #fff;
        background-color: ${props => props.theme.color.primaryColor};
        padding: 2px 4px;

        &-desc{
            cursor: pointer;
            white-space: nowrap;
        }

        &-line{
            margin-left: 4px;
        }

        &-icon{
            display: flex;

            &>span{
                margin-left: 4px;
            }
        }
    }

`