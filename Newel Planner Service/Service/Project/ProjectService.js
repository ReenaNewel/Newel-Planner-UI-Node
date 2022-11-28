var express = require('express');
var router = express.Router();
var connect = require('./../../Data/Connect');
var datamodel = require('./../../Data/DataModel');
var dataaccess = require('./../../Data/DataAccess');
var dataconn = require('./../../Data/DataConnection');
// var mailer = require('../../Common/Mailer'); 
var commonfunc = require('./../../Common/CommonFunctions');

var routes = function () {

    router.route('/GetAllProjects')
        .get(function (req, res) {
            try {

            var querytext = 'SELECT "getallProject"(:p_active,:p_ref);FETCH ALL IN "abc"';

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
                res.status(200).json({

                    Success: true,
                    Message: "Get all Project Details successfully",
                    Data: result
                });
            }, function (err) {
                // dataconn.ARC_Errorlogger('homepageService', 'getConfirmDetails', err);
                res.status(200).json({ Success: false, Message: ' Project Mastertable API failed.', Data: null });
            });
        }catch(err)    {
            res.status(200).json({ Success: false, Message: ' Project Master table API failed.', Data: null });
        } 
});


router.route('/InsertProjects')
.post(function (req, res) {
    try {
    const ProjectMst = datamodel.tbl_master_project();
 
    var param = {
        name:req.body.name,
        activity:req.body.activity,
        clientid:req.body.clientid,
        fromdate:req.body.fromdate,
        todate:req.body.todate,
        owner:req.body.owner,
        isactive:req.body.isactive,
        created_date:req.body.created_date,
        created_by:req.body.created_by,
        projecttype: req.body.projecttype,
        plannedeffort:req.body.plannedeffort,
        projectstage:req.body.projectstage,
        projectstatus:req.body.projectstatus
    }
    console.log(param)
    dataaccess.Create(ProjectMst, param)
    .then(function (result) {

        if (result != null) {
            return res.status(200).json({ Success: true, Message: ' New Project Added Successfully.' });
        } else {
            return res.status(200).json({ Success: false, Message: 'Saving failed.' });
        }
    })
}
        catch (err) {
            dataconn.ARC_Errorlogger('homepageService', 'InsertConfirmStatus', err);
            res.status(200).json({ Success: false, Message: ' Confirmation table API failed.', Data: null });
        };


});

router.route('/UpdateProjects')
.post(function (req, res) {
    try {
    const ProjectMst = datamodel.tbl_master_project();
    var param = {
            id : req.body.projectid
        }
 
        var param1 = {
            where:{
            id : req.body.projectid
            }
        }
 
    var values = {
        name:req.body.name,
        activity:req.body.activity,
        clientid:req.body.clientid,
        fromdate:req.body.fromdate,
        todate:req.body.todate,
        owner:req.body.owner,
        isactive:req.body.isactive,
        created_date:req.body.created_date,
        created_by:req.body.created_by,
        projecttype: req.body.projecttype,
        plannedeffort:req.body.plannedeffort,
        projectstage:req.body.projectstage,
        projectstatus:req.body.projectstatus
    }
    dataaccess.FindOne(ProjectMst, param1)
    .then(function (result) {
        console.log(result)
        if (result != null) {

        dataaccess.Update(ProjectMst, values,param)
        .then(function (result) {
        if (result != null) {
            return res.status(200).json({ Success: true, Message: 'Project Record updated Successfully.' });
        } else {
            return res.status(200).json({ Success: false, Message: 'Updation failed.' });
        }
        })
        }
    })
}
        catch (err) {
            // dataconn.ARC_Errorlogger('homepageService', 'InsertConfirmStatus', err);
            res.status(200).json({ Success: false, Message: ' Confirmation table API failed.', Data: null });
        };


});

router.route('/GetAllProjectName')
        .get(function (req, res) {
          const ProjectMST = datamodel.tbl_master_project();
            dataaccess.FindAll(ProjectMST)
            .then(function (result) {
                console.log('project',result)
            if (result != null) {
                res.status(200).json({ Success: true, Message: 'Get all Project Task Type successfully', Data: result });
            } else {
                // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
                res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
            }
        });
});

    return router;
};


module.exports = routes;