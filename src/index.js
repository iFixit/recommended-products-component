import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RecommendedProductsComponent from './RecommendedProductsComponent';
import * as serviceWorker from './serviceWorker';
import sample from './sample_data.json'

ReactDOM.render(<RecommendedProductsComponent header="Frequently bought together" initial_product={sample.initial_product} related_products={sample.related_products} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
