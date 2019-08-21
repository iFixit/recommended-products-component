import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RecommendedProductsComponent from './RecommendedProductsComponent';
import * as serviceWorker from './serviceWorker';
import examples from './sample_data.json'

ReactDOM.render(<RecommendedProductsComponent header="Frequently bought together" products={examples.products} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
