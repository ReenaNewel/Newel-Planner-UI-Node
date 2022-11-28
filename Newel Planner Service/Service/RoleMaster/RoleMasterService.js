var express = require("express");
var router = express.Router();
var connect = require("../../Data/Connect");
var datamodel = require("../../Data/DataModel");
var dataaccess = require("../../Data/DataAccess");
var dataconn = require("../../Data/DataConnection");
// var mailer = require('../../Common/Mailer');
var commonfunc = require("../../Common/CommonFunctions");
// const { Router } = require('@angular/router');

var routes = function () {
  router
    .route("/GetAllRole")

    .get(function (req, res) {
      try {
        const GeneralMst = datamodel.tbl_general_master();

        var param = {
          where: {
            parentid: 110,
          },
        };

        console.log(param);

        dataaccess
          .FindAll(GeneralMst, param)

          .then(
            function (result) {
              if (result != null) {
                res
                  .status(200)
                  .json({
                    Success: true,
                    Message: "Get all ProjectTaskType Status successfully",
                    Data: result,
                  });
              } else {
                // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });

                res
                  .status(200)
                  .json({
                    Success: false,
                    Message: "Error occurred while Getting record",
                    Data: null,
                  });
              }
            },
            function (err) {
              // dataconn.ARC_Errorlogger('GenaralMasterService', 'getProjectStatus', err);

              res
                .status(200)
                .json({
                  Success: false,
                  Message: " Genaral Master table API failed.",
                  Data: null,
                });
            }
          );
      } catch (err) {
        res
          .status(200)
          .json({
            Success: false,
            Message: " General Master table API failed.",
            Data: null,
          });
      }
    });

  router.route("/SaveProjectUserRoleMapping").post(function (req, res) {
    console.log(`req.body`, req.body.roleid.length);
    for (var i = 0; i < req.body.roleid.length; i++) {
      var values = {
        projectid: req.body.projectid,
        userid: req.body.userid,
        roleid: req.body.roleid[i],
        created_date: req.body.created_date,
        created_by: req.body.created_by,
      };
      const userRole = datamodel.tbl_userproject_mapping();
     
      dataaccess.Create(userRole, values).then(
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
          // dataconn.errorlogger("timesheetService", "Createtimesheet", err);
          console.log(`err`, err);
          res.status(200).json({
            Success: false,
            Message: "Error occurred while saving record",
            Data: null,
          });
        }
      );
    }
    res.status(200).json({
      Success: true,
      Message: "timesheet saved successfully",
      Data: null,
    });
  });

  router.route("/GetUserRoleProjectDetails").post(function (req, res) {
    console.log(`req.body`, req.body);
    try {
      //  let user= req.body;
      var querytext = `SELECT "GetUserRoleProjectMapping"(:p_projectid,:p_ref); FETCH ALL IN "abc"`;
      console.log("querytext", querytext);
      var param = {
        replacements: {
          p_projectid: req.body.projectid,
          p_ref: "abc",
        },
        type: connect.sequelize.QueryTypes.SELECT,
      };
      connect.sequelize.query(querytext, param).then(
        function (result) {
          console.log("result", result);
          result.shift();
          res.status(200).json({
            Success: true,
            Message: "Get all timesheet Details successfully",
            Data: result,
          });
        },
        function (err) {
          console.log(err);
          // dataconn.ARC_Errorlogger('homepageService', 'getConfirmDetails', err);
          res
            .status(200)
            .json({
              Success: false,
              Message: " timesheet Mastertable API failed.",
              Data: null,
            });
        }
      );
    } catch (err) {
      res
        .status(200)
        .json({
          Success: false,
          Message: " timesheet Master table API failed.",
          Data: null,
        });
    }
  });
  return router;
};

module.exports = routes;
