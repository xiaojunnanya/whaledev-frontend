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

    .node-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      width: 100%;
      height: 100%;
      // 所有节点均设置flex布局
      .start-node,
      .normal-node,
      .condition-node,
      .result-node,
      .end-node {
        position: relative;
        display: flex;
        align-items: center;
      }
      // 开始节点
      .circle-btn {
        width: 60px;
        height: 60px;
        line-height: 60px;
        border-radius: 30px;
        box-shadow: 0 1px 5px 0 rgba(10, 30, 65, 0.8);
        color: #fff;
        text-align: center;
        background: ${props => props.theme.color.primaryColor};
        cursor: pointer;
        // 结束节点变灰
        &.gray {
          background: #e8e9eb;
          color: #000;
        }
      }
      // 箭头样式
      .arrow-line {
        position: relative;
        width: 80px;
        user-select: none;
        &::before,
        &::after {
          position: absolute;
          content: '';
          transform: translateY(-50%);
        }
        &::before {
          width: 100%;
          height: 2px;
          background-color: ${props => props.theme.color.primaryColor};
        }
        &::after {
          width: 0;
          height: 0;
          border-left: 10px solid ${props => props.theme.color.primaryColor};
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          right: 0;
        }
      }
      // 普通节点样式
      .normal-node {
        .node-info {
          box-sizing: border-box;
          position: relative;
          width: 150px;
          min-height: 70px;
          padding: 10px;
          border: 2px solid transparent;
          box-shadow: 0 1px 4px 0 rgba(10, 30, 65, 0.16);
          border-radius: 8px;
          cursor: pointer;
          &.success {
            background-color: #52c41a;
            color: #fff;
          }
          &.fail {
            background-color: #ff4d4f;
            color: #fff;
          }
          .title {
            font-size: 14px;
            font-weight: 600;
          }
          .content {
            font-size: 12px;
            padding: 5px;
            padding-left: 0;
            margin-top: 5px;
            border-radius: 4px;
          }
          .icon-del {
            position: absolute;
            right: 5px;
            top: 5px;
            visibility: hidden;
            opacity: 0;
            transition: all 0.3s;
            &:hover {
              color: red;
            }
          }
          &:hover {
            .icon-del {
              visibility: visible;
              opacity: 1;
            }
          }
        }
      }
      .start-node,
      .normal-node,
      .condition-node {
        // 添加节点容器
        .add-node-btn {
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          right: 0;
          width: 80px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          &:hover {
            .add-icon {
              opacity: 1;
              visibility: visible;
              width: 20px;
              height: 20px;
            }
          }
          // 添加按钮图标
          .add-icon {
            position: relative;
            display: flex;
            justify-content: center;
            transition: all 0.3s;
            width: 0;
            height: 0;
            border-radius: 50%;
            cursor: pointer;
            background-color: ${props => props.theme.color.primaryColor};
            opacity: 0;
            visibility: hidden;
            &:hover {
              .popover {
                visibility: visible;
                opacity: 1;
                transform: scale(1);
              }
            }
          }
          // 添加图标popover浮层
          .popover {
            transition: all 0.3s;
            position: absolute;
            left: 20px;
            top: -21px;
            width: 80px;
            background-color: #000;
            padding: 5px;
            border-radius: 5px;
            font-size: 12px;
            visibility: hidden;
            opacity: 0;
            transform: scale(0);
            a {
              display: block;
              line-height: 26px;
              text-align: center;
              color: #fff;
              &:hover {
                color: ${props => props.theme.color.primaryColor};
              }
            }
          }
        }
      }
      // 条件节点样式
      .condition-node {
        position: relative;
        display: flex;
        align-items: center;
        > .title {
          position: absolute;
          left: -35px;
          width: 70px;
          height: 35px;
          line-height: 35px;
          border-radius: 35px;
          text-align: center;
          background: ${props => props.theme.color.primaryColor};
          cursor: pointer;
          color: #fff;
        }
        .node-list {
          .node-item {
            padding-inline: 60px;
            padding-block: 30px;
            padding-right: 0;
            position: relative;
            .left-line,
            .right-line {
              position: absolute;
              width: 2px;
              height: 50%;
              left: 0;
              top: 0;
              background-color: ${props => props.theme.color.primaryColor};
            }
            .left-line {
              &.start {
                top: 50%;
              }
              &.center {
                height: 100%;
              }
            }
            .right-line {
              &.start {
                top: 50%;
                left: 100%;
              }
              &.center {
                left: 100%;
                height: 100%;
              }
              &.end {
                left: 100%;
              }
            }
            .connect-line {
              position: absolute;
              width: 60px;
              height: 2px;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              background-color: ${props => props.theme.color.primaryColor};
            }
            .normal-container {
              display: flex;
              align-items: center;
              .normal-node {
                flex: 1;
                &:last-child {
                  .arrow-line {
                    transform: translateX(2px);
                    &::after {
                      border: none;
                      transform: translateX(2px);
                    }
                  }
                }

                .add-node-btn {
                  width: calc(100% - 150px);
                }
              }
              .arrow-line {
                flex: 1;
              }
              
            }
          }
        }
      }
    }

`