import React from 'react'
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import NumberFormat from 'react-number-format'
import './style.scss'

const ProductDetail = ({
    id,
    title,
    priceAmount,
    priceDecimals,
    soldQuantity,
    condition,
    description,
    imgUrl,
    onComprar,
    onImageClick,
    comprarHoverText,
    imageHoverText
}) => {

    const imgStyle = imgUrl ? {backgroundImage:`url(${imgUrl})`} : {}
    const comprarHoverText_ = comprarHoverText ? comprarHoverText : 'Click para comprar'
    const imageHoverText_ = imageHoverText ? imageHoverText : 'Click para maximizar'
    
    return (
        <div className="ProductDetail">
            <Grid>
                <Row>
                    <Col md={10} mdOffset={1} xs={12}>
                        <div className="Inner">

                            <div className="Main">
                                <Row>
                                    <Col md={8} xs={12}>
                                        <div className="Image" onClick={onImageClick} title={imageHoverText_} style={imgStyle}></div>
                                    </Col>
                                    <Col md={4} xs={12}>
                                    <div className="Data">
                                        <div className="Top">
                                            <span className="Condition">{condition}</span> - <span className="ItemsSold">{soldQuantity}</span> vendidos
                                        </div>
                                        <h4 className="Title">{title}</h4>
                                        <span className="Price"><span className="Sign">$</span><NumberFormat value={priceAmount} displayType={'text'} decimalSeparator={""} thousandSeparator={"."} /><sup className="Decimals">{priceDecimals}</sup></span> 
                                        <button type="button" className="Button primary" title={comprarHoverText_} onClick={onComprar}>Comprar</button>
                                    </div>
                                    </Col>
                                </Row>
                            </div> 

                            <div className="Description">
                                <Row>
                                    <Col md={8} xs={12}>
                                        <h4 className="Title">Descripción del producto</h4>
                                        <p className="Text">
                                        {description}
                                        </p>
                                    </Col>
                                </Row>
                            </div> 
                        
                        </div> 
                    </Col>
                </Row>

            </Grid>
        </div>
    )
}
export default ProductDetail