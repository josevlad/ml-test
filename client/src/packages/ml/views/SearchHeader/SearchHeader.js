import React from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
// import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'

//import * as actions from '../../actions'
// import style from './style.module.scss'
import './style.scss'

import {Grid, Col, Row} from 'react-styled-flexboxgrid'

class SearchHeader extends React.Component {

    constructor(props) {
        super(props);
        //console.log('SearchHeader - constructor:', this.props.ml.search.terms)
        this.fieldRefs = {}
        this.state = {
            msgs: [],
            isPending: false,
            fields: {
                terms: ''
            }
        };
    }

    componentWillReceiveProps(){
        //console.log('SearchHeader - componentWillReceiveProps:', this.props.ml.search.terms)
        this.setState({
            ...this.state,
            msgs: [],
            fields: {
                ...this.state.fields,
                terms: this.props.ml.search.terms
            }
        })
    }


    componentWillUnmount(){
        this.setState({
            ...this.state,
            fields: {
                terms: ''
            }
        })
    }
    
    goTo = (route, options) => {
        let opt = options || {}
        let str = Object.entries(opt).map(([key, val]) => `${key}=${val}`).join('&')
        this.props.dispatch(push(route+'?'+str))
    }

    onChange = (fieldname) => {
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [fieldname]: this.fieldRefs[fieldname].value
            }
        })
    }

    validate = (values) => {
        let errors = []
        if (values.terms.trim().length < 4) {
            errors.push('Debe ingresar al menos una palabra.')
        }
        return errors.length ? errors : false;
    }

    onSubmit = (e) => {
          e.preventDefault()
        const formHasErrors = this.validate(this.state.fields)
        if (!formHasErrors) {
            // ESTO AL CAMBIAR DE RUTA NO APLICA: SE APLICA LO DE componentWillReceiveProps
            this.setState({
                ...this.state,
                isPending: true,
                msgs: []
            })
            this.goTo("/items", {search:this.state.fields.terms})
        }
        else {
            this.setState({
                ...this.state,
                msgs: formHasErrors
            })
        }
    }
                
                
    render() {
        const msg_content = this.state.msgs.map((item, index) =>
            <span key={index.toString()} style={{ display: 'block' }}>
                {item}
            </span>
        );

        let msg_html = this.state.msgs.length ? (<div className="Msg">
            <div>{msg_content}</div>
        </div>) : null

        // let disabled = this.props.isFetching;
        // let disabled_tag = disabled ? "disabled" : null;
        // let loading = disabled;

        return (
            <div className="SearchHeader">
                <div className="Wrapper">
                    <Grid>
                        <Row>
                            <Col md={10} mdOffset={1} sm={12} xs={12}>
                                <div className="Main">
                                    <Link className="Logo" to="/"></Link>
                                    <form className="Inputs" onSubmit={this.onSubmit}>
                                        <input type="text" name="terms" className="Terms" ref={input => this.fieldRefs.terms = input} value={this.state.fields.terms} onChange={e => { this.onChange('terms')} } placeholder="Nunca dejes de buscar" />
                                        <button type="button" className="Button" onClick={this.onSubmit}></button>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <Grid>
                    <Row>
                        <Col md={10} mdOffset={1} xs={12}>{msg_html}</Col>
                    </Row>
                </Grid>
            </div>
        )

    }
}

// REFERENCIA:
// https://github.com/reactjs/react-redux/blob/master/docs/api.md
const mapStateToProps = state => {
    const { ml, router } = state
    return {
        ml,
        router
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader)