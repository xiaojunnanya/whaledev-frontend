import styled from "styled-components";

export const HeaderStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;

    background-color: #fff;
    padding: 0 20px;


    .logo{
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1{
            font-size: 20px;
            font-weight: 700;
        }

        img{
            width: 30px;
            height: 30px;
            margin-right: 10px;
        }
    }

    .login{

        button:nth-child(1){
            margin-right: 10px;
        }
    }
`