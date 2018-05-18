import React from 'react'
import ProductListItem from './ProductListItem'
import {Grid } from 'react-styled-flexboxgrid'
import './style.scss'

const ProductList = ({data}) => (
    <div className="ProductList">
        <Grid>
            {data.map((item, index) => <ProductListItem key={index} {...item}/>)}
        </Grid>
    </div>
)

export default ProductList