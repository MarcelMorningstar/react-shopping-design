import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    height: inherit;
    margin: 0 0 0 1px;
`;

const Button = styled.button`
    margin-right: 10px;
    color: var(--c-black);
    font-size: 16px;
    font-weight: 400;
    line-height: 18px;
    background-color: transparent;
    outline: solid var(--c-black) 1px;
    border: none;
    cursor: ${props => props.disabled ? 'auto' : 'pointer'};

    &.text {
        width: 100%;
        max-width: 81px;

        ${props => props.disabled ? '' : '&:hover { color: var(--c-white); background-color: var(--c-black); }'}

        &.active {
            color: var(--c-white);
            background-color: var(--c-black);
        }
    }
`;

export default class Text extends React.Component {
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
                            className={this.state.active === item.id ? 'text active' : 'text'} 
                            onClick={() => { this.setState({ active: item.id }); this.props.handleAttribute(this.props.type, item.id, item.value); }}
                            disabled={this.props.disabled}
                        >
                            {item.value}
                        </Button>  
                    )
                }
            </Wrapper>
        )
    }
}
