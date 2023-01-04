var express = require('express');
var router = express.Router();
var connect = require('./../../Data/Connect');
var datamodel = require('./../../Data/DataModel');
var dataaccess = require('./../../Data/DataAccess');
var dataconn = require('./../../Data/DataConnection');
// var mailer = require('../../Common/Mailer'); 
var commonfunc = require('./../../Common/CommonFunctions');


var routes = function () {
  
    router.route('/GetAllReportsType')
    
    .get(function (req, res) {
        try{
        const Report_type_master = datamodel.Report_type_master();
       
        dataaccess.FindAll(Report_type_master)
            .then(function (result) {
                if (result != null) {
                    //console.log('client' ,result)
                    res.status(200).json({ Success: true, Message: 'Get all Report_type_master successfully', Data: result });
                } else {
                    // dataconn.errorlogger('ClientMasterService', 'GetAllClients', { message: 'No object found', stack: '' });
                    res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
                }
            }, function (err) {
                dataconn.errorlogger('ReportsService', 'GetAllReportsType', err);
                res.status(200).json({ Success: false, Message: ' ReportType Master API Failed.', Data: null });
            });
        }
        catch(err){
            dataconn.errorlogger('ReportsService', 'GetAllReportsType', err);
            res.status(200).json({ Success: false, Message: ' ReportType Master API Failed.', Data: null });
        }
})

router.route('/GetTimesheetReportTypeData')
        .post(function (req, res) {
            try {

            // const UserMST = datamodel.tbl_master_userdetails();
            // dataaccess.FindAll(UserMST)
    var querytext = `SELECT "getAllUserTimesheetData"(:p_Reporttype,:p_fromdate,:p_todate,:p_ref); FETCH ALL IN "abc"`;
    //console.log("querytext",querytext);
    var param = {
        replacements: {
            p_Reporttype:req.body.Reporttype,
            p_fromdate: req.body.fromdate,
            p_todate:req.body.todate,
            p_ref: 'abc'
        },
        type: connect.sequelize.QueryTypes.SELECT
    }
    console.log("Param",param);
    connect.sequelize
    .query(querytext,param)
        .then(function (result) {
           result.shift();
            if (result != null) {
                console.log("Result",result);
                res.status(200).json({ Success: true, Message: 'Get TimesheetReport successfully', Data: result });
            } else {
                // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
                res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
            }
        }, function (err) {
            dataconn.errorlogger('ReportsService', 'GetTimesheetReportTypeData', err);
            res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
        });
    }
    catch(err)    {
        dataconn.errorlogger('ReportsService', 'GetTimesheetReportTypeData', err);
        res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
    } 
})



router.route('/getAllLeaveData')
        .post(function (req, res) {
            try {

            // const UserMST = datamodel.tbl_master_userdetails();
            // dataaccess.FindAll(UserMST)
    var querytext = `SELECT "getAllLeaveDataReport"(:p_Reporttype,:p_fromdate,:p_todate,:p_ref); FETCH ALL IN "abc"`;
    //console.log("querytext",querytext);
    var param = {
        replacements: {
            p_Reporttype:req.body.Reporttype,
            p_fromdate: req.body.fromdate,
            p_todate:req.body.todate,
            p_ref: 'abc'
        },
        type: connect.sequelize.QueryTypes.SELECT
    }
    console.log("Param",param);
    connect.sequelize
    .query(querytext,param)
        .then(function (result) {
           result.shift();
            if (result != null) {
                console.log("Result",result);
                res.status(200).json({ Success: true, Message: 'Get LeaveReport successfully', Data: result });
            } else {
                // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
                res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
            }
        }, function (err) {
            dataconn.errorlogger('ReportsService', 'GetTimesheetReportTypeData', err);
            res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
        });
    }
    catch(err)    {
        dataconn.errorlogger('ReportsService', 'GetTimesheetReportTypeData', err);
        res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
    } 
})


router.route('/getAllProjectData')
        .post(function (req, res) {
            try {

            // const UserMST = datamodel.tbl_master_userdetails();
            // dataaccess.FindAll(UserMST)
    var querytext = `SELECT "getAllProjectReport"(:p_reporttype,:p_fromdate,:p_todate,:p_ref); FETCH ALL IN "abc"`;
    //console.log("querytext",querytext);
    var param = {
        replacements: {
            p_reporttype:req.body.Reporttype,
            p_fromdate: req.body.fromdate,
            p_todate:req.body.todate,
            p_ref: 'abc'
        },
        type: connect.sequelize.QueryTypes.SELECT
    }
    console.log("Param",param);
    connect.sequelize
    .query(querytext,param)
        .then(function (proresult) {
            proresult.shift();
            if (proresult != null) {
                console.log("Result",proresult);
                res.status(200).json({ Success: true, Message: 'Get ProjectReport successfully', Data: proresult });
            } else {
                // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
                res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
            }
        }, function (err) {
            dataconn.errorlogger('ReportsService', 'GetProjectReportData', err);
            res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
        });
    }
    catch(err)    {
        dataconn.errorlogger('ReportsService', 'GetProjectTypeData', err);
        res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
    } 
})

router.route('/getAllTaskDetails')
.post(function (req, res) {
    try {

    // const UserMST = datamodel.tbl_master_userdetails();
    // dataaccess.FindAll(UserMST)
var querytext = `SELECT "getAllTaskDetailsReport"(:p_reporttype,:p_fromdate,:p_todate,:p_ref); FETCH ALL IN "abc"`;
//console.log("querytext",querytext);
var param = {
replacements: {
    p_reporttype:req.body.Reporttype,
    p_fromdate: req.body.fromdate,
    p_todate:req.body.todate,
    p_ref: 'abc'
},
type: connect.sequelize.QueryTypes.SELECT
}
// console.log("Param",param);
connect.sequelize
.query(querytext,param)
.then(function (proresult) {
    proresult.shift();
    if (proresult != null) {
        // console.log("Result",proresult);
        res.status(200).json({ Success: true, Message: 'Get ProjectReport successfully', Data: proresult });
    } else {
        // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
        res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
    }
}, function (err) {
    dataconn.errorlogger('ReportsService', 'GetProjectReportData', err);
    res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
});
}
catch(err)    {
dataconn.errorlogger('ReportsService', 'GetProjectTypeData', err);
res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
} 
})


    return router;
};
module.exports = routes;