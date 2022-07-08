import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 25%; 
  left: 50%;
`;

const Loader = styled.div`
  position: relative;
  left: -50%;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid var(--c-primary);
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default class Loading extends React.Component {
  render() {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    )
  }
}
