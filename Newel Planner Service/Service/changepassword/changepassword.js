var express = require('express');
var router = express.Router();
var connect = require('../../Data/Connect');
var datamodel = require('../../Data/DataModel');
var dataaccess = require('../../Data/DataAccess');
var dataconn = require('../../Data/DataConnection');
// var mailer = require('../../Common/Mailer'); 
var commonfunc = require('../../Common/CommonFunctions');
const client = require('../../connect_old.js');

var routes = function () {
    router.route('/changePassword')
            .post(function (req, res){
        try{
            let userid = req.body.userid;
            let password = req.body.password;
          
            if (userid && password) {
                 
                let insertQuery =`SELECT * FROM tbl_master_userdetails WHERE id = '${userid}' AND password =LOWER('${password}')  `     
                client.query(insertQuery,function(error, results, fields) {
                    if (results.rowCount > 0) {
                        res.status(200).json({ Success: true, Message: 'you have entered Correct Passowrd', Data: results });
                    } else {
                        res.status(200).json({ Success: false, Message: 'you have entered wrong password', Data: null });
                    }			
                });
            } else {
                dataconn.errorlogger('changePassword', 'changePassword', err);
                res.send('Please enter correct Password!');
                
            }
    }
    catch(err){
        dataconn.errorlogger('changePassword', 'changePassword', err);
        res.status(200).json({ Success: false, Message: 'wrong passoword.', Data: null });
    }
    });



router.route('/UpdatePassword')
                .post(function (req, res) {
        
                    const UserMst = datamodel.tbl_master_userdetails();
        
                    var values = {password: req.body.password};
                    var param = {id: req.body.userid};
        
                    dataaccess.Update(UserMst, values, param)
                    .then(function (result) {
                        if(result != null){
                            res.status(200).json({Success: true, Message: 'Password changed successfully', Data:result});
                        }else
                        {
                            dataconn.errorlogger('PasswordService', 'UpdatePassword', { message : 'No object found', stack: '' });
                            res.status(200).json({Success: false, Message: 'Error occurred while updating record', Data: null });
                        }
                    },
                    function(err){
                        dataconn.errorlogger('PasswordService', 'UpdatePassword', err);
                        res.status(200).json({Success: false, Message: 'Error occurred while updating record', Data: null });
                     });
                });
                return router;
     

return router;
};
module.exports = routes;