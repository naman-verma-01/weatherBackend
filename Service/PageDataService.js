const fetch = require('node-fetch')

const getList = async(page) =>{
    let response = {}
    try {

    let pageLength = 10;
    let itemStart = (page*pageLength) - pageLength;
    let itemEnd = page*pageLength;

    var data = []

    for(let i = itemStart + 1 ; i <= itemEnd; i++){
        let cityData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${process.env[`CITY${i}`]}&appid=75e690174fd07fac7c35957677b8d494`)
        cityData = await cityData.json()

        if (cityData && cityData.status) {
            //cityData = cityData.data[0]
            data = [...data,cityData.data[0]]

        }
        
        data = [...data,cityData]
        //console.log(process.env[`CITY${i}`])
    }
    if (data) {
        console.log("data", data)
        response.status = 200,
        response.data = { msg: "Success", data: data }
        return response
    }
    else {
        console.log("Error 400")
        response.status = 400,
        response.data = { msg: "Failure" }
        return response

    }
} catch (error) {
    console.log(error)
    response.status = 500,
    response.data = { msg: error }
    return response

}
}


module.exports = { getList }