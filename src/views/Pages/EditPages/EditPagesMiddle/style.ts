import styled from "styled-components";

export const EditPagesMiddleStyle = styled.div`
    display: flex;
    height: calc(100vh - 46px - 48px - 1px);

    .edit-left{
        width: 48px;
    }

    .edit-middle{
        flex: 1;
        background-color: #EDEFF3;
        padding: 16px;

        &-content{
            height: 100%;
            background-color: #fff
        }
    }

    .edit-right{
        width: 300px;
    }
`