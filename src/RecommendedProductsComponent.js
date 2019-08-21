import React, { Component } from 'react';
import styled from 'styled-components';
import { color } from '@core-ds/primitives'
import examples from './sample_data.json'

const MAX_PRODUCTS = 3;

/* sample data */
let header = examples.header;
let products = examples.products.slice(0, MAX_PRODUCTS); // enforce max products

/* style variables */
const bp1 = '@media screen and (min-width: 650px)';

/* styled page elements */
const RecommendedProducts = styled.section`
    padding: 20px 0;
    margin: 0 auto;
    max-width: 1024px;

    ${bp1} {
        padding: 20px;
    }
`;

const Container = styled.section`
    padding: 20px;

    ${bp1} {
        padding: 10px;
        display: flex;
    }
`;

const Header = styled.header`
    font-weight: bold;
    color: ${color.gray8};
    position: relative;
    text-align: center;
    overflow: hidden;

    &:before,
    &:after {
        content: '\a0';
        position: absolute;
        top: 51%;
        overflow: hidden;
        width: 50%;
        height: 1px;
        background-color: ${color.gray3};
        opacity: 0;

        ${bp1} {
            opacity: 1;
        }
    }

    &:before {
        /* margin for line around test 2% */
        margin-left: -52%;
        text-align: right;
    }

    &:after {
        /* margin for line around test 2% */
        margin-left: 2%;
        text-align: left;
    }
`;

const Grid = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 10px;

    ${bp1} {
        width: 55%;
        margin: 10px 0;
    }
`;

const Image = styled.div`
    position: relative;
    width: calc(33.33% - 20px);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        transition: all ease 0.5s;
    }
`;

const Plus = styled.span`
    position: absolute;
    right: -4%;
    height: -50%;

    &:before {
        content: '+';
        color: ${color.gray5};
        font-size: 18px;
    }

    ${bp1} {
        right: -3%;
    }
`;

const Details = styled.section`
    padding: 20px;
    line-height: 1.5;

    ${bp1} {
        width: 45%;
        padding: 0 10px;
        margin: 10px 0;
    }

    input {
        margin-right: 5px;

        ${bp1} {
            transform: translateY(-1px);
        }
    }
`;

const Product = styled.label`
    color: ${color.gray8}
    font-size: 16px;
    text-align: left;
    font-weight: bold;
    line-height: 2;
    display: inline-block;
`;

const Selected = styled.span`
    background: ${color.gray1};
    color: ${color.gray6};
    border-radius: 4px;
    padding: 3px 4px;
    margin-right: 5px;
    font-size: 14px;
    line-height: 1.7;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px 0;

    .total {
        font-weight: bold;
        font-size: 16px;
        width: 25%;
        display: flex;
        align-items: center;
    }
`;

const Price = styled.span`
    color: ${color.redDark1};
    padding: 0 5px;
    font-size: 14px;
`;

const Submit = styled.button`
    background: ${color.blueDark1};
    color: white;
    font-size: 16px;
    padding: 10px 15px;
    font-weight: bold;
    border-radius: 5px;
    border: none;
`;

class RecommendedProductsComponent extends Component {
    constructor(props) {
        super(props);
        // state variables
        this.state = {
            selected: products.map((product) => {
                return {
                    "name": product.name,
                    "image": product.image,
                    "sku": product.sku,
                    "price": product.price,
                    "initial_product": product.initial_product || null,
                    "selected": product.selected
                }
            })
        }
        // data binding
        this.getSelection = this.getSelection.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    render() {
        return (
            <RecommendedProducts className="recommended-products">
                <Header>{header}</Header>
                <Container>
                    <Grid>
                        {products.map((product, key)=> {
                            if(key < products.length - 1) {
                                return <Image key={key}><img className={'image' + product.sku} src={product.image} alt={product.title} /><Plus></Plus></Image>
                            }
                            return <Image key={key}><img className={'image' + product.sku} src={product.image} alt={product.title} /></Image>
                        })}
                    </Grid>
                    <Details>
                        {products.map((product, key)=> {
                            if (product.initial_product) {
                                return <Product className={'item' + product.sku}  key={key}><Selected>This Item</Selected>{product.name}<Price>${product.price}</Price></Product>
                            }
                            return <Product className={'item' + product.sku}  key={key}><input type="checkbox" onChange={(e) => this.getSelection(product.sku, e)} defaultChecked />{product.name}<Price>${product.price}</Price></Product>;
                        })}
                        <Wrapper>
                            <Price className="total">${this.getTotal()}</Price><Submit onClick={(e) => this.addToCart(e, addToCartCallback)}>Add To Cart</Submit>
                        </Wrapper>
                    </Details>
                </Container>
            </RecommendedProducts>
        );
    }

    getTotal() {
        return this.state.selected.map(a => (a.selected) ? a.price : 0).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    }

    getSelection(key, e) {
        // handle checkbox change event
        if(e.target.checked) {
            // add style
            let text = document.getElementsByClassName('item' + key)[0];
            text.style.color = color.gray8;
            text.children[1].style.color = color.redDark1;
            document.getElementsByClassName('image' + key)[0].style.filter = 'opacity(1)';
            // update selected state
            this.setState({
                selected: this.state.selected.map((item) => {
                    return {
                        "name": item.name,
                        "image": item.image,
                        "sku": item.sku,
                        "price": item.price,
                        "selected": (item.sku === key) ? item.selected = true : item.selected,
                        "initial_product": item.initial_product || null
                    }
                })
            })
        } else {
            // add style
            let text = document.getElementsByClassName('item' + key)[0];
            text.style.color = color.gray1;
            text.children[1].style.color = color.gray1;
            document.getElementsByClassName('image' + key)[0].style.filter = 'opacity(0.5)';
            // update selected state
            this.setState({
                selected: this.state.selected.map((item) => {
                    return {
                        "name": item.name,
                        "image": item.image,
                        "sku": item.sku,
                        "price": item.price,
                        "selected": (item.sku === key) ? item.selected = false : item.selected,
                        "initial_product": item.initial_product || null
                    }
                })
            })
        }
    }

    addToCart(e, addToCartCallback) {
        // handle submit
        let itemsToAdd = this.state.selected.filter(item => !item.initial_product && item.selected);
        addToCartCallback(itemsToAdd);
    }
}

function addToCartCallback(items) {
    console.log("callback provided by parent app");
    console.log("The items to be added: ");
    console.log(items);
}

export default RecommendedProductsComponent;
