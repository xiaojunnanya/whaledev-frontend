import styled from "styled-components";

export const HomeStyled = styled.div`
  .video-box {
    position: relative;
    width: 100%;
    height: 540px;
    
    display: flex;
    align-items: center;

    .video-background {
      position: absolute;
      left: 50%;
      top: 50%;
      /*保证视频内容始终居中*/
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      /*保证视频充满屏幕*/
      object-fit: cover;
      z-index: -999;
    }


    .midVideo{
      color: rgba(255, 255, 255, .9);
      padding-left: 100px;

      .title{
        font-size: 50px;
        line-height: 64px;
        margin-bottom: 15px;
        font-weight: 500;
        letter-spacing: 4px;
      }

      .subtitle{
        font-size: 24px;
        color: rgba(255, 255, 255, 0.80);
        line-height: 36px;
        margin-bottom: 54px;
      }

      .btn{
        button:nth-child(1){
          margin-right: 20px;
        }
      }
    }
  }

`