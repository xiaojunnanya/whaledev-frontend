import styled from "styled-components";

export const EditPagesMiddleStyle = styled.div`
    display: flex;
    height: calc(100vh - 46px - 48px - 1px);
    position: relative;

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

        &-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            margin: 16px 0;
            padding: 4px;
            border-radius: 4px;
            user-select: none;
        }

        &-active{
            background-color: #EDEFF3;
            color: #1E72F5;
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

    .edit-side{
        width: 299px;
        border-left: 1px solid #EDEFF3;
        height: 100%;
        display: none;

        top: 0;
        bottom: 0;
        left: 48px;
        background-color: #fff;
        box-shadow: 4px 6px 6px 0 rgba(31, 50, 88, .08);
        z-index: 999;


        &-active{
            display: block;
        }
    }

    .edit-middle{
        flex: 1;
        background-color: #EDEFF3;
        padding: 16px 6px 16px 16px;

        &-content{
            height: 100%;
            background-color: #fff;
            position: relative;
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
            /* 遗留的问题：这是个不好的东西，要优化 */
            overflow: hidden;
            transition: all 0.4s ease;
            background-color: #fff;
            z-index: 999;
        }
    }
`