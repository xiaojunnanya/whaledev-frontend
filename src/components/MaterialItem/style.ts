import styled from "styled-components";

export const MaterialItemStyled = styled.div`
    border: 1px solid #000;
    padding: 8px 10px; 
    margin: 10px; 
    cursor: move;
    display: inline-block;
    background-color: white;

    transition: background-color 0.3s ease;

    &:hover {
        background-color: #ccc;
    }
`