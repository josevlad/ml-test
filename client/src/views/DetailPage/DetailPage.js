import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { views, actions } from '../../packages/ml'
import Loader from '../loader'

const { SearchHeader, Layout, Breadcrum, ProductDetail } = views

class DetailPage extends React.Component {

    componentWillMount(){
        this.props.dispatch(actions.detailFetch(this.props.match.params.id))
    }

    // PREPARO LA DATA:
    getProductDetailDataFromStore = (item) => {
        let out = {}
        if (item){
            out.id = item.id
            out.title = item.title
            out.priceAmount = item.price.amount
            out.priceDecimals = item.price.decimals
            out.soldQuantity = item.sold_quantity
            out.condition = item.condition === 'new' ? 'Nuevo' : 'Usado' 
            out.description = item.description
            out.imgUrl = item.pictures.length ? item.pictures.shift().url : item.picture
        }
        return out
    }

    render() {
        let ProductDetailData = this.getProductDetailDataFromStore(this.props.ml.detail.data.item)

        const onComprar = (e) => {
            console.log('onComprar:', ProductDetailData.id, ProductDetailData.title, e)
        }
        const onImageClick = (e) => {
            console.log('onImageClick:', ProductDetailData.id, ProductDetailData.title, e)
        }

        const loading = this.props.ml.detail.isFetching

        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`Mercadolibre - ${ProductDetailData.title}`}</title>
                    <link rel="canonical" href={"https://www.mercadolibre.com.ar"+this.props.location.pathname} />
                </Helmet>
                <Layout.Main>
                    <Layout.Header>
                        <SearchHeader />
                        {loading ? null : <Breadcrum data={this.props.ml.breadcrum} />}
                    </Layout.Header>
                    {loading ? <Loader/> : <ProductDetail {...ProductDetailData} onComprar={onComprar} onImageClick={onImageClick}/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)
