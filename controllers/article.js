'use strict'

var controller = {

    raiz:(req, res) => {
    
        return res.status(200).send({
            author: 'stephanie correa'
        });
    }


};

module.exports = controller;