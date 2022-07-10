import React from 'react';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Navbar from './Navbar';
import '../styles/layout.scss';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({ dataIdFromObject: o => false })
});

const Context = React.createContext();

export class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: JSON.parse(window.localStorage.getItem('BAG')) || [],
      bag: JSON.parse(window.localStorage.getItem('BAG_INFO')) || {
        "currency": "0",
        "tax": 0,
        "quantity": 0,
        "total": 0
      },
      addItem: (item) => {
        this.setState({ items: JSON.parse(JSON.stringify([...this.state.items, item])) })
      },
      updateItem: (index, quantity) => {        
        let items = this.state.items;
        
        items[index].quantity += quantity;

        this.setState({ items: items });
      },
      updateBag: (quantity, price) => {
        let bag = this.state.bag;

        bag.quantity += quantity;

        if (bag.quantity === 0) {
          bag.total = 0;
          bag.tax = 0;
        } else {
          bag.total += quantity * price;
          bag.tax = bag.total * 0.21;
        }
        
        this.setState({ bag: bag });
      }
    }
  }

  componentDidMount() {
    window.localStorage.setItem('BAG', JSON.stringify(this.state.items));
    window.localStorage.setItem('BAG_INFO', JSON.stringify(this.state.bag));
  }

  componentDidUpdate() {
    window.localStorage.setItem('BAG', JSON.stringify(this.state.items));
    window.localStorage.setItem('BAG_INFO', JSON.stringify(this.state.bag));
  }

  handleCurrency = (e) => {
    let bag = this.state.bag;
    let items = this.state.items

    bag.currency = e.target.value;
    bag.total = 0;
    
    for (let i = 0; i < items.length; i++) {
      items[i].price = items[i].prices[e.target.value].amount;
      items[i].total_price = items[i].quantity * items[i].price;
      bag.total += items[i].total_price;
    }

    bag.tax = bag.total * 0.21;

    this.setState({ bag: bag, items: items });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Navbar 
          category={this.state.category} 
          bag={this.state.bag}
          items={this.state.items}
          updateItem={this.state.updateItem}
          updateBag={this.state.updateBag}
          handleCurrency={this.handleCurrency} 
        />

        <Context.Provider value={this.state}>
          <Outlet />
        </Context.Provider>
      </ApolloProvider>
    )
  }
}

export default Context;
