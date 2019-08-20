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
`;

const Container = styled.section`
    padding: 20px;

    ${bp1} {
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

const Image = styled.img`
    width: calc(33.33% - 10px);
    padding: 10px 5px;
`;

const Details = styled.section`
    padding: 20px;

    ${bp1} {
        width: 35%;
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
    render() {
        return (
            <RecommendedProducts className="recommended-products">
                <Header>{header}</Header>
                <Container>
                    <Grid>
                        {products.map((product, key)=> (
                            <Image key={key} src={product.image} alt={product.title}></Image>
                        ))}
                    </Grid>
                    <Details>
                        {products.map((product, key)=> {
                            if (product.selected) {
                                return <Product key={key}><Selected>This Product</Selected>{product.name}<Price>${product.price}</Price></Product>
                            }
                            return <Product key={key}><input type="checkbox" onChange={this.getSelection} defaultChecked />{product.name}<Price>${product.price}</Price></Product>;
                        })}
                        <Price>${this.total()}</Price><Submit onClick={this.addToCart}>Add To Cart</Submit>
                    </Details>
                </Container>
            </RecommendedProducts>
        );
    }

    total() {
        return products.map(a => a.price).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    }

    getSelection(e) {
        // handle checkbox change event
        console.log(e);
    }

    addToCart() {
        // handle submit
    }
}

export default RecommendedProductsComponent;
