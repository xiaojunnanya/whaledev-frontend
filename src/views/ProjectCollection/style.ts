import styled from "styled-components";

export const ProjectCollectionStyled = styled.div`
    margin: 15px 30px;


    .top{
        display: flex;
        justify-content: space-between;


        .ant-input-outlined{
            width: 200px;
        }
    }

    .content{
        margin-top: 20px;


        .otherinfo{
            .typestate{
                display: flex;
                justify-content: space-between;
                margin-top: 10px;

                .type{
                    border: 1px solid #ccc;
                    font-size: 12px;
                    padding: 2px 5px;
                    border-radius: 5px;
                }
            }
        }
    }
`