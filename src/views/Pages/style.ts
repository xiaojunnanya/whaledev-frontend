import styled from "styled-components";


export const PreviewPagesStyled = styled.div`

    .header{
        width: 100%;
        position: relative;
        border-bottom: 1px solid #E0E0E0;


        .project-name{
            position: absolute;
            line-height: 42px;
            margin-left: 16px;
            z-index:999;

            &>span:nth-child(1){
                cursor: pointer;
            }
            
            .project-name-text{
                margin-left: 10px;
                font-size: 13px;
            }
        }

        .project-able{
            .ant-tabs{
                .ant-tabs-nav{
                    margin-bottom: 0px
                }

                .ant-tabs-content-holder{
                    height: calc(100vh - 46px - 48px - 1px)
                }

                .ant-tabs-content.ant-tabs-content-top, .ant-tabs-tabpane.ant-tabs-tabpane-active{
                    height: 100%;

                    &>div{
                        height: 100%;
                    }
                }
            }
        }
    }
`