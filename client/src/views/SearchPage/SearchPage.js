import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { views } from '../../packages/ml'
import Loader from '../loader'

const { SearchHeader, Layout, Breadcrum, ProductList } = views

class SearchPage extends React.Component {


    render() {

        const loading = this.props.ml.search.isFetching
        // PREPARO LA DATA:
        let ProductListData = []
        if (this.props.ml.search.data){
            ProductListData = this.props.ml.search.data.items.map(item => {
                let out = {}
                out.title = item.title
                out.link = `/items/${item.id}`
                out.imgUrl = item.pictures.length ? item.pictures.pop().url : item.picture
                out.priceAmount = item.price.amount
                out.priceDecimals = item.price.decimals
                out.location = item.location
                out.freeShipping = item.free_shipping
                return out
            })
        }
        
        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Mercadolibre - Buscar</title>
                    <link rel="canonical" href={"https://www.mercadolibre.com.ar"+this.props.location.pathname} />
                </Helmet>
                <Layout.Main>
                    <Layout.Header>
                        <SearchHeader />
                        {!this.props.ml.breadcrum ? null : <Breadcrum data={this.props.ml.breadcrum} />}
                    </Layout.Header>
                    {this.props.ml.breadcrum ? null : <div className="HomeBanner"></div>}
                    {loading ? <Loader/> : <ProductList data={ProductListData}/>}
                </Layout.Main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { ml } = state
    return {
        ml
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
