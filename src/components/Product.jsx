import React from 'react';
import Context from '../Layouts/Layout';
import Attributes from '../widgets/Attributes';
import styled from 'styled-components';
import { Interweave } from 'interweave';

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 100px;
  padding: 60px 0;
`;

const Gallery = styled.section`
  display: flex;
  flex-direction: row-reverse;
  column-gap: 30px;
`;

const Images = styled.div`
  overflow-y: overlay;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  max-height: 400px;
  padding-left: 10px;
  direction: rtl;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(201, 201, 201, 0.6);
    border-radius: 25px;
    border: 0 transparent solid;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(201, 201, 201, 0.75);
    border: 0 transparent solid;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:active {
    background: rgba(201, 201, 201, 0.9);
    border: 0 transparent solid;
    background-clip: padding-box;
  }
`;

const ImageButton = styled.input`
  width: 80px;
  height: 80px;
  border: none;
  cursor: pointer;
  object-fit: contain;
`;

const Image = styled.img`
  max-height: 400px;
  object-fit: contain;
`;

const Info = styled.section`
  div {
    width: 300px;
    margin: 0 0 16px 0;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: ${props => props.weight || 400};
  line-height: 40px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  text-transform: uppercase;
`;

const Price = styled.span`
  display: block;
  margin: 16px 0 0 0;
  font-size: 24px;
  font-weight: 700;
`;

const AddButton = styled.button`
  display: block;
  width: 100%;
  margin: 24px 0;
  padding: 16px 32px;
  color: var(--c-white);  
  font-size: 16px;
  font-weight: 700;
  background-color: ${props => props.disabled ? 'var(--c-negative)' : 'var(--c-primary)'};
  border: none;
  cursor: pointer;
`;

export default class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      img: this.props.images[0],
      attribute: [],
      setAttribute: (id, itemID, value) => {
        for (let i = 0; i < this.state.attribute.length; i++) {
          if (this.state.attribute[i].id === id) {
            this.state.attribute[i].items.id = itemID;
            this.state.attribute[i].items.value = value;
          }
        }
      }
    }
  }

  componentDidMount() {
    let attribute = [];

    for (let i = 0; i < this.props.attributes.length; i++) {
      attribute.push({
        "id": this.props.attributes[i].id,
        "items": {
          "id": null,
          "value": null
        }
      });
    }

    this.setState({ attribute: attribute });
  }

  changeImage = (e) => {
    this.setState({ img: e.target.value });
  }

  handleAttribute = (type, id, value) => {
    this.state.setAttribute(type, id, value);
  }

  render() {
    return (
      <Wrapper>
        <Gallery>
          <Image src={this.state.img} alt=""/>
          <Images>
            {
              this.props.images.map((image, index) => 
                <ImageButton type="image" key={index} src={image} onClick={this.changeImage} value={image} />
              )
            }
          </Images>
        </Gallery>
        <Info>
          <div>
            <Title id='brand' weight={600}>{this.props.brand}</Title>
            <Title id='name'>{this.props.name}</Title>
          </div>
          <Attributes attributes={this.props.attributes} attribute={null} handleAttribute={this.handleAttribute} height={45} margin={24} />
          <div id='price'>
            <Label>PRICE:</Label>
            <Price>{this.props.currency + this.props.price.toFixed(2)}</Price>
            <Context.Consumer>
              {({ items, addItem, updateItem, updateBag }) => (
                <AddButton 
                  onClick={() => {
                    let attributes = false;

                    for (let i = 0; i < this.state.attribute.length; i++) {
                      if (this.state.attribute[i].items.value === null) {
                        attributes = true;
                      }
                    }

                    if (!attributes) {
                      let same = false;
                      let index;
                      const item = {
                        "id": this.props.id,
                        "price": this.props.price,
                        "prices": this.props.prices,
                        "quantity": 1,
                        "product": {
                          "id": this.props.id,
                          "attribute": this.state.attribute
                        }
                      }

                      for (let i = 0; i < items.length; i++) {
                        if (items[i].id === item.id) {
                          index = i;
                          same = true;
                        }
                      }

                      if (!same) {
                        addItem(item);
                      } else {
                        updateItem(index, item.quantity, item.product.attribute);
                      }

                      updateBag(item.quantity, item.price);
                    } else {
                      alert("choose attributes");
                    }
                  }}
                  disabled={!this.props.inStock}
                >
                  {this.props.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                </AddButton>
              )}
            </Context.Consumer>
          </div>
          <Interweave content={this.props.description} />
        </Info>
      </Wrapper>
    )
  }
}
