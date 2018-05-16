import React, { Component } from 'react';
import { number } from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Preloader from '../../assets/spinner.png';

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Spinner = styled.div`
  &:before {
    transform: translate3d(0, 0, 0);
    content: ' ';
    width: 40px;
    height: 40px;
    display: block;
    background-size: contain;
    background-image: url(${Preloader});
    background-repeat: no-repeat;
    z-index: 999;
    animation: ${rotate360} 1.4s ease-in-out infinite;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s;
  }

  &:empty:before,
  &:empty:after {
    opacity: 1;
    transition: opacity 0.25s;
    transition-delay: 200ms;
    pointer-events: none;
  }
`;

const StyledLoader = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.4);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
`;

class LoadingSpinner extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
    };

    this.timeout = null;
  }

  componentDidMount() {
    const { timeout } = this.props;

    this.timeout = setTimeout(() => {
      this.setState(() => ({
        visible: true,
      }));
    }, timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return this.state.visible ? (
      <Wrapper>
        <Spinner />
      </Wrapper>
    ) : null;
  }
}

LoadingSpinner.propTypes = {
  timeout: number,
};
LoadingSpinner.defaultProps = {
  timeout: 250,
};

export default LoadingSpinner;

export const AbsoluteLoadingSpinner = () => (
  <StyledLoader>
    <LoadingSpinner />
  </StyledLoader>
);
