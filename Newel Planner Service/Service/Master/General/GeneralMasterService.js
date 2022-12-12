var express = require('express');
var router = express.Router();
// D:\Reena Newel\NEWEL PLANNER\NewelPlanner Node\NewelPlanner-Backend\Data\Connect.js
var connect = require('../../../Data/Connect');
var datamodel = require('../../../Data/DataModel');
var dataaccess = require('../../../Data/DataAccess');
var dataconn = require('../../../Data/DataConnection');
// var mailer = require('../../Common/Mailer');
var commonfunc = require('../../../Common/CommonFunctions');

var routes = function () {

    router.route('/getProjectStatus/:id')
        .get(function (req, res) {
            try{
            const GeneralMst = datamodel.tbl_general_master();

            var param = {
                where: {
                    parentid:req.params.id
                }
            };
            //console.log(param)
            dataaccess.FindAll(GeneralMst, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'Get all Project Status successfully', Data: result });
                    } else {
                        // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
                        res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', err);
                    res.status(200).json({ Success: false, Message: ' Genaral Master table API failed.', Data: null });
                });
            }
            catch(err)    {
                dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', err);
                res.status(200).json({ Success: false, Message: ' General Master table API failed.', Data: null });
            } 
})

router.route('/getAllTaskTypes')
.get(function (req, res) {
    try{
    const GeneralMst = datamodel.tbl_general_master();

    var param = {
        where: {
            parentid:50
        }
    };
    //console.log(param)
    dataaccess.FindAll(GeneralMst, param)
        .then(function (result) {
            if (result != null) {
                res.status(200).json({ Success: true, Message: 'Get all ProjectTaskType Status successfully', Data: result });
            } else {
                // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
                res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
            }
        }, function (err) {
            dataconn.errorlogger('GenaralMasterService', 'getAllTaskTypes', err);
            res.status(200).json({ Success: false, Message: ' Genaral Master table API failed.', Data: null });
        });
    }
    catch(err)    {
        dataconn.errorlogger('GenaralMasterService', 'getAllTaskTypes', err);
        res.status(200).json({ Success: false, Message: ' General Master table API failed.', Data: null });
    } 
})


router.route('/getAllTasks')
.get(function (req, res) {
    try{
    const GeneralMst = datamodel.tbl_general_master();

    var param = {
        where: {
            parentid:102
        }
    };
    //console.log(param)
    dataaccess.FindAll(GeneralMst, param)
        .then(function (result) {
            if (result != null) {
                res.status(200).json({ Success: true, Message: 'Get all ProjectTaskType Status successfully', Data: result });
            } else {
                res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
            }
        }, function (err) {
            dataconn.errorlogger('GenaralMasterService', 'getAllTasks', err);
            res.status(200).json({ Success: false, Message: ' Genaral Master table API failed.', Data: null });
        });
    }
    catch(err)    {
        dataconn.errorlogger('GenaralMasterService', 'getAllTasks', err);
        res.status(200).json({ Success: false, Message: ' General Master table API failed.', Data: null });
    } 
})


    return router;
};


module.exports = routes;