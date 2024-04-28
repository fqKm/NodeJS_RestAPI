const response = (statuscode, massage, data, res) => {
    res.status(200).json({
        status_code : statuscode,
        data : data,
        massage : massage
    })
}

module.exports = response;