var connect = require('./Connect');
var datamodel = require('./DataModel');
var dataaccess = require('./DataAccess');

/// CheckConnection function used to check a database connection using API
module.exports.CheckConnection = function (res) {
    connect.sequelize
        .authenticate()
        .then(function (result) {
             res.status(200).json({ Success: true, Message: 'Connection has been establised successfully', Data: null });
        }, function (err) {
            // //console.log("result",res);
            res.status(200).json({ Success: false, Message: 'Unable to connect to the database : ' + err, Data: null });
        });
}

/// CreateTable function used to create Database tables using API
module.exports.CreateTable = function (res) {

    datamodel.Error_Log();
    // datamodel.tbl_master_holiday();
   
    connect.sequelize.sync()
        .then(() => {
            res.status(200).json({ Success: true, Message: 'Tables updated', Data: null });
        })
}

/// errorlogger function used to insert error logs into Error log table
module.exports.errorlogger = function (servicename, functionname, errorobj) {

    var err = 'Message : ' + errorobj.message + '\n' + 'Stack : ' + errorobj.stack;

    var values = {
        servicename: servicename,
        functionname: functionname,
        Errorsubject: errorobj.message
    };

    dataaccess.Create(datamodel.Error_Log(), values)
        .then(function (result) {
            //console.log(JSON.stringify(result));
        }, function (err) {
            //console.log('Error: ' + JSON.stringify(err));
        });
}

/// mailerrorlogger function used to insert mail error logs into Maillog table
module.exports.maillogger = function (mailobj) {

    const MailLog = datamodel.MailLog();

    var values = {
        assetId: mailobj.assetId,
        mailTo: mailobj.mailTo,
        mailFrom: mailobj.mailFrom,
        mailCc: mailobj.mailCc,
        mailSubject: mailobj.mailSubject,
        mailBody: mailobj.mailBody,
        messageId: mailobj.messageId,
        mailStatus: mailobj.mailStatus,
    };

    dataaccess.Create(MailLog, values)
        .then(function (result) {
            if (result == null)
                module.exports.errorlogger('Mailer', 'Mailerrorlogger', { message: 'No object found', stack: '' });
        }, function (err) {
            module.exports.errorlogger('Mailer', 'Mailerrorlogger', err);
        });
}

