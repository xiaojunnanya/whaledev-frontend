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


        /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
        ::-webkit-scrollbar {
            width:4px;
        }

        /*定义滑块 内阴影+圆角*/
        ::-webkit-scrollbar-thumb {
            background-color:#C1C1C1;
            border-radius: 10px;
        }

        .page{
            height: calc(100% - 44px);
            overflow-y: scroll;
            

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