import styled from "styled-components";


export const ActionModalStyled = styled.div`
    .node-viewer {
        width: 100vw;
        height: calc(100vh - 65px);
        margin: -24px;
        background-color: #f2f3f5;
        .infinite-viewer-scroll-bar .infinite-viewer-scroll-thumb {
            background: #b1b1b5;
        }
    }

    .react-shape-app {
        display: flex;
        width: 100%;
        padding: 0;
        font-family: sans-serif;
    
        .app-content {
            flex: 1;
            height: 280px;
            margin-right: 8px;
            margin-left: 8px;
            border-radius: 5px;
            box-shadow: 0 12px 5px -10px rgb(0 0 0 / 10%), 0 0 4px 0 rgb(0 0 0 / 10%);
        }
    
        .custom-react-node {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: #fff;
            border: 1px solid #8f8f8f;
            border-radius: 6px;
        }
    
        .custom-react-node span {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
    }
`