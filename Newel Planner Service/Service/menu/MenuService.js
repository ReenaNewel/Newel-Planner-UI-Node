var express = require('express');
var router = express.Router();
var connect = require('../../Data/Connect');
var datamodel = require('../../Data/DataModel');
var dataaccess = require('../../Data/DataAccess');
var dataconn = require('../../Data/DataConnection');
// var mailer = require('../../Common/Mailer'); 
var commonfunc = require('../../Common/CommonFunctions');

var routes = function () {

    router.route('/GetMenubyRoleId/:Id')
    .get(function (req, res) {
        
        try {
            // let user= req.body;
            // let param ={}
            
        var querytext = `SELECT "GetMenuListByRoleId"('${req.params.Id}','abc'); FETCH ALL IN "abc"`;
    //console.log("querytextmenu",querytext);
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
                Message: "Get all Details successfully",
                Data: result
            });
        }, function (err) {
            //console.log(err);
            dataconn.dataconn('MenuService', 'GetMenubyRoleId', err);
            res.status(200).json({ Success: false, Message: ' Geeting Menu API failed.', Data: null });
        });
    }catch(err)    {
        dataconn.dataconn('MenuService', 'GetMenubyRoleId', err);
        res.status(200).json({ Success: false, Message: ' Geeting Menu API failed.', Data: null });
    } 
    });

    router.route('/GetPrimeMenubyRoleId/:Id')
    .get(function (req, res) {
        
        try {
            // let user= req.body;
            // let param ={}
            
        var querytext = `SELECT "GetPrimeMenuListByRoleId"('${req.params.Id}','abc'); FETCH ALL IN "abc"`;
        //console.log("querytextmenu",querytext);
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
            dataconn.dataconn('MenuService', 'GetPrimeMenubyRoleId', err);
            res.status(200).json({ Success: false, Message: ' timesheet Master table API failed.', Data: null });
        });
    }catch(err)    {
        dataconn.dataconn('MenuService', 'GetPrimeMenubyRoleId', err);
        res.status(200).json({ Success: false, Message: ' timesheet Master table API failed.', Data: null });
    } 
    });

    

    router.route('/GetPrimeSubMenubyRoleId')
    .post(function (req, res) {
        
        try {
            // let user= req.body;
            // let param ={}
            
        var querytext = `SELECT "GetPrimeSubMenuListByRoleId"('${req.body.parentid}','${req.body.defaultroleid}','abc'); FETCH ALL IN "abc"`;
        //console.log("querytextmenu",querytext);
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
            console.log("result submenu",result);
            result.shift();
            res.status(200).json({
    
                Success: true,
                Message: "Get all sub menus Details successfully",
                Data: result
            });
        }, function (err) {
            //console.log(err);
            dataconn.dataconn('MenuService', 'GetPrimeSubMenubyRoleId', err);
            res.status(200).json({ Success: false, Message: 'table API failed.', Data: null });
        });
    }catch(err)    {
        dataconn.dataconn('MenuService', 'GetPrimeSubMenubyRoleId', err);
        res.status(200).json({ Success: false, Message: ' table API failed.', Data: null });
    } 
    });



    router.route('/GetAllMenuById/:id')
    .get(function (req, res) {
       try{
            const UIMst = datamodel.tbl_ui_mst();
            const UIRoleMap = datamodel.tbl_ui_Rolemap();
            
            var param = {
                where: { isactive: 1 },
                // attributes: ['id', 'parentid', 'title', 'path', 'icon', 'cssclass', 'ischild'],
                include: [
                    {
                        model: UIRoleMap,
                        // attributes: ['UI_id', 'roleid', 'add', 'edit', 'view'],
                        where: {
                            roleid: req.params.id
                            // [connect.Op.or]: [{ add: { [connect.Op.eq]: 1 } }, { edit: { [connect.Op.eq]: 1 } }, { view: { [connect.Op.eq]: 1 } }]

                        }
                    }
                ],
                // order: ['Sequence']
            };
            //console.log(`UIMst`,UIMst);
            //console.log(`param`, param);
            dataaccess.FindAll(UIMst, param)
                .then(function (result) {
                
                    if (result != null) {
                        //console.log(`result`, result);
                        res.status(200).json({ Success: true, Message: 'Menu access', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User has no access of menu', Data: null });
                    }
                }, function (err) {
                    dataconn.dataconn('MenuService', 'GetAllMenuById', err);
                    res.status(200).json({ Success: false, Message: 'User has no access of menu', Data: null });
                });
       }
       catch(err){
                dataconn.dataconn('MenuService', 'GetAllMenuById', err);
                res.status(200).json({ Success: false, Message: 'User has no access of menu', Data: null });
       }

    });

    router.route('/GetAllActiveMenu')
    .get(function (req, res) {
        try{
            const UIMst = datamodel.tbl_ui_mst();
            var param = { where: { isactive: 1 }, attributes: ['id', 'parentid', 'title'], order: ['Sequence'] };

            dataaccess.FindAll(UIMst, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'Menu access', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User has no access of menu', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('MenuService', 'GetAllActiveMenu', err);
                    res.status(200).json({ Success: false, Message: 'User has no access of menu', Data: null });
                });
        }
        catch(err){
            dataconn.dataconn('MenuService', 'GetAllMenuById', err);
            res.status(200).json({ Success: false, Message: 'User has no access of menu', Data: null });
        }

    });


   return router;
};


module.exports = routes;