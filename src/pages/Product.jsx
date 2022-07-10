import React from 'react';
import Context from '../Layouts/Layout';
import { Query } from "@apollo/client/react/components";
import { GetProduct } from '../queries';
import Item from '../components/Product';
import Loading from '../Layouts/Loading';

export default class Product extends React.Component {
  render() {
    return (
      <Query query={GetProduct} variables={{id: this.props.match.params.id}}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return console.log('Something went wrong');

          return (
            <Context.Consumer>
              {({ bag }) => (
                <Item 
                  id={data.product.id}
                  brand={data.product.brand}
                  name={data.product.name}
                  images={data.product.gallery}
                  attributes={data.product.attributes}
                  currency={data.product.prices[bag.currency].currency.symbol}
                  prices={data.product.prices}
                  price={data.product.prices[bag.currency].amount}
                  description={data.product.description}
                  inStock={data.product.inStock}
                />
              )}
            </Context.Consumer>
          );
        }}
      </Query>
    )
  }
}
