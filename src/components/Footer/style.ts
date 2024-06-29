import styled from "styled-components";

export const FooterStyle = styled.div`
  width: 100%;
  background-color: #303846;


  .footer{
    margin: 0 auto;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;


    dt{
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 16px;
      color: #fff;
    }

    dd{
      margin-left: 0;
      color: rgb(235, 237, 240);
      margin: 10px 0;
      cursor: pointer;
      font-size: 14px;
    }
  }

`