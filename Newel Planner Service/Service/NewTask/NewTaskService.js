var express = require('express');
var router = express.Router();
var connect = require('./../../Data/Connect');
var datamodel = require('./../../Data/DataModel');
var dataaccess = require('./../../Data/DataAccess');
var dataconn = require('./../../Data/DataConnection');
var commonfunc = require('./../../Common/CommonFunctions');

var routes = function () {

    router.route('/GetAllNewTask')
        .get(function (req, res) {
            try {
            var querytext = 'SELECT "getallTask"(:p_active,:p_ref);FETCH ALL IN "abc"';
            var param = {
                replacements: {
                    p_active: true,
                    p_ref: 'abc'
                },
                type: connect.sequelize.QueryTypes.SELECT
            }
            connect.sequelize
            .query(querytext,param)
            .then(function (result) {
                result.shift();
                console.log('result...',result)
                res.status(200).json({
                    Success: true,
                    Message: "Get all Task Details successfully",
                    Data: result
                });
            }, function (err) {
                // dataconn.ARC_Errorlogger('homepageService', 'getConfirmDetails', err);
                res.status(200).json({ Success: false, Message: ' NewTask table API failed.', Data: null });
            });
        }catch(err)    {
            res.status(200).json({ Success: false, Message: ' NewTask table API failed.', Data: null });
        }
});
// for create or save opreation
router.route('/CreateNewTask')
        .post(function (req, res) {
            try{
            const NewTaskMst = datamodel.tbl_task_details();
            const NewAssignDetails = datamodel.tbl_task_assignee_details();
            
            var values = {

                id: req.body.id,  
                projectid: req.body.projectid,
                taskname: req.body.taskname,
                tasktypeid: req.body.tasktypeid,
                created_by: req.body.created_by,
                efforts: req.body.efforts,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                status:req.body.status,
                // attachment: req.body.attachment,
                comments: req.body.comments,
             };
            // console.log("values",values)

            dataaccess.Create(NewTaskMst, values)
                .then(function (result) {
                    if (result != null)
                     {
                        console.log('result',result.id)
                        var values = {
                            taskid:result.id,
                            userid:req.body.userid,
                            isactive:true
                        }
                        dataaccess.Create(NewAssignDetails, values)
                        .then(function(result){
                            if (result != null) {
                                res.status(200).json({ Success: true, Message: 'New Task saved successfully', Data: result });
                    }
                    else {
                        dataconn.errorlogger('NewTaskService', 'CreateNewTask', { message: 'No object found', stack: '' });
                        res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
                    }
                            
                        })
                    }
                        
                }, function (err) {
                    dataconn.errorlogger('NewTaskService', 'CreateNewTask', err);
                    res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
                });
            }
            catch(err){
                res.status(200).json({ Success: false, Message: ' Saving in CreateNewTask table API failed.', Data: null });

            }
        });

// Reena
router.route('/UpdateTask')
        .post(function (req, res) {
        try{
            const NewTaskMst = datamodel.tbl_task_details();
            const NewAssignDetails = datamodel.tbl_task_assignee_details();
            var param = {
            
                    id : req.body.id
        
            }

            var param2 ={
                where :{
                    id : req.body.id
                }
            }
            var values = {
                projectid: req.body.projectid,
                taskname: req.body.taskname,
                tasktypeid: req.body.tasktypeid,
                created_by: req.body.created_by,
                efforts: req.body.efforts,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                status:req.body.status,
                attachment: req.body.attachment,
                comments: req.body.comments,
             };
            // console.log("values",values)
            dataaccess.FindOne(NewTaskMst,param2)
                .then(function (result) {
                    if (result != null)

                    {
                        dataaccess.Update(NewTaskMst,values,param)
                        .then(function (result) {
                        if (result != null) {
                            var param1 ={
                                
                                    taskid : req.body.id
                             
                            }

                            var param3 ={
                                where :{
                                    taskid : req.body.id
                                }
                            }
                            var values1 = {
                                // taskid:result.id,
                                userid:req.body.userid,
                                isactive:true
                            }
                            // console.log('values1', values1)
                            dataaccess.FindOne(NewAssignDetails,param3)
                            .then(function(result){
                                if (result != null) {
                                    console.log('hi')
                                    dataaccess.Update(NewAssignDetails,values1,param1)
                                    .then(function (result) {
                                        console.log(result)
                                        if (result != null) {
                                            return res.status(200).json({ Success: true, Message: ' Record updated Successfully.' });
                                        }
                                        else
                                        {
                                            return res.status(200).json({ Success: false, Message: 'Updation failed.' });
                                        }
                                    })
                                }

                            })
                           
                        }
                        
                        })
                    }
                })
            }
            catch(err)    {
                res.status(200).json({ Success: false, Message: ' Updation for NewTask table API failed.', Data: null });
            }
});

       
// for create or save opreation for Task Assignee
router.route('/CreateTaskAssigneeDetails')
        .post(function (req, res) {

            const TaskAssigneeMst = datamodel.tbl_task_assignee_details();
            var values = {

                id: req.body.id,  
                taskid: req.body.taskid,
                userid: req.body.userid,
                isactive: req.body.isactive,
               
             };
            console.log("values",values)

            dataaccess.Create(TaskAssigneeMst, values)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'Task Assignee saved successfully', Data: result });
                    }
                    else {
                        dataconn.errorlogger('TaskAssigneeService', 'CreateTaskAssigneeDetails', { message: 'No object found', stack: '' });
                        res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('TaskAssigneeService', 'CreateTaskAssigneeDetails', err);
                    res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
                });
        });
    //task_assigneee_details---End   

router.route('/GetProjectNameByuser')
    .post(function (req, res) {
        try {
            
        var querytext = 'SELECT "GetProjectNameByUserId"(:p_active,:p_userid,:p_ref); FETCH ALL IN "abc"';
          
        var param = {
            replacements: {
                p_active: true,
                p_userid:req.body.p_userid,
                p_ref: 'abc'
            },
            type: connect.sequelize.QueryTypes.SELECT
        }
         connect.sequelize
        .query(querytext,param)
        .then(function (result) {
            result.shift();
            console.log('result...',result)
            res.status(200).json({
                Success: true,
                Message: "Get all user Details successfully",
                Data: result
            });
        }, function (err) {
            dataconn.errorlogger('EmployeeProjectService', 'GetProjectNameByuser', err);
            res.status(200).json({ Success: false, Message: ' NewTask table API failed.', Data: null });
        });
    }catch(err)    {
        dataconn.errorlogger('EmployeeProjectService', 'GetProjectNameByuser', err);
        res.status(200).json({ Success: false, Message: '  table API failed.', Data: null });
    }
});

// for task details by specific user
router.route('/GetTaskDetailsByuser')
    .post(function (req, res) {
        try {
            
        var querytext = 'SELECT "GetTaskDetailsByUserId"(:p_active,:p_userid,:p_projectid,:p_ref); FETCH ALL IN "abc"';
          
        var param = {
            replacements: {
                p_active: true,
                p_userid:req.body.p_userid,
                p_projectid:req.body.p_projectid,
                p_ref: 'abc'
            },
            type: connect.sequelize.QueryTypes.SELECT
        }
         connect.sequelize
        .query(querytext,param)
        .then(function (result) {
            result.shift();
            console.log('result...',result)
            res.status(200).json({
                Success: true,
                Message: "Get all Task Details successfully",
                Data: result
            });
        }, function (err) {
            dataconn.errorlogger('EmployeeProjectService', 'GetTaskDetailsByuser', err);
            res.status(200).json({ Success: false, Message: ' NewTask table API failed.', Data: null });
        });
    }catch(err)    {
        dataconn.errorlogger('EmployeeProjectService', 'GetTaskDetailsByuser', err);
        res.status(200).json({ Success: false, Message: '  table API failed.', Data: null });
    }
});


    return router;
};
module.exports = routes;