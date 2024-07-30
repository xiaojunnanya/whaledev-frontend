import styled from "styled-components";

export const EditPagesStyle = styled.div`
    .edit-top{
        height: 46px;
        padding: 0 20px;
        border-bottom: 1px solid #E0E0E0;

        display: flex;
        align-items: center;
        justify-content: space-between;

        &-left{
            .page-name{
                margin-left: 10px;
                font-size: 13px;
            }
        }

        &-middle{
            display: flex;

            img{
                margin: 0 5px;
                cursor: pointer;
                border-radius: 5px;

                &:hover{
                    background-color: #F2F2F2;
                }
            }

            img:nth-child(1){
                height: 26px;
                padding: 2px;
            }

            img:nth-child(2){
                height: 22px;
                padding: 4px;
            }

            img:nth-child(3){
                height: 20px;
                padding: 5px;
            }

            .ant-input-number-group-wrapper{
                margin-left: 20px;
                width: 120px;
            }
        }

        &-right{
            button{
                margin-left: 10px;
            }
        }
    }
`