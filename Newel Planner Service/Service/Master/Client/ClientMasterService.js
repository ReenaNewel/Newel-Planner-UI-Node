var express = require('express');
var router = express.Router();
var datamodel = require('../../../Data/DataModel');
var dataaccess = require('../../../Data/DataAccess');
var dataconn = require('../../../Data/DataConnection');
// var mailer = require('../../Common/Mailer');
var commonfunc = require('../../../Common/CommonFunctions');

var routes = function () {

    router.route('/GetAllClients')
    
        .get(function (req, res) {
            try{
            const ClientMst = datamodel.tbl_master_clientmaster();
           
            dataaccess.FindAll(ClientMst)
                .then(function (result) {
                    if (result != null) {
                        console.log('client' ,result)
                        res.status(200).json({ Success: true, Message: 'Get all Client successfully', Data: result });
                    } else {
                        // dataconn.errorlogger('ClientMasterService', 'GetAllClients', { message: 'No object found', stack: '' });
                        res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
                    }
                }, function (err) {
                    // dataconn.ARC_Errorlogger('ClientMasterService', 'GetAllClients', err);
                    res.status(200).json({ Success: false, Message: ' Client Master API Failed.', Data: null });
                });
            }
            catch(err){
                res.status(200).json({ Success: false, Message: ' Client Master API Failed.', Data: null });
            }
})

router.route('/GetSelectedClients')
    
        .post(function (req, res) {
            try{
            const ClientMst = datamodel.tbl_master_clientmaster();
            var param = {
                where: {
                    id:req.body.id
                }
            };
            dataaccess.FindAll(ClientMst,param)
                .then(function (result) {
                    if (result != null) {
                        console.log('client' ,result)
                        res.status(200).json({ Success: true, Message: 'Get all Client successfully', Data: result });
                    } else {
                        // dataconn.errorlogger('ClientMasterService', 'GetAllClients', { message: 'No object found', stack: '' });
                        res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
                    }
                }, function (err) {
                    // dataconn.ARC_Errorlogger('ClientMasterService', 'GetAllClients', err);
                    res.status(200).json({ Success: false, Message: ' Client Master API Failed.', Data: null });
                });
            }
            catch(err){
                res.status(200).json({ Success: false, Message: ' Client Master API Failed.', Data: null });
            }
})


    return router;
};


module.exports = routes;