import React, { Component } from 'react';
import styled from 'styled-components';
import examples from './sample_data.json'

const MAX_PRODUCTS = 3;

/* sample data */
let header = examples.header;
let products = examples.products.slice(0, MAX_PRODUCTS); // enforce max products

/* style variables */
const bp1 = '@media screen and (min-width: 650px)';
const gray = '#717a7c';
const lightGray = '#d2dadf';
const red = '#da3b38';
const blue = '#1875f1';

/* styled page elements */
const RecommendedProducts = styled.section`
    padding: 20px 0;
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
        background-color: ${lightGray};
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
        width: 65%;
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
    }
`;

const Plus = styled.span`
    position: absolute;
    right: -4%;
    height: -50%;

    &:before {
        content: '+';
        color: ${gray};
    }
`;

const Details = styled.section`
    padding: 20px;

    ${bp1} {
        width: 35%;
        padding: 0 10px;
        margin: 10px 0;
    }
`;

const Product = styled.p`
    text-align: left;
`;

const Selected = styled.span`
    background: ${lightGray};
    color: ${gray};
    border-radius: 2px;
    padding: 0 5px;
    margin-right: 5px;
`;

const Price = styled.span`
    color: ${red};
    padding: 0 5px;
`;

const Submit = styled.button`
    background: ${blue};
    color: white;
    border: none;
    border-radius: 5px;
`;

class RecommendedProductsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: products.map((product) => {
                return {
                    "sku": product.sku,
                    "price": product.price,
                    "selected": product.selected
                }
            })
        }
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
                                return <Product key={key}><Selected>This Item</Selected>{product.name}<Price>${product.price}</Price></Product>
                            }
                            return <Product key={key}><input type="checkbox" onChange={(e) => this.getSelection(product.sku, e)} defaultChecked />{product.name}<Price>${product.price}</Price></Product>;
                        })}
                        <Price>${this.getTotal()}</Price><Submit onClick={this.addToCart}>Add To Cart</Submit>
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
            document.getElementsByClassName('image' + key)[0].style.filter = 'opacity(1)';
            // update selected state
            this.setState({
                selected: this.state.selected.map((item) => {
                    return {
                        "sku": item.sku,
                        "price": item.price,
                        "selected": (item.sku === key) ? item.selected = true : item.selected
                    }
                })
            })
        } else {
            console.log(key);
            // add style
            document.getElementsByClassName('image' + key)[0].style.filter = 'opacity(0.5)';
            // update selected state
            this.setState({
                selected: this.state.selected.map((item) => {
                    return {
                        "sku": item.sku,
                        "price": item.price,
                        "selected": (item.sku === key) ? item.selected = false : item.selected
                    }
                })
            })
        }
    }

    addToCart() {
        // handle submit
    }
}

export default RecommendedProductsComponent;
