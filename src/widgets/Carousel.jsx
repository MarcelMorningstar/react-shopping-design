import React from 'react';
import styled from 'styled-components';
import arrowLeft from '../icons/ArrowLeft.svg';
import arrowRight from '../icons/ArrowRight.svg';

const Wrapper = styled.div`
    position: relative;
    align-self: center;
`;

const Image = styled.img`
    width: 256px;
    height: 288px;
    object-fit: cover;
`;

const ButtonGroup = styled.div`
    position: absolute;
    bottom: 16px;
    right: 16px;
    display: flex;
    flex-direction: row;
`;

const Button = styled.button`
    display: ${props => props.display};
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin: 0 4px 0 0;
    background-color: rgba(0, 0, 0, 0.73);
    border: none; 
    cursor: pointer;

    > * {
        pointer-events: none;
    }
`;

export default class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: 0,
            display: "flex"
        }
    }

    componentDidMount() {
        if (this.props.images.length <= 1) {
            this.setState({ display: "none" })
        }
    }

    handelNext = () => {
        if (this.state.image >= this.props.images.length - 1) {
            this.setState({image: 0})
        } else {
            this.setState({image: this.state.image + 1})
        }
    } 

    handelPrev = () => {
        if (this.state.image <= 0) {
            this.setState({image: this.props.images.length - 1})
        } else {
            this.setState({image: this.state.image - 1})
        }
    } 

    render() {
        return (
            <Wrapper>
                <Image src={this.props.images[this.state.image]} />
                <ButtonGroup>
                    <Button display={this.state.display} onClick={this.handelPrev}><object data={arrowLeft} aria-label='arrow'></object></Button>
                    <Button display={this.state.display} onClick={this.handelNext}><object data={arrowRight} aria-label='arrow'></object></Button>
                </ButtonGroup>
            </Wrapper>
        )
    }
}
