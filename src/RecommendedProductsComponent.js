import React, { Component } from 'react';
import styled from 'styled-components';
import { color } from '@core-ds/primitives'
import shuffle from 'lodash/shuffle';
import take from 'lodash/take';

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
        content: '';
        position: absolute;
        top: 51%;
        width: 50%;
        height: 1px;
        overflow: hidden;
        background-color: ${color.gray3};
        visibility: hidden;

        ${bp1} {
            visibility: visible;
        }
    }

    &:before {
        margin-left: -52%;
    }

    &:after {
        margin-left: 2%;
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

const Block = styled.div`
    position: relative;
    width: calc(33.33% - 20px);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InitialBlock = styled(Block)`
    &:before {
        ${bp1} {
            content: 'This Item';
            position: absolute;
            top: 0;
            right: 0;
            background: ${color.gray1};
            color: ${color.gray6};
            border-radius: 4px;
            font-size: 14px;
            font-weight: bold;
            padding: 3px 4px;
            margin: 15%;
            z-index: 1;
        }
    }
`;

const Image = styled.img`
    width: 100%;
    transition: all ease 0.5s;
    filter: ${props => props.isSelected ? 'opacity(1)' : 'opacity(0.5)'};
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
`;

const Checkbox = styled.input`
    margin-right: 5px;

    ${bp1} {
        transform: translateY(-1px);
    }
`;

const Product = styled.label`
    color: ${props => props.isSelected ? color.gray8 : color.gray5};
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

const Price = styled.span`
    color: ${props => props.isSelected ? color.redDark1 : color.gray5};
    padding: 0 5px;
    font-size: 14px;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px 0;

    ${Price} {
        color: ${color.redDark1};
        font-weight: bold;
        font-size: 24px;
        width: 35%;
        display: flex;
        align-items: center;
    }
`;

const Submit = styled.button`
    background: ${color.blue};
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
        const related_products = this.props.related_products;
        // get random products
        let products = shuffle(related_products);;
        products = take(products, 2);
        this.state = {
            related: (products.length != null) ? products : related_products
        }
        // data binding
        this.getSelection = this.getSelection.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    render() {
        return (
            <RecommendedProducts className="recommended-products">
                <Header>{this.props.header}</Header>
                <Container>
                    <Grid>
                        <InitialBlock>
                            <Image isSelected={this.props.initial_product.selected} src={this.props.initial_product.image} alt={this.props.initial_product.title} />
                            <Plus />
                        </InitialBlock>
                        {this.state.related.map((product, key)=> {
                            return (
                                <Block key={key}>
                                    <Image isSelected={product.selected} src={product.image} alt={product.title} />
                                    {key < this.state.related.length - 1 ? (<Plus />) : null}
                                </Block>
                            )
                        })}
                    </Grid>
                    <Details>
                        <Product isSelected={this.props.initial_product.selected}><Selected>This Item</Selected>{this.props.initial_product.name}<Price isSelected={this.props.initial_product.selected}>${this.props.initial_product.price}</Price></Product>
                        {this.state.related.map((product, key)=> {
                            return <Product isSelected={product.selected} key={key}><Checkbox type="checkbox" onChange={(e) => this.getSelection(product.sku, e)} defaultChecked />{product.name}<Price isSelected={product.selected}>${product.price}</Price></Product>;
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
        return this.props.initial_product.price + this.state.related.map(a => (a.selected) ? a.price : 0).reduce((a, b) => a + b, 0)
    }

    getSelection(key, e) {
        // handle checkbox change event
        if(e.target.checked) {
            this.setState({
                related: this.state.related.map((item) => {
                    return {
                        "name": item.name,
                        "image": item.image,
                        "sku": item.sku,
                        "price": item.price,
                        "selected": (item.sku === key) ? true : item.selected,
                    }
                })
            })
        } else {
            this.setState({
                related: this.state.related.map((item) => {
                    return {
                        "name": item.name,
                        "image": item.image,
                        "sku": item.sku,
                        "price": item.price,
                        "selected": (item.sku === key) ? false : item.selected,
                    }
                })
            })
        }
    }

    addToCart(e, addToCartCallback) {
        // handle submit
        const itemsToAdd = this.state.related.filter(item => item.selected);
        addToCartCallback(itemsToAdd);
    }
}

function addToCartCallback(items) {
    console.log("callback provided by parent app");
    console.log("The items to be added: ");
    console.log(items);
}

export default RecommendedProductsComponent;
