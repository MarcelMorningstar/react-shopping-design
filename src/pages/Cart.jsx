import React from 'react';
import Context from '../Layouts/Layout';
import { Query } from "@apollo/client/react/components";
import { GetProduct, GetCurrencies } from '../queries';
import Item from '../components/Cart';
import Loading from '../Layouts/Loading';
import '../styles/cart.scss';

export default class Cart extends React.Component {
  render() {
    return (
      <section className='cart'>
        <h1>CART</h1>
        <Context.Consumer>
          {({ items, bag }) => (
            <div>
              {
                items.map((item, index) => 
                  <Query key={index} query={GetProduct} variables={{id: item.product.id}}>
                    {({ data, loading, error }) => {
                      if (loading) return <Loading />;
                      if (error) return console.log('Something went wrong');

                      return (
                        <Item 
                          index={index}
                          id={data.product.id}
                          name={data.product.name}
                          brand={data.product.brand}
                          images={data.product.gallery}
                          attributes={data.product.attributes}
                          attribute={item.product.attribute}
                          currency={data.product.prices[bag.currency].currency.symbol}
                          price={data.product.prices[bag.currency].amount}
                          quantity={item.quantity}
                          prices={data.product.prices}
                        />
                      );
                    }}
                  </Query>
                )
              }
              <Query query={GetCurrencies}>
                {({ data, loading, error }) => {
                  if (loading) return;
                  if (error) return console.log('Something went wrong');

                  return (
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>Tax 21%:</td>
                            <td>{data.currencies[bag.currency].symbol + bag.tax.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Quantity:</td>
                            <td>{bag.quantity}</td>
                          </tr>
                          <tr>
                            <td>Total:</td>
                            <td>{data.currencies[bag.currency].symbol + bag.total.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                      <button id='order' onClick={() => {alert('pay up')}}>ORDER</button>
                    </div>
                  );
                }}
              </Query>
            </div>
          )}
        </Context.Consumer>
      </section>
    )
  }
}
