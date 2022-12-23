var express = require("express");
var router = express.Router();
var connect = require("./../../Data/Connect");
var datamodel = require("./../../Data/DataModel");
var dataaccess = require("./../../Data/DataAccess");
var dataconn = require("./../../Data/DataConnection");
var commonfunc = require("./../../Common/CommonFunctions");
var assigneeID=0;
var routes = function () {
  
  router.route("/GetAllNewTask").post(function (req, res) {
    console.log(`req.body`, req.body);
    try {
      var querytext =
        'SELECT "getallTask"(:p_createdy,:p_active,:p_ref);FETCH ALL IN "abc"';
      var param = {
        replacements: {     
          p_createdy:req.body.Createdby,
          p_active: true,
          p_ref: "abc",
        },
        type: connect.sequelize.QueryTypes.SELECT,
      };
      connect.sequelize.query(querytext, param).then(
        function (result) {
          result.shift();
          // //console.log('result...',result)
          res.status(200).json({
            Success: true,
            Message: "Get all Task Details successfully",
            Data: result,
          });
        },
        function (err) {
          dataconn.errorlogger("NewTaskService", "GetAllNewTask", err);
          res
            .status(200)
            .json({
              Success: false,
              Message: " NewTask table API failed.",
              Data: null,
            });
        }
      );
    } catch (err) {
      dataconn.errorlogger("NewTaskService", "GetAllNewTask", err);
      res
        .status(200)
        .json({
          Success: false,
          Message: " NewTask table API failed.",
          Data: null,
        });
    }
  });

  router.route("/GetAllUsersByProjectID").post(function (req, res) {
    try {
      var querytext =
        'SELECT "getUserNameByProject"(:p_projectid,:p_active,:p_ref);FETCH ALL IN "abc"';
      var param = {
        replacements: {
          p_projectid: req.body.projectid,
          p_active: true,
          p_ref: "abc",
        },
        type: connect.sequelize.QueryTypes.SELECT,
      };
      connect.sequelize.query(querytext, param).then(
        function (result) {
          result.shift();
          // //console.log('result...',result)
          res.status(200).json({
            Success: true,
            Message: "Get all user Details successfully",
            Data: result,
          });
        },
        function (err) {
          dataconn.errorlogger("NewTaskService", "GetAllUsersByProjectID", err);
          res
            .status(200)
            .json({
              Success: false,
              Message: " NewTask table API failed.",
              Data: null,
            });
        }
      );
    } catch (err) {
      dataconn.errorlogger("NewTaskService", "GetAllUsersByProjectID", err);
      res
        .status(200)
        .json({
          Success: false,
          Message: " NewTask table API failed.",
          Data: null,
        });
    }
  });
  // for create or save opreation
  // commented by reena for single assignee id
  // router.route('/CreateNewTask')
  //         .post(function (req, res) {
  //             try{
  //             const NewTaskMst = datamodel.tbl_task_details();
  //             const NewAssignDetails = datamodel.tbl_task_assignee_details();

  //             var values = {

  //                 id: req.body.id,
  //                 projectid: req.body.projectid,
  //                 taskname: req.body.taskname,
  //                 tasktypeid: req.body.tasktypeid,
  //                 created_by: req.body.created_by,
  //                 efforts: req.body.efforts,
  //                 startdate: req.body.startdate,
  //                 enddate: req.body.enddate,
  //                 status:req.body.status,
  //                 // attachment: req.body.attachment,
  //                 comments: req.body.comments,
  //              };
  //             // //console.log("values",values)

  //             dataaccess.Create(NewTaskMst, values)
  //                 .then(function (result) {
  //                     if (result != null)
  //                      {
  //                         //console.log('result',result.id)
  //                         var values = {
  //                             taskid:result.id,
  //                             userid:req.body.userid,
  //                             isactive:true
  //                         }
  //                         dataaccess.Create(NewAssignDetails, values)
  //                         .then(function(result){
  //                             if (result != null) {
  //                                 res.status(200).json({ Success: true, Message: 'New Task saved successfully', Data: result });
  //                     }
  //                     else {
  //                         // dataconn.errorlogger('NewTaskService', 'CreateNewTask', { message: 'No object found', stack: '' });
  //                         res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
  //                     }

  //                         })
  //                     }

  //                 }, function (err) {
  //                     dataconn.errorlogger('NewTaskService', 'CreateNewTask', err);
  //                     res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
  //                 });
  //             }
  //             catch(err){
  //                 dataconn.errorlogger('NewTaskService', 'CreateNewTask', { message: 'No object found', stack: '' });
  //                 res.status(200).json({ Success: false, Message: ' Saving in CreateNewTask table API failed.', Data: null });

  //             }
  //         });

  router.route("/CreateNewTask").post(function (req, res) {
    console.log(`req.body`, req.body);

    try {
      const NewTaskMst = datamodel.tbl_task_details();
      const NewAssignDetails = datamodel.tbl_task_assignee_details();
      const NewTaskStatus = datamodel.tbl_task_status();

      var values = {
        id: req.body.id,
        projectid: req.body.projectid,
        taskname: req.body.taskname,
        tasktypeid: req.body.tasktypeid,
        created_by: req.body.created_by,
        efforts: req.body.efforts,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        status: req.body.status,
        // attachment: req.body.attachment,
        comments: req.body.comments,
      };
      // console.log("values",values)

      dataaccess.Create(NewTaskMst, values).then(
        function (result) {
          if (result != null) 
          var requserid = req.body.userid;
          console.log(' requserid ', requserid )
          for (let i = 0; i < requserid.length; i++) {
            {
              // console.log('result',result.id)
              var values = {
                taskid: result.id,
                userid: req.body.userid[i],
                isactive: true,
              };
              // console.log(`value in NewAssignDetails`, values );
              dataaccess
                .Create(NewAssignDetails, values)
                .then(function (resultA) {
                  if (resultA != null) {
                    console.log(`result created id`, resultA);
                    assigneeID = resultA.id;
                    console.log(`assigneeID`, assigneeID);
                    model = {
                      taskId: result.id,
                      statusId: req.body.status,
                      createdDate: new Date(),
                      created_by: req.body.created_by,
                      assigneeId: assigneeID,
                      active: true
                    };
                    // console.log(`value in NewAssignDetails`, model);
                    dataaccess.Create(NewTaskStatus, model)
                      .then(function (resultS) {
                        if (resultS != null) {
                          // res.status(200).json({ Success: true, Message: 'New Task saved successfully', Data: result });
                        }
                      });
                  } else {
                    dataconn.errorlogger("NewTaskService", "CreateNewTask", {
                      message: "No object found",
                      stack: "",
                    });
                    res
                      .status(200)
                      .json({
                        Success: false,
                        Message: "Error occurred while saving record",
                        Data: null,
                      });
                  }
                });
            }
          }
          // console.log('requserid',requserid)

          // Reena Task status update

          // Reena Task status
          res
            .status(200)
            .json({
              Success: true,
              Message: "New Task saved successfully",
              Data: result,
            });
        },
        function (err) {
          dataconn.errorlogger("NewTaskService", "CreateNewTask", err);
          res
            .status(200)
            .json({
              Success: false,
              Message: "Error occurred while saving record",
              Data: null,
            });
        }
      );

      // res.status(200).json({ Success: true, Message: 'New Task saved successfully', Data: result });
    } catch (err) {
      res
        .status(200)
        .json({
          Success: false,
          Message: " Saving in CreateNewTask table API failed.",
          Data: null,
        });
    }
  });

  // Reena
  router.route("/UpdateTask").post(function (req, res) {
    try {
      const NewTaskMst = datamodel.tbl_task_details();
      const NewAssignDetails = datamodel.tbl_task_assignee_details();
      const Statusdetails = datamodel.tbl_task_status();
      var param = {
        id: req.body.id,
      };

      var param2 = {
        where: {
          id: req.body.id,
        },
      };
      var values = {
        projectid: req.body.projectid,
        taskname: req.body.taskname,
        tasktypeid: req.body.tasktypeid,
        created_by: req.body.created_by,
        efforts: req.body.efforts,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        status: req.body.status,
        // attachment: req.body.attachment,
        comments: req.body.comments,
      };
      dataaccess.FindOne(NewTaskMst, param2).then(function (result) {
        if (result != null) {
          dataaccess.Update(NewTaskMst, values, param).then(function (result) {
            if (result != null) {
              var param1 = {
                id: req.body.unqid,
              };

              var param3 = {
                where: {
                  // id: req.body.unqid,
                  id: req.body.unqid,
                },
              };
              var values1 = {
                // taskid:result.id,
                userid: req.body.userid,
                isactive: true,
              };
              console.log("values1", values1);
              dataaccess
                .FindOne(NewAssignDetails, param3)
                .then(function (result) {
                  if (result != null) {
                    dataaccess
                      .Update(NewAssignDetails, values1, param1)
                      .then(function (result) {
                        if (result != null) {

                        }
                      });
                  }
                });
                var paramStatus = {
                    
                      // id: req.body.unqid,
                      assigneeId: req.body.unqid
                    
                  };
                  console.log(`paramStatus`, paramStatus);
                var valuesstatus = {
                    // taskid:result.id,
                    statusId: req.body.status
                  };
                  console.log("valuesstatus", valuesstatus);
                dataaccess
                .Update(Statusdetails, valuesstatus, paramStatus)
                .then(function (resultS) {
                  if (resultS != null) {
                     res
                      .status(200)
                      .json({
                        Success: true,
                        Message: " Record updated Successfully.",
                      });
                  } else {
                     res
                      .status(200)
                      .json({
                        Success: false,
                        Message: "Updation failed.",
                      });
                  }
                });

            }
          });
        }
      });
    } catch (err) {
      dataconn.errorlogger("NewTaskService", "UpdateTask", {
        message: "No object found",
        stack: "",
      });
      res
        .status(200)
        .json({
          Success: false,
          Message: " Updation for NewTask table API failed.",
          Data: null,
        });
    }
  });

  // for create or save opreation for Task Assignee
  router.route("/CreateTaskAssigneeDetails").post(function (req, res) {
    try {
      const TaskAssigneeMst = datamodel.tbl_task_assignee_details();
      var values = {
        id: req.body.id,
        taskid: req.body.taskid,
        userid: req.body.userid,
        isactive: req.body.isactive,
      };
      //console.log("values",values)

      dataaccess.Create(TaskAssigneeMst, values).then(
        function (result) {
          if (result != null) {
            res
              .status(200)
              .json({
                Success: true,
                Message: "Task Assignee saved successfully",
                Data: result,
              });
          } else {
            // dataconn.errorlogger('TaskAssigneeService', 'CreateTaskAssigneeDetails', { message: 'No object found', stack: '' });
            res
              .status(200)
              .json({
                Success: false,
                Message: "Error occurred while saving record",
                Data: null,
              });
          }
        },
        function (err) {
          dataconn.errorlogger(
            "TaskAssigneeService",
            "CreateTaskAssigneeDetails",
            err
          );
          res
            .status(200)
            .json({
              Success: false,
              Message: "Error occurred while saving record",
              Data: null,
            });
        }
      );
    } catch (err) {
      dataconn.errorlogger(
        "TaskAssigneeService",
        "CreateTaskAssigneeDetails",
        err
      );
      res
        .status(200)
        .json({
          Success: false,
          Message: "Error occurred while saving record",
          Data: null,
        });
    }
  });
  //task_assigneee_details---End

  router.route("/GetProjectNameByuser").post(function (req, res) {
    try {
      var querytext =
        'SELECT "GetProjectNameByUserId"(:p_active,:p_userid,:p_ref); FETCH ALL IN "abc"';

      var param = {
        replacements: {
          p_active: true,
          p_userid: req.body.p_userid,
          p_ref: "abc",
        },
        type: connect.sequelize.QueryTypes.SELECT,
      };
      connect.sequelize.query(querytext, param).then(
        function (result) {
          result.shift();
          //console.log('result...',result)
          res.status(200).json({
            Success: true,
            Message: "Get all user Details successfully",
            Data: result,
          });
        },
        function (err) {
          dataconn.errorlogger(
            "EmployeeProjectService",
            "GetProjectNameByuser",
            err
          );
          res
            .status(200)
            .json({
              Success: false,
              Message: " NewTask table API failed.",
              Data: null,
            });
        }
      );
    } catch (err) {
      dataconn.errorlogger(
        "EmployeeProjectService",
        "GetProjectNameByuser",
        err
      );
      res
        .status(200)
        .json({ Success: false, Message: "  table API failed.", Data: null });
    }
  });

  // for task details by specific user
  router.route("/GetTaskDetailsByuser").post(function (req, res) {
    try {
      var querytext =
        'SELECT "GetTaskDetailsByUserIdDashboard"(:p_active,:p_userid,:p_projectid,:p_ref); FETCH ALL IN "abc"';

      var param = {
        replacements: {
          p_active: true,
          p_userid: req.body.p_userid,
          p_projectid: req.body.p_projectid,
          p_ref: "abc",
        },
        type: connect.sequelize.QueryTypes.SELECT,
      };
      connect.sequelize.query(querytext, param).then(
        function (result) {
          result.shift();
          //console.log('result...',result)
          res.status(200).json({
            Success: true,
            Message: "Get all Task Details successfully",
            Data: result,
          });
        },
        function (err) {
          dataconn.errorlogger(
            "EmployeeProjectService",
            "GetTaskDetailsByuser",
            err
          );
          res
            .status(200)
            .json({
              Success: false,
              Message: " NewTask table API failed.",
              Data: null,
            });
        }
      );
    } catch (err) {
      dataconn.errorlogger(
        "EmployeeProjectService",
        "GetTaskDetailsByuser",
        err
      );
      res
        .status(200)
        .json({ Success: false, Message: "  table API failed.", Data: null });
    }
  });

  router.route("/UpdateStatusTaskDetails").post(function (req, res) {
    try {
      var reqbody = req.body;
      console.log("update requestbody", reqbody);
      userid = reqbody.userid;
      projectid = reqbody.projectid;

      var querytext = `SELECT " "(:p_taskid,:p_statusid,:p_created_by,:p_UnqId)`;
      var param = {
        replacements: {
          p_taskid: reqbody.taskId,
          p_statusid: reqbody.statusId,
          p_created_by: reqbody.created_by,
          p_UnqId:reqbody.unqid
        },
        type: connect.sequelize.QueryTypes.SELECT,
      };
      console.log(`param`, param);
      connect.sequelize.query(querytext, param).then(
        function (result) {
          console.log(`result`, result);
          res.status(200).json({
            Success: true,
            Message: "Update Task Status successfully",
            
          });
        },
        function (err) {
          console.log(`err`, err);
          res.status(200).json({
            Success: false,
            Message: "tbl_task_status table API failed.",
            Data: null,
          });
        }
      );
    } catch (err) {
      console.log(`err`, err);
      res.status(200).json({
        Success: false,
        Message: "tbl_task_status table API failed.",
        Data: null,
      });
    }
  });

// TAsk Summary Tab
  router.route('/GetOverdueTaskData')
  .post(function (req, res) {
      try {
          var querytext = 'SELECT "GetOverdueTasks"(:overduetype,:p_userid,:p_ref); FETCH ALL IN "abc"';

          var param = {
              replacements: {
                  overduetype: req.body.member,
                  p_userid: req.body.userid,
                  p_ref: 'abc'
              },
              type: connect.sequelize.QueryTypes.SELECT
          }
          console.log('overdue param', param)
          
          connect.sequelize
              .query(querytext, param)
              .then(function (result) {
                  result.shift();
                  //console.log('result...',result)
                  res.status(200).json({
                      Success: true,
                      Message: "Get all Overdue Details successfully",
                      Data: result
                  });
              }, function (err) {
                  dataconn.errorlogger('NewTaskService', 'GetOverdueTaskData', err);
                  res.status(200).json({ Success: false, Message: ' NewTask table API failed.', Data: null });
              });
      } catch (err) {
          dataconn.errorlogger('NewTaskService', 'GetOverdueTaskData', err);
          res.status(200).json({ Success: false, Message: '  table API failed.', Data: null });
      }
  });


  router.route('/GetUpcomingdeadlines')
  .post(function (req, res) {
      try {

          var querytext = 'SELECT "upcomingdeadlines"(:overduetype,:p_userid,:p_ref); FETCH ALL IN "abc"';

          var param = {
              replacements: {
                  overduetype: req.body.member,
                  p_userid: req.body.userid,
                  p_ref: 'abc'
              },
              type: connect.sequelize.QueryTypes.SELECT
          }
          connect.sequelize
              .query(querytext, param)
              .then(function (result) {
                  result.shift();
                  //console.log('result...',result)
                  res.status(200).json({
                      Success: true,
                      Message: "Get all Overdue Details successfully",
                      Data: result
                  });
              }, function (err) {
                  dataconn.errorlogger('NewTaskService', 'GetOverdueTaskData', err);
                  res.status(200).json({ Success: false, Message: ' NewTask table API failed.', Data: null });
              });
      } catch (err) {
          dataconn.errorlogger('NewTaskService', 'GetOverdueTaskData', err);
          res.status(200).json({ Success: false, Message: '  table API failed.', Data: null });
      }
  });


  router.route('/GetProjectNames')
  .post(function (req, res) {
      try {

          var querytext = 'SELECT "GetProjectNameForTimesheetDashboard"(:p_userid,:p_ref); FETCH ALL IN "abc"';

          var param = {
              replacements: {
                  p_userid: req.body.userid,
                  p_ref: 'abc'
              },
              type: connect.sequelize.QueryTypes.SELECT
          }
          connect.sequelize
              .query(querytext, param)
              .then(function (result) {
                  result.shift();
                  //console.log('result...',result)
                  res.status(200).json({
                      Success: true,
                      Message: "Get all GetProjectNames Details successfully",
                      Data: result
                  });
              }, function (err) {
                  dataconn.errorlogger('NewTaskService', 'GetProjectNames', err);
                  res.status(200).json({ Success: false, Message: ' NewTask table API failed.', Data: null });
              });
      } catch (err) {
          dataconn.errorlogger('NewTaskService', 'GetProjectNames', err);
          res.status(200).json({ Success: false, Message: '  table API failed.', Data: null });
      }
  });


  router.route('/GetProjectTaskStatusSummary')
  .post(function (req, res) {
      try {

          var querytext = 'SELECT "getProjectTaskStatusSummary"(:p_projectid,:p_ref); FETCH ALL IN "abc"';

          var param = {
              replacements: {
                  p_projectid: req.body.projectid,
                  p_ref: 'abc'
              },
              type: connect.sequelize.QueryTypes.SELECT
          }
          connect.sequelize
              .query(querytext, param)
              .then(function (result) {
                  result.shift();
                  //console.log('result...',result)
                  res.status(200).json({
                      Success: true,
                      Message: "Get all GetProjectNames Details successfully",
                      Data: result
                  });
              }, function (err) {
                  dataconn.errorlogger('NewTaskService', 'GetProjectNames', err);
                  res.status(200).json({ Success: false, Message: ' NewTask table API failed.', Data: null });
              });
      } catch (err) {
          dataconn.errorlogger('NewTaskService', 'GetProjectNames', err);
          res.status(200).json({ Success: false, Message: '  table API failed.', Data: null });
      }
  });


  return router;
};
module.exports = routes;
