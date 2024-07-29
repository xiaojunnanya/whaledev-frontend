import styled from "styled-components"

export const RapidPagesStyle = styled.div`

    display: flex;
    background-color: #EEEFF2;

    .page-select{
        width: 180px;
        background-color: #fff;

        .add{
            margin: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .add-text{
                font-size: 14px;
            }
        }


        .page{
            .page-item{
                padding: 10px;
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .page-item-name{
                    width: 100%;
                    display:flex;
                    align-items: center;
                    justify-content: space-between;

                    .ant-tag{
                        font-size: 10px;
                    }
                }

                .settingOutlined{
                    visibility: hidden;
                }

                &:hover{
                    background-color: #F2F2F2;
                    cursor: pointer;
                    
                    .settingOutlined{
                        visibility: visible;
                    }
                }
            }

            .page-active, .page-active:hover{
                background-color: #EDF4FE;
            }
        }
    }

    .page-preview{
        margin: 16px;
        width: 100%;
        background-color: #fff;
    }
`