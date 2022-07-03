import React from 'react';
import Context from '../Layouts/Layout';
import styled from 'styled-components';
import cart from '../icons/Empty Cart 2.svg';

const Wrapper = styled.div`
  position: relative;
  padding: 16px;

  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);

    .btn {
      display: flex;
    }
  }
`;

const Card = styled.a`
  color: var(--c-black);
  text-decoration: none;
  cursor: pointer;
`;

const Image = styled.div`
  width: 100%;
  margin: 0 0 16px 0;
  background-image: ${props => `url(${props.src})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 1 / 1;
`;

const OutOfStock = styled.div`
  display: ${props => props.inStock ? "none" : "flex"};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #8D8F9A;
  font-size: 24px;
  font-weight: 400;
  background-color: #FFFFFF;
  opacity: .5;
`;

const Text = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.25em;
`;

const Price = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.25em;
`;

const Button = styled.button`
  position: absolute;
  z-index: 7;
  bottom: 54px;
  right: 30px;
  display: none;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  background-color: ${props => props.disabled ? 'var(--c-negative)' : 'var(--c-primary)'};
  border: none;
  border-radius: 50%;
  cursor: pointer;

  > * {
    pointer-events: none;
  }

  &:hover {
    box-shadow: ${props => props.disabled ? 'none' : '0px 4px 8px rgba(168, 172, 176, 0.5)'};
  }
`;

export default class ProductCard extends React.Component {
  static contextType = Context;

  addCart = () => {
    let attributes = [];
    let same = false;
    let index;

    for (let i = 0; i < this.props.attributes.length; i++) {
      attributes.push({
        "id": this.props.attributes[i].id,
        "items": {
          "id": this.props.attributes[i].items[0].id,
          "value": this.props.attributes[i].items[0].value
        }
      })
    }

    const item = {
      "id": this.props.id,
      "price": this.props.price,
      "prices": this.props.prices,
      "quantity": 1,
      "product": {
        "id": this.props.id,
        "attribute": attributes
      }
    }

    for (let i = 0; i < this.context.items.length; i++) {
      if (this.context.items[i].id === this.props.id) {
        index = i;
        same = true;
      }
    }

    if (!same) {
      this.context.addItem(item);
    } else {
      this.context.updateItem(index, 1, item.product.attribute);
    }

    this.context.updateBag(item.quantity, item.price);
  }

  render() {
    return (
      <Wrapper >
        <Card href={'/product/' + this.props.id}>
          <Image src={this.props.image}>
            <OutOfStock inStock={this.props.inStock}>OUT OF STOCK</OutOfStock>
          </Image>
          <Text>{this.props.name}</Text>
          <Price>{this.props.currency + this.props.price.toFixed(2)}</Price>
        </Card>
        <Button className='btn' onClick={this.addCart} disabled={!this.props.inStock} ><object data={cart} aria-label='cart'></object></Button>
      </Wrapper>
    )
  }
}
