var express = require('express');
var router = express.Router();
var connect = require('./../../Data/Connect');
var datamodel = require('./../../Data/DataModel');
var dataaccess = require('./../../Data/DataAccess');
var dataconn = require('./../../Data/DataConnection');
// var mailer = require('../../Common/Mailer'); 
var commonfunc = require('./../../Common/CommonFunctions');

var routes = function () {

    router.route('/GetMonthWeek')
        .get(function (req, res) {

            try {
                var querytext = `SELECT "GetWeeklyDetails"(:p_ref); FETCH ALL IN "abc"`;
                //console.log("querytext",querytext);
                var param = {
                    replacements: {
                        p_ref: 'abc'
                    },
                    type: connect.sequelize.QueryTypes.SELECT
                }
                connect.sequelize
                    .query(querytext, param)
                    .then(function (result) {
                        //console.log("result",result);
                        result.shift();
                        res.status(200).json({

                            Success: true,
                            Message: "Get all Records successfully",
                            Data: result
                        });
                    }, function (err) {
                        // //console.log(err);
                        dataconn.errorlogger('WeekelyEffortsService', 'GetWeeklyDetails', err);
                        res.status(200).json({ Success: false, Message: 'API failed.', Data: null });
                    });
            } catch (err) {
                dataconn.errorlogger('WeekelyEffortsService', 'GetWeeklyDetails', err);
                res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
            }
        });







    router.route("/SaveWeekelyEfforts").post(function (req, res) {

        var values = {
            id_ra: req.body.Raname,
            id_user: req.body.resourcename,
            id_week: req.body.monthweekhours,
            id_project: req.body.projectname,
            hours: req.body.hours,
            id_activity: req.body.activityid,
            efforts_planned_by: req.body.userid
        };
        const tbl_weekly_efforts = datamodel.tbl_weekly_efforts();

        dataaccess.Create(tbl_weekly_efforts, values).then(
            function (result) {
                if (result != null) {
                } else {
                    res.status(200).json({
                        Success: false,
                        Message: "Error occurred while saving record",
                        Data: null,
                    });
                }
            },
            function (err) {
                dataconn.errorlogger('LeaveRequest', 'saveleaveRequest', err);
                console.log(`err`, err);
                res.status(200).json({
                    Success: false,
                    Message: "Error occurred while saving record",
                    Data: null,
                });
            }
        );

        res.status(200).json({
            Success: true,
            Message: "Weekely Efforts saved successfully",
            Data: null,
        });
    });



    router.route('/GetWeekelyEffortsTable')
        .get(function (req, res) {

            try {
                var querytext = `SELECT "GetWeeklyEffortsList"(:p_ref); FETCH ALL IN "abc"`;
                //console.log("querytext",querytext);
                var param = {
                    replacements: {
                        p_ref: 'abc'
                    },
                    type: connect.sequelize.QueryTypes.SELECT
                }
                connect.sequelize
                    .query(querytext, param)
                    .then(function (result) {
                        //console.log("result",result);
                        result.shift();
                        res.status(200).json({

                            Success: true,
                            Message: "Get all Records successfully",
                            Data: result
                        });
                    }, function (err) {
                        // //console.log(err);
                        dataconn.errorlogger('WeekelyEffortsService', 'GetWeekelyEffortsTable', err);
                        res.status(200).json({ Success: false, Message: 'API failed.', Data: null });
                    });
            } catch (err) {
                dataconn.errorlogger('WeekelyEffortsService', 'GetWeekelyEffortsTable', err);
                res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
            }
        });
///Reena
router.route('/GetUpcomingWeekSummary')
        .post(function (req, res) {

            try {
                var querytext = `SELECT "GetUpcomingWeekSummary"(:p_usrid,:p_ref); FETCH ALL IN "abc"`;
                //console.log("querytext",querytext);
                var param = {
                    replacements: {
                        p_usrid:req.body.userid,
                        p_ref: 'abc'
                    },
                    type: connect.sequelize.QueryTypes.SELECT
                }
                connect.sequelize
                    .query(querytext, param)
                    .then(function (result) {
                        //console.log("result",result);
                        result.shift();
                        res.status(200).json({

                            Success: true,
                            Message: "Get all Records successfully",
                            Data: result
                        });
                    }, function (err) {
                        // //console.log(err);
                        dataconn.errorlogger('WeekelyEffortsService', 'GetUpcomingWeekSummary', err);
                        res.status(200).json({ Success: false, Message: 'API failed.', Data: null });
                    });
            } catch (err) {
                dataconn.errorlogger('WeekelyEffortsService', 'GetUpcomingWeekSummary', err);
                res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
            }
        });


// Reena

        router.route('/UpdateEffortActiveStatus')
        .post(function (req, res) {

            try {
                var querytext = `update tbl_weekly_efforts set isactive=false where id=${req.body.id}`;
                console.log("querytext",querytext);
                var param = {
                    replacements: {
                        p_ref: 'abc'
                    },
                    type: connect.sequelize.QueryTypes.SELECT
                }
                connect.sequelize
                    .query(querytext, param)
                    .then(function (result) {
                        //console.log("result",result);
                        result.shift();
                        res.status(200).json({

                            Success: true,
                            Message: "update record successfully",
                            Data: null
                        });
                    }, function (err) {
                        // //console.log(err);
                        dataconn.errorlogger('WeekelyEffortsService', 'UpdateEffortActiveStatus', err);
                        res.status(200).json({ Success: false, Message: 'API failed.', Data: null });
                    });
            } catch (err) {
                dataconn.errorlogger('WeekelyEffortsService', 'UpdateEffortActiveStatus', err);
                res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
            }
        });

    router.route('/UpdateWeekelyEfforts')
        .post(function (req, res) {
            try {
                const tbl_weekly_efforts = datamodel.tbl_weekly_efforts();
                var param = {
                    id: req.body.id
                }

                var param1 = {
                    where: {
                        id: req.body.id
                    }
                }

                var values = {
                    id_ra: req.body.Raname,
                    id_user: req.body.resourcename,
                    id_week: req.body.monthweekhours,
                    id_project: req.body.projectname,
                    hours: req.body.hours,
                    id_activity: req.body.activityid,
                    efforts_planned_by: req.body.userid
                };
                //var param = { where: {id: 4}};

                dataaccess.FindOne(tbl_weekly_efforts, param1)
                    .then(function (result) {
                        // //console.log(result)
                        if (result != null) {

                            dataaccess.Update(tbl_weekly_efforts, values, param)
                                .then(function (result) {
                                    if (result != null) {
                                        return res.status(200).json({ Success: true, Message: 'UpdateWeekelyEfforts Record updated Successfully.' });
                                    } else {
                                        return res.status(200).json({ Success: false, Message: 'Updation failed.' });
                                    }
                                })
                        }
                    })
            }
            catch (err) {
                dataconn.errorlogger('WeekelyEffortsService', 'UpdateWeekelyEfforts', err);
                res.status(200).json({ Success: false, Message: ' UpdateWeekelyEfforts API failed.', Data: null });
            };


        });



        router.route("/GetHoursData").post(function (req, res) {
        
            try {
             
                var querytext = `SELECT "GetPendinghours"(:p_userid,:p_weekid,:p_effortid,:p_ref); FETCH ALL IN "abc"`;
                
                var param = {
                    replacements: {
                        p_userid: req.body.userid,
                        p_weekid: req.body.weekeid,
                        p_effortid: req.body.effortid,
                        p_ref: "abc",
                    },
                    type: connect.sequelize.QueryTypes.SELECT,
                };
                connect.sequelize.query(querytext, param).then(
                    function (result) {
                        result.shift();
                        res.status(200).json({
                            Success: true,
                            Message: "Get Hours Details successfully",
                            Data: result,
                        });
                    },
                    function (err) {
                        // //console.log(err);
                        dataconn.errorlogger('WeekelyEffortsService', 'GetHoursData', err);
                        res
                            .status(200)
                            .json({
                                Success: false,
                                Message: "GetHoursData API failed.",
                                Data: null,
                            });
                    }
                );
            } catch (err) {
                dataconn.errorlogger('WeekelyEffortsService', 'GetHoursData', err);
                res
                    .status(200)
                    .json({
                        Success: false,
                        Message: "GetHoursData API failed.",
                        Data: null,
                    });
            }
        });
    
    return router;
};


module.exports = routes;