import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

import {Grid, Col, Row} from 'react-styled-flexboxgrid'

const Breadcrum = ({data}) => {
    

    return (
        <div className="Breadcrum">
            <Grid>
                <Row>
                    <Col md={10} mdOffset={1} xs={12}>
                        <div className="Inner">
                            <ul>
                                {data ? data.map((item, i) => {
                                    const inner = (item.hasOwnProperty('name') && item.hasOwnProperty('path')) ? <Link to={item.path}>{item.name}</Link> : item
                                    return <li key={i}>{inner}</li>
                                }) : null}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}


export default Breadcrum
