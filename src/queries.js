import { gql } from "@apollo/client";

export const GetCategories = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

export const GetCurrencies = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

export const GetProducts = gql`
  query GetProducts($category: String!) {
    category(input: { title: $category }) {
      products {
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
        inStock
      }
    }
  }
`;

export const GetProduct = gql`
  query GetProduct($id: String!) {
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
