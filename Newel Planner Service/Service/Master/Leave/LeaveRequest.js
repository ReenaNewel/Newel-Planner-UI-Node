var express = require("express");
var router = express.Router();

var connect = require("../../../Data/Connect");
var datamodel = require("../../../Data/DataModel");
var dataaccess = require("../../../Data/DataAccess");
var datacon = require("../../../Data/DataConnection");
var commonfunc = require("../../../Common/CommonFunctions");
var routes = function () {

    router.route("/GetLeaveRequestData").post(function (req, res) {
        //console.log(`req.body`, req.body);
        try {

            var querytext = `SELECT "GetLeaveDetails"(:p_userid,:p_ref); FETCH ALL IN "abc"`;
            //console.log("querytext", querytext);
            var param = {
                replacements: {
                    p_userid: req.body.userid,
                    p_ref: "abc",
                },
                type: connect.sequelize.QueryTypes.SELECT,
            };
            connect.sequelize.query(querytext, param).then(
                function (result) {
                    result.shift();
                    res.status(200).json({
                        Success: true,
                        Message: "Get all Leave Details successfully",
                        Data: result,
                    });
                },
                function (err) {
                    // //console.log(err);
                    datacon.errorlogger('LeaveRequest', 'GetLeaveRequestData', err);
                    res
                        .status(200)
                        .json({
                            Success: false,
                            Message: "LeaveRequest API failed.",
                            Data: null,
                        });
                }
            );
        } catch (err) {
            datacon.errorlogger('LeaveRequest', 'GetLeaveRequestData', err);
            res
                .status(200)
                .json({
                    Success: false,
                    Message: "LeaveRequest API failed.",
                    Data: null,
                });
        }
    });





    router.route('/getLeaveTypeDetails')
        .get(function (req, res) {
            try {
                const GeneralMst = datamodel.tbl_general_master();

                var param = {
                    where: {
                        parentid: 6 ,
                        isactive: true
                    }, order: [['typeid']]
                };
                //console.log(param)
                dataaccess.FindAll(GeneralMst, param)
                    .then(function (result) {
                        if (result != null) {
                            res.status(200).json({ Success: true, Message: 'Get all Leave Details types successfully', Data: result });
                        } else {
                            // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
                            res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
                        }
                    }, function (err) {
                        datacon.errorlogger('LeaveRequest', 'getLeaveTypeDetails', err);
                        res.status(200).json({ Success: false, Message: 'Get all Leave Details types API failed.', Data: null });
                    });
            }
            catch (err) {
                datacon.errorlogger('LeaveRequest', 'getLeaveTypeDetails', err);
                res.status(200).json({ Success: false, Message: 'Get all Leave Details types API failed.', Data: null });
            }
        })




    router.route('/getRAIId')
        .post(function (req, res) {
            try {
                var param = {
                    where: {
                        userid: req.body.userid,
                        isactive: true
                    }
                };


                const tbl_master_ra_mapping = datamodel.tbl_master_ra_mapping();

                //console.log(param)
                dataaccess.FindOne(tbl_master_ra_mapping, param)
                    .then(function (result) {
                        if (result != null) {
                            res.status(200).json({ Success: true, Message: 'Get all getRAID API successfully', Data: result });
                        } else {
                            // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
                            res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
                        }
                    }, function (err) {
                        datacon.errorlogger('LeaveRequest', 'getRAIId', err);
                        res.status(200).json({ Success: false, Message: 'Get all getRAID API  failed.', Data: null });
                    });
            }
            catch (err) {
                datacon.errorlogger('LeaveRequest', 'getRAIId', err);
                res.status(200).json({ Success: false, Message: 'Get all getRAID API  failed.', Data: null });
            }
        })


    router.route("/SaveLeaveRequest").post(function (req, res) {

        var values = {

            user_id: req.body.userid,
            //  roleid: req.body.roleid[i],
            description: req.body.reason,
            no_of_leaves: req.body.leaveno,
            fromdate: req.body.fromdate,
            todate: req.body.todate,
            leave_type: req.body.leave_name,
            created_date: req.body.created_date,
            created_by: req.body.created_by,
            ra_id: req.body.ra_id,
            status: 1,

        };

        const tbl_leave_details = datamodel.tbl_leave_details();

        dataaccess.Create(tbl_leave_details, values).then(
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
                datacon.errorlogger('LeaveRequest', 'saveleaveRequest', err);
                //console.log(`err`, err);
                res.status(200).json({
                    Success: false,
                    Message: "Error occurred while saving record",
                    Data: null,
                });
            }
        );

        res.status(200).json({
            Success: true,
            Message: "Leave Request saved successfully",
            Data: null,
        });
    });


    router.route("/UpdateLeaveRequestDetails").post(function (req, res) {
        try {
            var reqbody = req.body;
            console.log('update requestbody', reqbody);
            var querytext = ` SELECT "updateleaverequest"(:p_id,:p_userid,:p_description,
                :p_no_of_leaves,:p_fromdate,:p_todate,:p_leave_type,:p_ra_id,:p_leavestatus,:p_created_date,:p_created_by)`;
            var param = {
                replacements: {
                    p_id: req.body.id,
                    p_userid: req.body.userid,
                    p_description: req.body.reason,
                    p_no_of_leaves: req.body.leaveno,
                    p_fromdate: req.body.fromdate,
                    p_todate: req.body.todate,
                    p_leave_type: req.body.leave_name,
                    p_ra_id: req.body.ra_id,

                   // p_cancel_status: req.body.cancel_status,
                    p_leavestatus: req.body.leavestatus,
                    p_created_date: req.body.created_date,
                    p_created_by: req.body.created_by,
                   
                },
                type: connect.sequelize.QueryTypes.SELECT,
            };
            console.log(`param`, param);
            connect.sequelize.query(querytext, param).then(
                function (result) {
                    res.status(200).json({
                        Success: true,
                        Message: "Update Task Status successfully",
                        Data: null,
                    });
                },
                function (err) {
                    res
                        .status(200)
                        .json({
                            Success: false,
                            Message: "tbl_task_status table API failed.",
                            Data: null,
                        });
                }
            );


        } catch (err) {
            res
                .status(200)
                .json({
                    Success: false,
                    Message: "tbl_task_status table API failed.",
                    Data: null,
                });
        }

    });

    router.route("/CancelLeaveRequestDetails").post(function (req, res) {
        try {
            var reqbody = req.body;
            console.log('cancel requestbody', reqbody);

            // var querytext = ` SELECT "cancelleaverequest"(:p_id,:p_userid,:p_cancel_status,:p_leavestatus)`;
            var querytext = ` SELECT "cancelleaverequest"(:p_id,:p_userid,:p_cancel_status,:p_leavestatus,:p_description,:p_no_of_leaves,:p_fromdate,:p_todate,:p_leave_type,:p_created_date,:p_created_by,:p_ra_id)`;
            var param = {
                replacements: {

                    p_id: req.body.id,
                    p_userid: req.body.userid,
                    p_cancel_status: req.body.cancel_status,
                    p_leavestatus: req.body.leavestatus,
                    p_description: req.body.reason,
                    p_no_of_leaves: req.body.leaveno,
                    p_fromdate: req.body.fromdate,
                    p_todate: req.body.todate,
                    p_leave_type: req.body.leave_name,
                    p_created_date: req.body.created_date,
                    p_created_by: req.body.created_by,
                    p_ra_id: req.body.ra_id,
                },
                type: connect.sequelize.QueryTypes.SELECT,
            };
            console.log(`param`, param);
            connect.sequelize.query(querytext, param).then(
                function (result) {
                    res.status(200).json({

                        Success: true,
                        Message: "Update Task Status successfully",
                        Data: null,
                    });

                },
                function (err) {
                    res
                        .status(200)
                        .json({
                            Success: false,
                            Message: "tbl_task_status table API failed.",
                            Data: null,
                            
                        });
                        console.log(err);
                }
            );


        } catch (err) {
            res
                .status(200)
                .json({
                    Success: false,
                    Message: "tbl_task_status table API failed.",
                    Data: null,
                });
                console.log(err);
        }

    });

    router.route("/GetLeaveDetailsforApproval").post(function (req, res) {
        //console.log(`req.body`, req.body);
        try {

            var querytext = `SELECT "GetLeaveDetailsforApproval"(:p_userid,:p_ref); FETCH ALL IN "abc"`;
            //console.log("querytext", querytext);
            var param = {
                replacements: {
                    p_userid: req.body.userid,
                    p_ref: "abc",
                },
                type: connect.sequelize.QueryTypes.SELECT,
            };
            connect.sequelize.query(querytext, param).then(
                function (result) {
                    result.shift();
                    res.status(200).json({
                        Success: true,
                        Message: "Get GetLeaveDetailsforApproval Details successfully",
                        Data: result,
                    });
                },
                function (err) {
                    // //console.log(err);
                    datacon.errorlogger('LeaveRequest', 'GetLeaveDetailsforApproval', err);
                    res
                        .status(200)
                        .json({
                            Success: false,
                            Message: "LeaveRequest API failed.",
                            Data: null,
                        });
                }
            );
        } catch (err) {
            datacon.errorlogger('LeaveRequest', 'GetLeaveDetailsforApproval', err);
            res
                .status(200)
                .json({
                    Success: false,
                    Message: "LeaveRequest API failed.",
                    Data: null,
                });
        }
    });


    router.route("/RejectLeaveRequestDetails").post(function (req, res) {
        try {
            var reqbody = req.body;
            console.log('update requestbody', reqbody);

            var querytext = ` SELECT "rejectleaverequest"(:p_id,:p_userid,:p_remark)`;
            var param = {
                replacements: {

                    p_id: req.body.id,
                    p_userid: req.body.userid,

                    p_remark: req.body.reason,
                    // p_no_of_leaves: req.body.leaveno,
                    // p_fromdate: req.body.fromdate,
                    // p_todate: req.body.todate,
                    // p_leave_type: req.body.leave_name,
                    // created_date = req.body.created_date;
                    // created_by = req.body.created_by;
                    // p_ra_id: req.body.ra_id

                    // p_taskid :reqbody.taskid,
                    //   p_statusid :reqbody.statusid,
                    //   p_created_by: reqbody.userid,

                },
                type: connect.sequelize.QueryTypes.SELECT,
            };
            console.log(`param`, param);
            connect.sequelize.query(querytext, param).then(
                function (result) {
                    res.status(200).json({

                        Success: true,
                        Message: "Update Task Status successfully",
                        Data: null,
                    });

                },
                function (err) {
                    res
                        .status(200)
                        .json({
                            Success: false,
                            Message: "tbl_task_status table API failed.",
                            Data: null,
                        });
                }
            );


        } catch (err) {
            res
                .status(200)
                .json({
                    Success: false,
                    Message: "tbl_task_status table API failed.",
                    Data: null,
                });
        }

    });



    router.route("/ApproveLeaveRequestDetails").post(function (req, res) {
        try {
            var reqbody = req.body;
            console.log('update requestbody', reqbody);

            var querytext = `SELECT "approveleaverequest"(:p_id,:p_appuserid,:p_leavestatus,:p_user_id)`;
            var param = {
                replacements: {

                    p_id: req.body.id,
                    p_appuserid: req.body.userid,
                    p_leavestatus: req.body.leavestatus,
                    p_user_id: req.body.user_id
                },
                type: connect.sequelize.QueryTypes.SELECT,
            };
            console.log(`param`, param);
            connect.sequelize.query(querytext, param).then(
                function (result) {
                    res.status(200).json({

                        Success: true,
                        Message: "Update Task Status successfully",
                        Data: null,
                    });

                },
                function (err) {
                    res
                        .status(200)
                        .json({
                            Success: false,
                            Message: "tbl_task_status table API failed.",
                            Data: null,
                        });
                }
            );


        } catch (err) {
            res
                .status(200)
                .json({
                    Success: false,
                    Message: "tbl_task_status table API failed.",
                    Data: null,
                });
        }

    });


    // router.route('/getBalancedLeave')
    //     .post(function (req, res) {
    //         try {
    //             const employee_balanced_leaves = datamodel.employee_balanced_leaves();

    //             var param = {
    //                 where: {
    //                     userId: req.body.userid
    //                 }
    //             };
    //             //console.log(param)
    //             dataaccess.FindAll(employee_balanced_leaves, param)
    //                 .then(function (result) {
    //                     if (result != null) {
    //                         res.status(200).json({ Success: true, Message: 'Get all Leave Details types successfully', Data: result });
    //                     } else {
    //                         // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
    //                         res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
    //                     }
    //                 }, function (err) {
    //                     console.log(err);
    //                     datacon.errorlogger('LeaveRequest', 'getLeaveTypeDetails', err);
    //                     res.status(200).json({ Success: false, Message: 'Get all Leave Details types API failed.', Data: null });
    //                 });
    //         }
    //         catch (err) {
    //             console.log(err);
    //             datacon.errorlogger('LeaveRequest', 'getLeaveTypeDetails', err);
    //             res.status(200).json({ Success: false, Message: 'Get all Leave Details types API failed.', Data: null });
    //         }
    //     })




        router.route("/getBalancedLeave").post(function (req, res) {
            //console.log(`req.body`, req.body);
            try {
    
                var querytext = `SELECT "BalanceLeaveDetails"(:p_userid,:p_ref); FETCH ALL IN "abc"`;
                //console.log("querytext", querytext);
                var param = {
                    replacements: {
                        p_userid: req.body.userid,
                        p_ref: "abc",
                    },
                    type: connect.sequelize.QueryTypes.SELECT,
                };
                connect.sequelize.query(querytext, param).then(
                    function (result) {
                        result.shift();
                        res.status(200).json({
                            Success: true,
                            Message: "Get all Balance Leave Details successfully",
                            Data: result,
                        });
                    },
                    function (err) {
                        // //console.log(err);
                        datacon.errorlogger('LeaveRequest', 'getBalancedLeave', err);
                        res
                            .status(200)
                            .json({
                                Success: false,
                                Message: "LeaveRequest API failed.",
                                Data: null,
                            });
                    }
                );
            } catch (err) {
                datacon.errorlogger('LeaveRequest', 'getBalancedLeave', err);
                res
                    .status(200)
                    .json({
                        Success: false,
                        Message: "LeaveRequest API failed.",
                        Data: null,
                    });
            }
        });
    

    return router;
};

module.exports = routes;
