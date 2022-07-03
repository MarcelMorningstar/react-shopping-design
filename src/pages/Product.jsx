import React from 'react';
import Context from '../Layouts/Layout';
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import Item from '../components/Product';
import Loading from '../Layouts/Loading';

const GetProduct = gql`
  query GetProducts($id: String!) {
    product(id: $id) {
      id
      name
      brand
      gallery
      attributes {
        id
        name
        type
        items {
          id
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      description
      inStock
    }
  }
`;

export default class Product extends React.Component {
  static contextType = Context;

  render() {
    return (
      <Query query={GetProduct} variables={{id: this.props.match.params.id}}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return console.log('Something went wrong');

          return (
            <Item 
              id={data.product.id}
              brand={data.product.brand}
              name={data.product.name}
              images={data.product.gallery}
              attributes={data.product.attributes}
              currency={data.product.prices[this.context.bag.currency].currency.symbol}
              prices={data.product.prices}
              price={data.product.prices[this.context.bag.currency].amount}
              description={data.product.description}
              inStock={data.product.inStock}
            />
          );
        }}
      </Query>
    )
  }
}
