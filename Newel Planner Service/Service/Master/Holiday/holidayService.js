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

    router.route('/NewHoliday')
        .get(function (req, res) {

            const holidaymst = datamodel.tbl_master_holiday();

            var param = {
                where: {
                    isactive: true,
                }
            };

           
            dataaccess.FindAll(holidaymst, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'Get all Hollday successfully', Data: result });
                    } else {
                        dataconn.errorlogger('holidayService', 'NewHoliday', { message: 'No object found', stack: '' });
                        res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
                    }
                }, function (err) {
                    dataconn.ARC_Errorlogger('holidayService', 'NewHoliday', err);
                    res.status(200).json({ Success: false, Message: ' Holiday Master table API failed.', Data: null });
                });
})

    return router;
};


module.exports = routes;