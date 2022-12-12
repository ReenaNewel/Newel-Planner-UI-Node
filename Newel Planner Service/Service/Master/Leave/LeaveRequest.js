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
                        parentid: 6
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
                        isactive:true
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

    return router;
};

module.exports = routes;
