import styled from "styled-components";

export const EditPageSideStyle = styled.div`

    .side-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        height: 48px;


        &-title{
            font-weight: 700;
        }

        &-right{
            display: flex;
            align-items: center;

            img{
                cursor: pointer;
            }

            >span{
                margin-left: 10px;
                cursor: pointer;
            }
        }
    }
    
`