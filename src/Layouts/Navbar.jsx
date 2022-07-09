import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { GetCategories, GetCurrencies, GetProduct } from "../queries";
import Attributes from '../widgets/Attributes';
import QuantityChanger from '../widgets/QuantityChanger';
import logo from '../icons/logo.svg';
import cart from '../icons/Empty Cart.svg';
import currency from '../icons/$.svg';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currencyOpen: false,
      cartOpen: false
    }
    this.currencyRef = React.createRef();
    this.cartRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleCurrencyDropdown = () => {
    this.setState({ currencyOpen: !this.state.currencyOpen })
  } 

  handleCartDropdown = () => {
    this.setState({ cartOpen: !this.state.cartOpen })
  } 

  handleClickOutside(event) {
    if (this.currencyRef && !this.currencyRef.current.contains(event.target)) {
      if (this.state.currencyOpen === true) {
        this.setState({ currencyOpen: false });
      }
    }

    if (this.cartRef && !this.cartRef.current.contains(event.target)) {
      if (this.state.cartOpen === true) {
        this.setState({ cartOpen: false });
      }
    }
  }

  removeQuantity = (id, price, attribute) => {
    if (this.props.items[id].quantity <= 1) {
      this.props.items.splice(id, 1);
    } else {
      this.props.updateItem(id, -1, attribute);
    }

    this.props.updateBag(-1, price);
  }

  addQuantity = (id, price, attribute) => {
    this.props.updateItem(id, 1, attribute);
    this.props.updateBag(1, price);
  }

  render() {
    return (
      <nav>
        <div id='categories'>
          <Query query={GetCategories}>
            {({ data, loading, error }) => {
              if (loading) return;
              if (error) return console.log('Something went wrong');
              
              return (
                data.categories.map(({ name }) => 
                  <NavLink to={name} activeclassname='active' key={name}>{name}</NavLink>
                )
              );
            }}
          </Query>
        </div>

        <img src={logo} alt="logo" width={41} height={41} />

        <div className='aa'>
          <div id='currency' className={this.state.currencyOpen ? 'active' : ''} ref={this.currencyRef}>
            <span onClick={this.handleCurrencyDropdown}>
              <img src={currency} alt="currency" width={16} />
            </span>
            <div className='currencies'>
              <Query query={GetCurrencies}>
                {({ data, loading, error }) => {
                  if (loading) return;
                  if (error) return console.log('Something went wrong');
                  
                  return (
                    data.currencies.map(({ label, symbol }, index) => 
                      <button
                        key={index}
                        value={index}
                        className={this.props.bag.currency === index.toString() ? 'active' : ''}
                        onClick={this.props.handleCurrency}
                      >
                        {symbol + ' ' + label}
                      </button>
                    )
                  );
                }}
              </Query>
            </div>
          </div>
          <div id='cart' className={this.state.cartOpen ? 'active' : ''} ref={this.cartRef}>
            <span onClick={this.handleCartDropdown}>
              <div className={this.props.bag.quantity > 0 ? 'quantity active' : 'quantity'}>{this.props.bag.quantity}</div>
              <img src={cart} alt="cart" width={27} />
            </span>
            <div id='bag'>
                <div className='bag'>
                  <h1><b>My Bag, </b>{this.props.bag.quantity} items</h1>
                  <div className='products'>
                    {
                      this.props.items.map((item, index) => 
                        <Query key={index} query={GetProduct} variables={{id: item.product.id}}>
                          {({ data, loading, error }) => {
                            if (loading) return;
                            if (error) return console.log('Something went wrong');
      
                            return (
                              <div className='product'>
                                <div>
                                  <h2>{data.product.brand}</h2>
                                  <h2>{data.product.name}</h2>
                                  <span>{data.product.prices[this.props.bag.currency].currency.symbol + data.product.prices[this.props.bag.currency].amount.toFixed(2)}</span>
                                  <Attributes 
                                    attributes={data.product.attributes} 
                                    attribute={item.product.attribute} 
                                    handleAttribute={null}
                                    disabled={true} 
                                    Sheight={20} 
                                    Theight={24}
                                    margin={8} 
                                    size={14} 
                                    weight={400} 
                                  />
                                </div>
                                <div>
                                  <QuantityChanger 
                                    quantity={this.props.items[index].quantity} 
                                    removeQuantity={() => this.removeQuantity(index, data.product.prices[this.props.bag.currency].amount, item.product.attribute)} addQuantity={() => this.addQuantity(index, data.product.prices[this.props.bag.currency].amount, item.product.attribute)} 
                                    height={145} 
                                    size={25} 
                                    fontSize={16} 
                                  />
                                  <img src={data.product.gallery[0]} alt="" />
                                </div>
                              </div>
                            );
                          }}
                        </Query>
                      )
                    }
                  </div>
                  <Query query={GetCurrencies}>
                    {({ data, loading, error }) => {
                        if (loading) return;
                        if (error) return console.log('Something went wrong');

                        return (
                          <div className='cost'>
                            <span>Total</span>
                            <span>{data.currencies[this.props.bag.currency].symbol + this.props.bag.total.toFixed(2)}</span>
                          </div>
                        );
                      }
                    }
                  </Query>
                  <div className='bag-bottons'>
                    <Link to='cart' id='view'>VIEW BAG</Link>
                    <Link to='cart' id='pay'>CHECK OUT</Link>
                  </div>
              </div>
            </div>
          </div>
          <div id='overlay' className={this.state.cartOpen ? 'active' : ''}></div>
        </div>
      </nav>
    )
  }
}
