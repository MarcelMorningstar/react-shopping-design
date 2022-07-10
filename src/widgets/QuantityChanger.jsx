import React from 'react';
import styled from 'styled-components';

const Quantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${props => props.Qheight + 'px'};
  margin: 0 12px;
`;

const QuantityButton = styled.button`
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  background-color: transparent;
  font-size: ${props => props.fontSize + 'px' };
  font-weight: 100;
  border: 1.5px solid black;
  cursor: pointer;
`;

const QuantityLabel = styled.span`
  text-align: center;
  font-size: 24px;
  font-weight: 500;
`;

export default class QuantityChanger extends React.Component {
    render() {
        return (
            <Quantity Qheight={this.props.Qheight}>
                <QuantityButton onClick={this.props.addQuantity} size={this.props.size} fontSize={this.props.fontSize}>+</QuantityButton>
                <QuantityLabel>{this.props.quantity}</QuantityLabel>
                <QuantityButton onClick={this.props.removeQuantity} size={this.props.size} fontSize={this.props.fontSize}>-</QuantityButton>
            </Quantity>
        )
    }
}
