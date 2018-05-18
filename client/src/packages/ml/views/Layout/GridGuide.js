import React from "react"

import {Grid, Col, Row} from 'react-styled-flexboxgrid'
// import style from './style.module.scss'

import Container from './Container'

const TestCelda = <div className="TestCelda">T</div>

const GridGuide = () => (
  <React.Fragment>
      <Container>
          <span>GRID DEMO</span>
          <Grid>
              <Row>
              <Col md={1} xs={1}>{TestCelda}</Col>
              <Col md={1} xs={1}>{TestCelda}</Col>
              <Col md={1} xs={1}>{TestCelda}</Col>
              <Col md={1} xs={1}>{TestCelda}</Col>
              <Col md={1} xs={1}>{TestCelda}</Col>
              <Col md={1} xs={1}>{TestCelda}</Col>
              <Col md={1} xs={1}>{TestCelda}</Col>
              <Col md={1} xs={1}>{TestCelda}</Col>
              <Col md={1} xs={1}>{TestCelda}</Col>
              <Col md={1} xs={1}>{TestCelda}</Col>
              <Col md={1} xs={1}>{TestCelda}</Col>
              <Col md={1} xs={1}>{TestCelda}</Col>
              </Row>
          </Grid> 
          <div className="Container">
            <span>GRID DEMO CON CUSTOM CONTAINER</span>
            <Row>
            <Col xs={6} md={3}>{TestCelda}</Col>
            <Col xs={6} md={3}>{TestCelda}</Col>
            </Row>
          </div>
          <Grid>
              <Row>
                  <Col xs={6} md={3}>{TestCelda}</Col>
                  <Col xs={6} md={3}>{TestCelda}</Col>
              </Row>
          </Grid> 
      </Container>


  </React.Fragment>
)

export default GridGuide