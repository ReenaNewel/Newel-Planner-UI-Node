var express = require('express');
var router = express.Router();
var connect = require('../../Data/Connect');
var datamodel = require('../../Data/DataModel');
var dataaccess = require('../../Data/DataAccess');
var dataconn = require('../../Data/DataConnection');
// var mailer = require('../../Common/Mailer'); 
var commonfunc = require('../../Common/CommonFunctions');
// const { Router } = require('@angular/router');

var routes = function () {

    router.route('/GetAllTimeSheetDetails')
        .post(function (req, res) {
            
            try {
                let user= req.body;
            var querytext = `SELECT "GetallTimesheet"('${user.userid}',:p_ref); FETCH ALL IN "abc"`;
//console.log("querytext",querytext);
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
                //console.log("result",result);
                result.shift();
                res.status(200).json({

                    Success: true,
                    Message: "Get all timesheet Details successfully",
                    Data: result
                });
            }, function (err) {
                //console.log(err);
                dataconn.errorlogger('TimeSheetService', 'GetAllTimeSheetDetails', err);
                res.status(200).json({ Success: false, Message: ' timesheet Mastertable API failed.', Data: null });
            });
        }catch(err)    {
            dataconn.errorlogger('TimeSheetService', 'GetAllTimeSheetDetails', err);
            res.status(200).json({ Success: false, Message: ' timesheet Master table API failed.', Data: null });
        } 
});


router.route('/GetTimesheetProject')
.post(function (req, res) {
    
    try {
        let user= req.body;
   
    var querytext = `SELECT "GetTimesheetProject"('${user.userid}',:p_ref); FETCH ALL IN "abc"`;
//console.log("querytext",querytext);
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
        //console.log("result",result);
        result.shift();
        res.status(200).json({

            Success: true,
            Message: "Get all timesheet Details successfully",
            Data: result
        });
    }, function (err) {
        // //console.log(err);
        dataconn.errorlogger('TimeSheetService', 'GetTimesheetProject', err);
        res.status(200).json({ Success: false, Message: ' timesheet Master table API failed.', Data: null });
    });
}catch(err)    {
    dataconn.errorlogger('TimeSheetService', 'GetTimesheetProject', err);
    res.status(200).json({ Success: false, Message: ' timesheet Master table API failed.', Data: null });
} 
});

// Reena
router.route("/GetTaskname")
.post(function(req,res){
    try {
        let user= req.body;
    if((user.projectid && user.userid !=null)){
   
    var querytext = `SELECT "GetTaskNameByProject"('${user.projectid}','${user.userid}','abc'); FETCH ALL IN "abc"`;
    console.log("querytext project and userid",querytext);
    }
    else
    {
        var querytext = `SELECT "GetTaskProject"('true','${user.userid}','abc'); FETCH ALL IN "abc"`;
        console.log("querytext userid",querytext);
    }

    var param = {
        replacements: {
            // p_active: true,
            p_ref: 'abc'
        },
        type: connect.sequelize.QueryTypes.SELECT
    }
    connect.sequelize
    .query(querytext,param)
    .then(function (result) {
        // //console.log("result",result);
        result.shift();
        res.status(200).json({

            Success: true,
            Message: "Get Projectwise tasknames Details successfully",
            Data: result
        });
    }, function (err) {
        //console.log(err);
        dataconn.errorlogger('TimeSheetService', 'GetTaskname', err);
        res.status(200).json({ Success: false, Message: 'API failed.', Data: null });
    });
}catch(err)    {
    dataconn.errorlogger('TimeSheetService', 'GetTaskname', err);
    res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
} 
  
})
// Reena

router.route("/CreateTimesheet").post(function(req, res) {
    const timesheet = datamodel.tbl_timesheet_details();
    var values = {
       
        projectid :req.body.projectid,
        taskid :req.body.taskid,
        description:req.body.description,
        timeinhours:req.body.timeinhours ,
        timeinminutes : req.body.timeinminutes,
        date:req.body.date ,
        isactive:req.body.isactive,
        activityid :req.body.activityid,
        created_date:req.body.created_date ,
        created_by :req.body.created_by ,
        modified_date :req.body.modified_date ,
        modified_by : req.body.modified_by,
    };
    //console.log('timesheetsave values',values)
    dataaccess.Create(timesheet, values).then(
        function(result) {
            if (result != null) {
                res
                    .status(200)
                    .json({
                        Success: true,
                        Message: "timesheet saved successfully",
                        Data: result,
                    });
            } else {
                dataconn.errorlogger("timesheetService", "Createtimesheet", {
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
        },
        function(err) {
            dataconn.errorlogger('TimeSheetService', 'CreateTimesheet', err);
            res
                .status(200)
                .json({
                    Success: false,
                    Message: "Error occurred while saving record",
                    Data: null,
                });
        }
    );
});

router.route('/UpdateTimesheet')
.post(function (req, res) {
    try {
    const TimesheetDetails = datamodel.tbl_timesheet_details();
    //check once which id takes here
    // var param = {
    //         id : req.body.projectid
    //     }
        var param = {
            id : req.body.id
        }
 
        // var param1 = {
        //     where:{
        //     id : req.body.projectid
        //     }
        // }
        var param1 = {
            where:{
            id : req.body.id
            }
        }
    if(req.body.flag==1)
    {
        var values = {
            projectid:req.body.projectid,
            taskid:req.body.taskid,
            description:req.body.description,
            timeinhours:req.body.timeinhours,
            timeinminutes:req.body.timeinminutes,
            date:req.body.date,
            isactive:req.body.isactive,
            // created_date:req.body.created_date,
            // created_by:req.body.created_by,
            modified_date: req.body.modified_date,
            modified_by:req.body.modified_by,
            // isactive:req.body.isactive,
            activityid:req.body.activityid
        }
    }

    if(req.body.flag==0)
    {
        var values = {
           
            isactive:req.body.isactive,
            modified_date: req.body.modified_date,
            modified_by:req.body.modified_by,
          
        }
    }

    dataaccess.FindOne(TimesheetDetails, param1)
    .then(function (result) {
        //console.log(result)
        if (result != null) {

        dataaccess.Update(TimesheetDetails, values,param)
        .then(function (result) {
        if (result != null) {
            return res.status(200).json({ Success: true, Message: 'Timesheet Record updated Successfully.' });
        } else {
            dataconn.errorlogger('TimeSheetService', 'UpdateTimesheet', err);
            return res.status(200).json({ Success: false, Message: 'Updation failed.' });
        }
        })
        }
    })
}
        catch (err) {
            dataconn.errorlogger('TimeSheetService', 'UpdateTimesheet', err);
            res.status(200).json({ Success: false, Message: ' Confirmation table API failed.', Data: null });
        };


});


router.route("/CreateApprovalTimesheet").post(function(req, res) {
    
    const timesheetApproval = datamodel.tbl_timesheet_approval();
       var values = {      
      
        approval_status :req.body.approval_status,
        task_id :req.body.task_id,
        project_id :req.body.project_id,
        activity_id :req.body.activity_id,
        approval_date :req.body.date,
        userid :req.body.userid,
        ra_id :req.body.ra_id,
        created_date:req.body.created_date ,
        created_by :req.body.created_by ,
        modified_date :req.body.modified_date ,
        modified_by : req.body.modified_by,
    };
    //console.log(`values`, values);
    dataaccess.Create(timesheetApproval, values).then(
        function(result) {
            if (result != null) {
                res
                    .status(200)
                    .json({
                        Success: true,
                        Message: " Approval Sent successfully",
                        Data: result,
                    });
            } else {
                dataconn.errorlogger("timesheetService", "CreatetimesheetApproval", {
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
        },
        function(err) {
            dataconn.errorlogger("timesheetService", "CreatetimesheetApproval", err);
            res
                .status(200)
                .json({
                    Success: false,
                    Message: "Error occurred while saving record",
                    Data: null,
                });
        }
    );
});

router.route('/GetTimesheetDashboard')
.post(function (req, res) {
    
    try {
        let user= req.body;
   
    var querytext = `SELECT "timesheetdashboard"('${user.day}','${user.userid}','abc'); FETCH ALL IN "abc"`;
//console.log("querytext",querytext);
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
        //console.log("result",result);
        result.shift();
        res.status(200).json({

            Success: true,
            Message: "Get all timesheet Details successfully",
            Data: result
        }); 
    }, function (err) {
        // //console.log(err);
        dataconn.errorlogger('TimesheetService', 'GetTimesheetDashboard', err);
        res.status(200).json({ Success: false, Message: ' timesheet Master table API f ailed.', Data: null });
    });
}catch(err)    {
    dataconn.errorlogger('TimesheetService', 'GetTimesheetDashboard', err);
    res.status(200).json({ Success: false, Message: ' timesheet Master table API failed.', Data: null });
}  
}); 
 
    return router;
};


module.exports = routes;