var express = require('express');
var router = express.Router();
var connect = require('../../Data/Connect');
var datamodel = require('../../Data/DataModel');
var dataaccess = require('../../Data/DataAccess');
var dataconn = require('../../Data/DataConnection');
// var mailer = require('../../Common/Mailer'); 
var commonfunc = require('../../Common/CommonFunctions');

var routes = function () {

router.route('/GetRADetails')
.get(function (req, res) {
    
    try {
        
    var querytext = `SELECT "getUserNameRAName"(:p_active,:p_ref); FETCH ALL IN "abc"`;
console.log("querytext",querytext);
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
        console.log("result",result);
        result.shift();
        res.status(200).json({

            Success: true,
            Message: "Get all Records successfully",
            Data: result
        });
    }, function (err) {
        console.log(err);
        
        res.status(200).json({ Success: false, Message: 'API failed.', Data: null });
    });
}catch(err)    {
    res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
} 
});


//get all ra and user names
router.route('/GetAllRaUser')
        .get(function (req, res) {
            try {

            // const UserMST = datamodel.tbl_master_userdetails();
            // dataaccess.FindAll(UserMST)
    var querytext = `SELECT "getallRAMapUser"(:p_active,:p_ref); FETCH ALL IN "abc"`;
    console.log("querytext",querytext);
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
            if (result != null) {
                res.status(200).json({ Success: true, Message: 'Get all RA and user successfully', Data: result });
            } else {
                // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
                res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
            }
        }, function (err) {
            // dataconn.ARC_Errorlogger('GenaralMasterService', 'getProjectStatus', err);
            res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
        });
    }
    catch(err)    {
        res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
    } 
})


router.route('/GetAllRa')
        .get(function (req, res) {
            try {

            // const UserMST = datamodel.tbl_master_userdetails();
            // dataaccess.FindAll(UserMST)
    var querytext = `SELECT * from public.tbl_master_userdetails`;
    console.log("querytext",querytext);
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
            if (result != null) {
                res.status(200).json({ Success: true, Message: 'Get all RA successfully', Data: result });
            } else {
                // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
                res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
            }
        }, function (err) {
            // dataconn.ARC_Errorlogger('GenaralMasterService', 'getProjectStatus', err);
            res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
        });
    }
    catch(err)    {
        res.status(200).json({ Success: false, Message: ' API failed.', Data: null });
    } 
})


// to insert ra and employee names
router.route('/CreateRAandUserdetails')
        .post(function (req, res) {

            const RAUserMst = datamodel.tbl_master_ra_mapping();
            var values = {

                id: req.body.id,  
                userid: req.body.userid,
                ra_id: req.body.ra_id,
                created_by:req.body.created_by,
                isactive:req.body.isactive
                
            };
            console.log("values",values)

            dataaccess.Create(RAUserMst, values)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'RA Mapping saved successfully', Data: result });
                    }
                    else {
                        dataconn.errorlogger('RamappingService', 'CreateRAUserDetails', { message: 'No object found', stack: '' });
                        res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('RamappingService', 'CreateRAUserDetails', err);
                    res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
                });
        });
    
// update RA and employee

router.route("/UpdateRAUser").post(function (req, res) {
    const RAMst = datamodel.tbl_master_ra_mapping();
    var values = {
      userid:req.body.userid,
      ra_id: req.body.ra_id,
      modified_date:req.body.modified_date,
      modified_by:req.body.modified_by,
      isactive:true
    };
    var values1={
        isactive : false
    }
  var param = { where: {userid: req.body.userid}};
  console.log(param);
  var param1 ={userid: req.body.userid}
  dataaccess.FindOne(RAMst,param).then(
    function (result){
        if (result != null) {
            console.log(result);
           
            dataaccess.Update(RAMst,values1,param1).then(
                function(result){
                    if (result != null) {
                        console.log(result);
                    //   res.status(200).json({ Success: true, Message: "RAMst updated successfully", Data: null });
                    }
                    // else {
                      
                    //     // res.status(200).json({ Success: false, Message: "Error occurred while updating record", Data: null, });
                    //   }
                      dataaccess.Create(RAMst,values).then(
                        function(result){
                            if (result != null) {
                                res.status(200).json({ Success: true, Message: 'RA Mapping saved successfully', Data: null });
                            }
                            else {
                                dataconn.errorlogger('RamappingService', 'CreateRAUserDetails', { message: 'No object found', stack: '' });
                                res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
                            }
                        },function (err) {
                            dataconn.errorlogger('RamappingService', 'CreateRAUserDetails', err);
                            res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
                        });
                      })
                    }
                })
});
return router;
};
module.exports = routes;