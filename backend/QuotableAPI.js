const axios = require('axios')

const uri = 'https://api.quotable.io/random'

const getData = async () => {
    return await axios.get(uri).then(response=> response.data.content.split(" "))
}

module.exports = getData