var express = require('express');
var router = express.Router();
var connect = require('../../../Data/Connect');
var datamodel = require('../../../Data/DataModel');
var dataaccess = require('../../../Data/DataAccess');
var dataconn = require('../../../Data/DataConnection');
var commonfunc = require('../../../Common/CommonFunctions');

var routes = function () {

  router.route('/GetAllAssign')
.post(function (req, res) {
    
    try {
        let user= req.body;
   
    var querytext = `SELECT "GetallUserName"('${user.projectid}','abc'); FETCH ALL IN "abc"`;
//console.log("querytext",querytext);
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
        //console.log("result",result);
        result.shift();
        res.status(200).json({

            Success: true,
            Message: "Get all Assignee successfully",
            Data: result
        }); 
    }, function (err) {
        // //console.log(err);
        dataconn.errorlogger('UserDetailService', 'GetAllAssign', err);
        res.status(200).json({ Success: false, Message: '  table API f ailed.', Data: null });
    });
}catch(err)    {
    dataconn.errorlogger('UserDetailService', 'GetAllAssign', err);
    res.status(200).json({ Success: false, Message: '  table API failed.', Data: null });
}  
}); 

    router.route('/GetAllAssign-old')
        .get(function (req, res) {
            try {

            // const UserMST = datamodel.tbl_master_userdetails();
            var querytext = 'SELECT "GetallUserName"(:p_ref);FETCH ALL IN "abc"';
            var param = {
              replacements: {
                  p_ref: 'abc'
              },
              type: connect.sequelize.QueryTypes.SELECT
          }
            connect.sequelize
            .query(querytext,param)
            // dataaccess.FindAll(UserMST)
            .then(function (result) {
            result.shift();
            if (result != null) {
                res.status(200).json({ Success: true, Message: 'Get all Project Task Type successfully', Data: result });
            } else {
                // dataconn.errorlogger('GenaralMasterService', 'getProjectStatus', { message: 'No object found', stack: '' });
                res.status(200).json({ Success: false, Message: 'Error occurred while Getting record', Data: null });
            }
        }, function (err) {
            dataconn.errorlogger('UserDetailService', 'GetAllAssign', err);
            res.status(200).json({ Success: false, Message: ' User Master table API failed.', Data: null });
        });
    }
    catch(err)    {
        dataconn.errorlogger('UserDetailService', 'GetAllAssign', err);
        res.status(200).json({ Success: false, Message: ' User Master table API failed.', Data: null });
    } 
})
   
         
//get user details by id
router.route("/Getuserdeatils/:id").get(function (req, res) {
  try{
    const userMst = datamodel.tbl_master_userdetails();
    var param = {
      where: { id: req.params.id},
      include: { all: true, nested: true },
    };
    dataaccess.FindAll(userMst, param).then(
      function (result) {
        if (result != null) {
          //console.log("result",result);
          res
            .status(200)
            .json({
              success: true,
              message: "Getting Records Successfully ",
              Data: result,
            });
        }
        else {
          res.status(200).json({
            success: false,
            message: "No Record Found",
            Data: null,
          });
        }
      },
      function (err) {
        dataconn.errorlogger('UserDetailService', 'Getuserdeatils/:id', err);
        res.status(200).json({ Success: false, Message: ' Updation for NewTask table API failed.', Data: null });
        res
          .status(200)
          .json({
            success: false,
            message: "User has no access of userdetails",
            Data: null,
          });
      }
    );
  }
  catch(err){
    dataconn.errorlogger('UserDetailService', 'Getuserdeatils/:id', err);
    res.status(200).json({ Success: false, Message: ' Updation for NewTask table API failed.', Data: null });
    
  }
});            

return router;
};
module.exports = routes;