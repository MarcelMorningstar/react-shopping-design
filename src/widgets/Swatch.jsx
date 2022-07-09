import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    height: inherit;
    margin: 0 0 0 3px;
`;

const Button = styled.button`
    margin: 0 10px 0 0;
    color: var(--c-black);
    font-size: 16px;
    font-weight: 400;
    background-color: ${props => props.color};
    outline: solid var(--c-black) 1px;
    border: none;
    cursor: ${props => props.disabled ? 'auto' : 'pointer'};

    &.swatch {
        aspect-ratio: 1 / 1
    }

    &.active {
        outline: solid var(--c-primary) 2px;
        outline-offset: 1px;
    }
`;

export default class Swatch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: this.props.id
        }
    }

    render() {
        return (
            <Wrapper>
                {
                    this.props.items.map((item) => 
                    <Button 
                        key={item.id}
                        color={item.value} 
                        className={this.state.active === item.id ? 'swatch active' : 'swatch'} 
                        onClick={() => { this.setState({ active: item.id }); this.props.handleAttribute(this.props.type, item.id, item.value); }}
                        disabled={this.props.disabled}
                    />
                    )
                }
            </Wrapper>
        )
    }
}
