import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-styled-flexboxgrid'
import NumberFormat from 'react-number-format'

const ProductListItem = ({
    id,
    title,
    imgUrl,
    link,
    priceAmount,
    priceDecimals,
    location,
    linkHoverText,
    freeShipping
}) => {
    const imgStyle = imgUrl ? {backgroundImage:`url(${imgUrl})`} : {}
    const linkHoverText_ = linkHoverText ? linkHoverText : 'Click para ver el detalle del producto'

    const shipping = freeShipping ? <div className="freeShipping"></div> : null

    return (
        <div className="Item">
            <Row>
                <Col md={10} mdOffset={1} xs={12}>
                    <div className="Wrapper">
                        <div className="Inner">
                            <Link className="Image" title={title} to={link} style={imgStyle} />
                            <div className="Middle">
                                <div className="Otro">
                                    <span className="Price"><span className="Sign">$</span><NumberFormat value={priceAmount} displayType={'text'} decimalSeparator={""} thousandSeparator={"."} /><sup className="Decimals">{priceDecimals}</sup></span>{shipping} 
                                </div>
                                <Link className="Title" as="h4" to={link} title={linkHoverText_}>{title}</Link>
                            </div>
                            
                            <div className="Right">
                                <span className="Location">{location}</span>
                            </div>
                        </div>
                        <div className="Line"></div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ProductListItem
