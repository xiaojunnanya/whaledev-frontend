import styled from "styled-components";

export const HeaderStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;

    background-color: #4EADE7;
    padding: 0 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);


    .logo{
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

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