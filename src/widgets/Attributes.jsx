import React from 'react';
import Swatch from './Swatch';
import Text from './Text';
import styled from 'styled-components';

const Attribute = styled.div`
  height: ${props => props.height + 'px'};
  margin-bottom: ${props => props.margin + 'px'};
  padding: 7px 0 0 0;
`;

const Label = styled.label`
  font-weight: ${props => props.weight || 700};
  font-size: ${props => props.size || "18"}px;
  line-height: 18px;
  white-space: nowrap;
  text-transform: uppercase;
`;

export default class Attributes extends React.Component {
  render() {
    return (
      <div className='attributes'> 
        {
          this.props.attributes.map((attribute, index) => {
            if (attribute.type === 'swatch') {
              return (
                <div key={attribute.id}>
                  <Label size={this.props.size} weight={this.props.weight}>{attribute.name}:</Label> 
                  <Attribute height={this.props.Sheight} margin={this.props.margin}>
                    <Swatch 
                      items={attribute.items} 
                      type={attribute.id} 
                      id={this.props.attribute == null ? null : this.props.attribute[index].items.id} 
                      handleAttribute={this.props.handleAttribute} 
                      disabled={this.props.disabled}
                    />
                  </Attribute>
                </div>
              )
            }
            else {
              return (
                <div key={attribute.id}>
                  <Label size={this.props.size} weight={this.props.weight}>{attribute.name}:</Label> 
                  <Attribute height={this.props.Theight} margin={this.props.margin}>
                    <Text 
                      items={attribute.items} 
                      type={attribute.id} 
                      id={this.props.attribute == null ? null : this.props.attribute[index].items.id} 
                      handleAttribute={this.props.handleAttribute} 
                      disabled={this.props.disabled}
                    />
                  </Attribute>
                </div>
              )
            }
          })
        }
      </div>
    )
  }
}
