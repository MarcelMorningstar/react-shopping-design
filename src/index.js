import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { Layout } from './Layouts/Layout';
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import NoPage from "./pages/NoPage";
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

const CategoryPage = (props) => {
  const params = useParams();
  return <Category {...{...props, match: {params}}} />
}

const ProductPage = (props) => {
  const params = useParams();
  return <Product {...{...props, match: {params}}} />
}

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/all" replace />} />
        <Route path=":category" element={<CategoryPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);
