var { get, post } = require('./RequestHelper');

const rajaOngkirUrl = process.env.RAJA_ONGKIR_URL;
const rajaOngkirKey = process.env.RAJA_ONGKIR_KEY;

const getProvinces = async () => {
    var url = rajaOngkirUrl + '/province';
    var headers = {
        key: rajaOngkirKey
    }
    var response = await get(url, headers);

    return response.rajaongkir ? response.rajaongkir.results : response;
}

const getCities = async (province_id) => {
    var url = rajaOngkirUrl + '/city';
    var headers = {
        key: rajaOngkirKey
    }
    var params = {
        province: province_id
    }
    var response = await get(url, headers, params);

    return response.rajaongkir ? response.rajaongkir.results : response;
}

module.exports = { getProvinces, getCities }