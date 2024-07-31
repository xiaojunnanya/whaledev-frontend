import styled from "styled-components";

export const EditPagesMiddleStyle = styled.div`
    display: flex;
    height: calc(100vh - 46px - 48px - 1px);

    .edit-left{
        width: 48px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-size: 10px;

        img{
            width: 20px;
            height: 20px;
            margin-bottom: 6px;
        }

        .edit-left-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            margin: 16px 0;
            padding: 4px;
            border-radius: 4px;
        }

        &-top{
            &-item{
                &:hover{
                    background-color: #EDEFF3;
                }
            }
        }

        &-bottom{
            /* margin-bottom: 12px; */
        }
    }

    .edit-middle{
        flex: 1;
        background-color: #EDEFF3;
        padding: 16px 6px 16px 16px;

        &-content{
            height: 100%;
            background-color: #fff
        }
    }

    .edit-right{
        display: flex;

        &-dot{
            width: 9px;
            background-color: #EDEFF3;
            height: 100%;
            display: flex;
            align-items: center;
            margin-right: 1px;

            .dot{
                padding: 15px 0px;
                border-radius: 12px 0px 0px 12px;
                background: #FFFFFF;
                cursor: pointer;
                display: flex;
                align-items: center;
            }
        }

        &-content{
            height: 100%;
            transition: width 0.4s ease
        }
    }
`