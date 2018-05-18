import axios from 'axios'
import _ from 'lodash'
import author from "./map/author"
import price from "./map/price"
import error from "./map/error"
import settings from '../../../settings'

const getCategoryFromItems = (arrCategories) => {
    let categories = {}
    arrCategories.forEach(category_id => {
        if (categories[category_id]){
            categories[category_id] = categories[category_id]+1
        }
        else {
            categories[category_id] = 1
        }
    })

    let sortable = []
    for (let category_id in categories) {
        sortable.push({category_id:category_id, total:categories[category_id]});
    }
    sortable.sort((a, b) => {
        return b.total - a.total
    })
    return sortable[0].category_id
}


const getItems = async (q, limit, offset, full) => {
    let response = {
        author: author,
        categories: [],
        paging: {},
        items: []
    }

    let params = {}
    let arrCategories = []
    if (typeof q !== 'string' || q === '') throw new Error('q no puede estar vacío')
    params.q = q

    if (parseInt(limit) > 0){
        params.limit = parseInt(limit)
    }

    if (parseInt(offset) > 0){
        params.offset = parseInt(offset)
    }

    let r = await axios.get(`${settings.ML.API_URL}/sites/MLA/search`, { params })
    response.paging = r.data.paging
    let full_promises = []

    if (typeof full === 'undefined'){
        _.forEach(r.data.results, (i) => {
            arrCategories.push(i.category_id)
            let item = {}
            let prc = price
            prc.currency = i.installments.currency_id
            prc.amount = Math.floor(i.installments.amount)
            prc.decimals = (i.installments.amount % 1).toFixed(2).substring(2)        
            item.id = i.id
            item.title = i.title
            item.price = Object.assign({}, prc)
            item.picture = i.thumbnail
            item.condition = i.condition
            item.free_shipping = i.shipping.free_shipping
            item.sold_quantity = i.sold_quantity
            item.location = i.seller_address.city.name
            response.items.push(Object.assign({}, item))
        })

    }
    else {
        _.forEach(r.data.results, (i) => {
            arrCategories.push(i.category_id)
            full_promises.push(getItem(i.id, false))
        })

        let all = await Promise.all(full_promises)
        response.items = all.map(i => i.item)
    }

    let most_found_category_id = getCategoryFromItems(arrCategories)
    response.categories = await getCategory(most_found_category_id)
    return response
}

const getCategory = async (category_id) => {
    let arrCategories = []
    if (!category_id) throw new Error('category_id no puede estar vacío')
    let r = await axios.get(`${settings.ML.API_URL}/categories/${category_id}`)
    return r.data.path_from_root.map(item => item.name)
}

const getItemDescription = async (id) => {
    let arrCategories = []
    if (!id) throw new Error('id no puede estar vacío')
    let r = await axios.get(`${settings.ML.API_URL}/items/${id}/description`)
    return r.data.plain_text
}

const getItem = async (id, withDescription = true) => {
    if (typeof id !== 'string' || id === '') throw new Error('id no puede estar vacío')

    let response = {
        author: author,
        item: {}
    }
    let prc = {}
    let item = {}
    const { data } = await axios.get(`${settings.ML.API_URL}/items/${id}`)

    item.id = data.id
    item.title = data.title
    item.categories = await getCategory(data.category_id)
    prc.currency = data.currency_id
    prc.amount = Math.floor(data.price)
    prc.decimals = (data.price % 1).toFixed(2).substring(2) 
    item.price = prc
    item.picture = data.picture
    item.pictures = data.pictures
    item.condition = data.condition
    item.free_shipping = data.shipping.free_shipping
    item.sold_quantity = data.sold_quantity
    item.location = data.seller_address.city.name
    if (withDescription){
        item.description = await getItemDescription(data.id)
    }
    response.item = item
    return response
}



export { getItems, getItem }