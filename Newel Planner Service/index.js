const client = require('./connect_old.js');
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var config = require('./Config');
var dataconn = require('./Data/DataConnection');


// app.listen(8686, ()=>{
//     //console.log("Sever is now listening at port 8686");
// })

// client.connect();
var bodyParser = require('body-parser');
const { clearCache } = require('ejs');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// CORS Middleware node.js package for connect express
app.use(function (req, res, next) {
    var menthods = "GET, POST";
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", menthods);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");
    if (!menthods.includes(req.method.toUpperCase())) {
        return res.status(200).json({});
    };
    next();
});
var server = app.listen(config.service_port, function() {
    var host = server.address().address;
    var port = server.address().port;
    var datetime = new Date();
    var message = "Server :- " + host + " running on Port : - " + port + " Started at :- " + datetime;
    //console.log(message);
});
const staticImageRootLocal = path.join(__dirname);
app.use(express.static(staticImageRootLocal));
client.connect();


// Connection checking method
app.get("/api/CheckConnection", function (req, res) {
    dataconn.CheckConnection(res);
});
var HolidayService = require('./Service/Master/Holiday/holidayService')();
app.use("/Holiday", HolidayService);

var ProjectService = require('./Service/Project/ProjectService')();
app.use("/Project", ProjectService);


var GeneralMasterService = require('./Service/Master/General/GeneralMasterService')();
app.use("/General", GeneralMasterService);

var ClientMasterService = require('./Service/Master/Client/ClientMasterService')();
app.use("/Client", ClientMasterService);

var NewTaskService = require('./Service/NewTask/NewTaskService')();
app.use("/NewTask", NewTaskService);

var UserDetailService = require('./Service/Master/User/UserDetailService')();
app.use("/UserDetails", UserDetailService);

var TimeSheetService = require('./Service/TimeSheet/timeSheetService')();
app.use("/timesheet", TimeSheetService);

var RaMappingService = require('./Service/RAmapping/RamappingService')();
app.use("/RAMapping", RaMappingService);

var MenuService = require('./Service/menu/MenuService')();
app.use("/Menu", MenuService);

var LeaveRequest = require('./Service/Master/Leave/LeaveRequest')();
app.use("/Leave", LeaveRequest);

var RoleMaster = require('./Service/RoleMaster/RoleMasterService')();
app.use("/RoleMaster", RoleMaster);

// ******************************************************************************************************************
// Ashlesha
app.get('/users', (req, res)=>{
    try{
    client.query(`Select tbl_master_userdetails.id, tbl_master_userdetails.name as uname,  tbl_master_userdetails.emailid,
    tbl_master_userdetails.password, tbl_master_userdetails.defaultroleid,tbl_general_master.parentid
    ,tbl_general_master.name,tbl_general_master.typeid,
      Case when   tbl_master_userdetails.isactive = true then 'Active' when
      tbl_master_userdetails.isactive = false then
       'InActive'else 'NA' end as isactive, created_date, created_by,modified_date, modified_by
       from tbl_master_userdetails,tbl_general_master 
       where tbl_master_userdetails.defaultroleid = tbl_general_master.typeid and 
       tbl_general_master.parentid=1`, (err, result)=>{
        if(!err){
            res.send(result.rows);

        }
        else{
            dataconn.errorlogger('index', 'users', err);
            res.status(200).json({ Success: false, Message: 'USER Master table API failed.', Data: null });
        }
    });
    
}
catch(err){
    dataconn.errorlogger('index', 'users', err);
    res.status(200).json({ Success: false, Message: ' USER Master table API failed.', Data: null });
}
client.end;
})

app.get('/usersByRole', (req, res)=>{
try{
    client.query(`select *
    from tbl_general_master 
    where tbl_general_master.parentid=1`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
    else{
        dataconn.errorlogger('index', 'usersByRole', err);
        res.status(200).json({ Success: false, Message: " Api failed to  get  the data", Data: null});
    }
});

}
catch(err){
    dataconn.errorlogger('index', 'usersByRole', err);
    res.status(200).json({ Success: false, Message: " Api failed to  get  the data", Data: null});
}
client.end;
})

app.post('/users', (req, res)=> {
    try{
    const user = req.body;

    //console.log(user);
    let insertQuery = `insert into tbl_master_userdetails( name, emailid, password,defaultroleid,isactive) 
                       values('${user.name}', '${user.emailid}', '${user.password}',
                       '${user.defaultroleid}','${user.isactive}')`
                       
    client.query(insertQuery, (err, result)=>{
        //console.log(insertQuery);
        if(!err){
            //res.send('Insertion was successful')
            res.status(200).json({ Success: true, Message: "User details saved successfully", Data: result});
        }
        else{ 
            dataconn.errorlogger('index', 'users', err);
             res.status(200).json({ Success: false, Message: "failed to  saved the data", Data: null}); 
            }
    })

   
}
catch(err){
    dataconn.errorlogger('index', 'users', err);
}
client.end;
})

app.post('/updateusers', (req, res)=> {
    try{
    let user = req.body;
    //console.log(user);
    let updateQuery = `update tbl_master_userdetails
                       set name  = '${user.name}',
                       emailid = '${user.emailid}',
                       password = '${user.password}',
                       defaultroleid = '${user.defaultroleid}',
                       isactive = '${user.isactive}'
                       
                       where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        //console.log('update details',updateQuery);
        if(!err){
            // res.send(message'update was successful')
            res.status(200).json({ Success: true, Message: 'record updated successfully'})
        }
        else{ 
            dataconn.errorlogger('index', 'updateusers', err);
            res.status(200).json({ Success: false, Message: 'Master table API failed to update.', Data: null });
        }
    })
   
}
catch(err){
    dataconn.errorlogger('index', 'updateusers', err);
    res.status(200).json({ Success: false, Message: 'Master table API failed to update.', Data: null });
}
client.end;
})
// Ashlesha


app.get('/leave', (req, res)=>{
    try{
    client.query(`Select * from tbl_master_leave`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else
        {
            dataconn.errorlogger('index', 'leave', err);
            res.status(200).json({ Success: false, Message: 'leave table API failed to update.', Data: null });
        }
    });

    }

catch(err){
    dataconn.errorlogger('index', 'leave', err);
    res.status(200).json({ Success: false, Message: 'leave table API failed to update.', Data: null });
}
client.end;
})

app.get('/leave/:id', (req, res)=>{
    try{
        client.query(`Select *  from  tbl_master_leave where  id=${req.params.id}`, (err, result)=>{
            if(!err){
                res.send(result.rows);
            }
            else{
                dataconn.errorlogger('index', 'leave/:id', err);
                res.status(200).json({ Success: false, Message: 'Leave Master table API failed.', Data: null });
            }
        });
       
    }
    catch(err){
        dataconn.errorlogger('index', 'leave/:id', err);
        res.status(200).json({ Success: false, Message: 'Leave Master table API failed.', Data: null });
    }
    client.end;
})
app.post('/AuthenticateUser', function(req, res) {
    try{
        let name = req.body.UserName;
        let password = req.body.Password;
        //console.log("name",name);
        //console.log("password",password);
        if (name && password) {
        //console.log("in if codition");
            // let insertQuery =`SELECT * FROM tbl_master_userdetails WHERE name = '${name}' AND password ='${password}' `       
            let insertQuery =`SELECT CONCAT(first_name , ' ' ,last_name) as userfullname ,* FROM tbl_master_userdetails WHERE 
            (name = LOWER('${name}') OR lower(EmailId) =LOWER('${name}')) AND password =LOWER('${password}') `      
            client.query(insertQuery,function(error, results, fields) {
                // if (error) throw error;
        
                if (results.rowCount > 0) {
                    
                    res.status(200).json({ Success: true, Message: 'Authenticated', Data: results });
                } else {
                
                    res.status(200).json({ Success: false, Message: 'You have entered an invalid username and password', Data: null });
                }			
            
            });
        } else {
            dataconn.errorlogger('index', 'AuthenticateUser', err);
            res.send('Please enter Username and Password!');
            
        }
}
catch(err){
    dataconn.errorlogger('index', 'AuthenticateUser', err);
    res.status(200).json({ Success: false, Message: 'Table Master table API failed.', Data: null });
}
});
//  const bodyParser = require("body-parser");
//  app.use(bodyParser.json());

app.post('/leave', (req, res)=> {
    try{

    
        const leave_col = req.body; 

        //console.log(leave_col);
        let insertQuery = `insert into tbl_master_leave( name, isactive) 
                        values('${leave_col.name}', '${leave_col.isactive}')`
                        
        client.query(insertQuery, (err, result)=>{
            //console.log(insertQuery);
            if(!err){
                res.send('Insertion was successful')
            }
            else{
                
            dataconn.errorlogger('index', 'leave', err);
            res.status(200).json({ Success: false, Message: 'leave table API failed to update.', Data: null });
                }
        })
        
    }
    catch(err){
            
        dataconn.errorlogger('index', 'leave', err);
        res.status(200).json({ Success: false, Message: 'leave table API failed to update.', Data: null });
    }
    client.end;
})

app.put('/leave/:id', (req, res)=> {
    try{
        let leave_col = req.body;

        //console.log(leave_col);
        let updateQuery = `update tbl_master_leave
                        set name = '${leave_col.name}',
                        isactive = '${leave_col.isactive}'
                        where id = ${req.params.id}`

        client.query(updateQuery, (err, result)=>{
            //console.log('update details',updateQuery);
            if(!err){
                res.send('Update was successful')
            }
            else{  dataconn.errorlogger('index', 'leave/:id', err);
            res.status(200).json({ Success: false, Message: 'Leave Master table API failed.', Data: null });}
        })
       
}
catch(err){
    dataconn.errorlogger('index', 'leave/:id', err);
    res.status(200).json({ Success: false, Message: 'Leave Master table API failed.', Data: null });
}
client.end;
})


app.delete('/leave/:id', (req, res)=> {
    
    let insertQuery = `delete from tbl_master_leave where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){   
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
 })

//Leave Details
//Leave Details: Start
app.get('/leavedetails', (req, res)=>{
    try{
    client.query(`Select tbl_leave_details.id, tbl_leave_details.leave_name,tbl_leave_details.description, 
    tbl_leave_details.fromdate,tbl_leave_details.todate, tbl_leave_details.leave_type, tbl_leave_details.balanceleave, 
    tbl_leave_details.created_by, tbl_leave_details.created_date,tbl_leave_details.modified_by, 
    tbl_leave_details.modified_date,tbl_master_userdetails.name from tbl_leave_details 
    inner join tbl_master_userdetails on tbl_leave_details.created_by= tbl_master_userdetails.id`, 
    (err, result)=>{
        if(!err){
            res.send(result.rows);
        }else{
            dataconn.errorlogger('index', 'leavedetails', err);
            res.status(200).json({ Success: false, Message: 'table API failed.', Data: null });
        }

    });
    
}
catch(err){
    dataconn.errorlogger('index', 'leavedetails', err);
    res.status(200).json({ Success: false, Message: 'table API failed.', Data: null });
}
client.end;
})

app.get('/leavedetails/:id', (req, res)=>{
    try{
    //console.log("from date",req.params.id);
     client.query(`Select tbl_leave_details.id, tbl_leave_details.leave_name,tbl_leave_details.description, 
     tbl_leave_details.fromdate,tbl_leave_details.todate, tbl_leave_details.leave_type, tbl_leave_details.balanceleave, 
     tbl_leave_details.created_by, tbl_leave_details.created_date,tbl_leave_details.modified_by, 
     tbl_leave_details.modified_date,tbl_master_userdetails.name from tbl_leave_details 
     inner join tbl_master_userdetails on tbl_leave_details.created_by= tbl_master_userdetails.id where tbl_leave_details.id=${req.params.id}`, (err, result)=>{
         if(!err){
             res.send(result.rows);
         }
         else{
            dataconn.errorlogger('index', 'leavedetails/:ID', err);
            res.status(200).json({ Success: false, Message: 'table API failed.', Data: null });
         }
     });
    //  client.end;
    }
    catch(err){
        dataconn.errorlogger('index', 'leavedetails/:Id', err);
        res.status(200).json({ Success: false, Message: 'table API failed.', Data: null });
    }
    client.end;
 })

 app.post('/getAllUserTimesheetData',function(req,res){
    try{
    var model =
    {
        fromdate : req.body.fromdate,
        todate :  req.body.todate
    }
    let insertQuery = `select tbl_master_project.name as projectname, tbl_task_details.taskname as taskname, 
    tbl_task_details.taskdescription as taskdescription,tbl_master_project.activity as activity,
	tbl_task_details.startdate as startdate, tbl_task_details.enddate as enddate,tbl_task_details.efforts as Timespend,
	tbl_master_userdetails.name as username from tbl_master_project
	inner join tbl_task_details on tbl_master_project.id=tbl_task_details.projectid 
	inner Join tbl_master_userdetails on tbl_master_userdetails.id=tbl_task_details.created_by WHERE cast(tbl_task_details.startdate as date) >= '${req.body.fromdate}' AND cast(tbl_task_details.enddate as date) <='${req.body.todate}' `       
//console.log("insertQuery",insertQuery);
client.query(insertQuery,function(error, results, fields) {
    if (error) throw error;
    if (results != null )  {
        //console.log("results",results.rows);
        res.status(200).json({ Success: true, Message: 'From Date & To Date Data', Data: results.rows});
    } else {
        dataconn.errorlogger('index', 'getAllUserTimesheetData', err);
        res.status(200).json({ Success: false, Message: 'You have entered an invalid From date & To date', Data: null });
    }			
    // client.end;
})
}
catch(err){
    dataconn.errorlogger('index', 'getAllUserTimesheetData', err);
    res.status(200).json({ Success: false, Message: 'You have entered an invalid From date & To date', Data: null });
}
client.end;
 })

 app.post('/getleaveDate', function(req, res) {
	// Capture the input fields
    // //console.log("req.................",req.body);
	// let fromdate = req.body.fromdate;
	// let todate = req.body.todate;
    try{
    var model =
    {
        fromdate : req.body.fromdate,
        todate :  req.body.todate
    }
	
    // //console.log("From Date",fromdate);
    // //console.log("todate",todate);
	if (req.body.fromdate && req.body.todate) {
     //console.log("in if codition");
            let insertQuery = `SELECT tbl_leave_details.id,tbl_master_userdetails.name, tbl_leave_details.leave_name,tbl_leave_details.description, 
            tbl_leave_details.fromdate,tbl_leave_details.todate, tbl_leave_details.leave_type, tbl_leave_details.balanceleave, 
            tbl_leave_details.created_by, tbl_leave_details.created_date,tbl_leave_details.modified_by, 
            tbl_leave_details.modified_date from tbl_leave_details 
            inner join tbl_master_userdetails on tbl_leave_details.created_by= tbl_master_userdetails.id WHERE cast(tbl_leave_details.fromdate as date) >= '${req.body.fromdate}' AND cast(tbl_leave_details.todate as date) <='${req.body.todate}' `       
        // let insertQuery =`SELECT * FROM tbl_leave_details WHERE cast(fromdate as date) >= '${req.body.fromdate}' AND cast(todate as date) <='${req.body.todate}' `       
        //console.log("insertQuery",insertQuery);
		client.query(insertQuery,function(error, results, fields) {
            if (error) throw error;
            // //console.log("results",results);		
			if (results != null )  {
				//console.log("results",results.rows);
				res.status(200).json({ Success: true, Message: 'From Date & To Date Data', Data: results.rows});
			} else {
				res.status(200).json({ Success: false, Message: 'You have entered an invalid From date & To date', Data: null });
			}			
		});
	} 
    else {
        
		dataconn.errorlogger('index', 'getleaveDate', err);
        res.status(200).json({ Success: false, Message: 'please enter from date and To Date...', Data: null });
		
	}
}
catch(err){
    dataconn.errorlogger('index', 'getleaveDate', err);
    res.status(200).json({ Success: false, Message: 'Master table API failed.', Data: null });
}
});

app.get('/getAllProjectData',function(req, res) {
    try{
            let insertQuery = `select tbl_master_clientmaster.name as ClientName,
            tbl_master_project.name as ProjectName,
            tbl_general_master.name as ProjectPlatform, tbl_master_project.activity as Activity ,
            tbl_master_project.fromdate as ProjectStartDate,
            tbl_master_project.todate as ProjectEndDate, tbl_master_userdetails.name as ProjectLead,
            tbl_master_project.owner as ProjectOwner,
            tbl_project_stage_details.status ProjectStatus,
            tbl_master_project.plannedeffort as Efforts,
            tbl_project_stage_details.remarks as Remarks from tbl_master_project
            inner join tbl_project_stage_details on	tbl_project_stage_details.projectid=tbl_master_project.id
            inner join tbl_general_master on tbl_general_master.typeid=tbl_master_project.projecttype
            inner join tbl_master_clientmaster on tbl_master_clientmaster.id=tbl_master_project.clientid
            inner Join tbl_master_userdetails on tbl_master_userdetails.id=tbl_master_project.created_by
            where tbl_general_master.parentid=77`      

        //console.log("insertQuery",insertQuery);
		client.query(insertQuery,function(error, results, fields) {
            if (error) throw error;
			if (results != null )  {
				//console.log("results",results.rows);
				res.status(200).json({ Success: true, Message: 'Data Export Successfully', Data: results.rows});
			} else {
				dataconn.errorlogger('index', 'getAllProjectData', err);
                res.status(200).json({ Success: false, Message: 'You have entered wrong Data', Data: null });
			}
        		
		});
	} 
    catch(err){
        dataconn.errorlogger('index', 'getAllProjectData', err);
        res.status(200).json({ Success: false, Message: 'You have entered wrong Data', Data: null });
    }
}
);



app.post('/leavedetails', (req, res)=> {
    try{
    const leavedet_col = req.body;

    //console.log(leavedet_col);
    let insertQuery = `insert into tbl_leave_details( leave_name, description,fromdate,todate, leave_type, balanceleave) 
                       values('${leavedet_col.leave_name}', '${leavedet_col.description}', '${leavedet_col.fromdate}','${leavedet_col.todate}', '${leavedet_col.leave_type}', '${leavedet_col.balanceleave}')`
                       
    client.query(insertQuery, (err, result)=>{
        //console.log(insertQuery);
        if(!err){
            res.send('Insertion was successful')
        }
        else{ 
         dataconn.errorlogger('index', 'leavedetails', err);
        res.status(200).json({ Success: false, Message: 'Master table API failed.', Data: null });
        }
    })
    }
    catch(err){
        dataconn.errorlogger('index', 'leavedetails', err);
        res.status(200).json({ Success: false, Message: 'Master table API failed.', Data: null });

        }
    
    client.end;
})

app.put('/leavedetails/:id', (req, res)=> {
    try{
        let leavedet_col = req.body;
        //console.log(leavedet_col);
        let updateQuery = `update tbl_leave_details
                        set leave_name = '${leavedet_col.leave_name}',
                        description = '${leavedet_col.description}',
                        fromdate = '${leavedet_col.fromdate}',
                        todate = '${leavedet_col.todate}',
                        leave_type = '${leavedet_col.leave_type}',
                        balanceleave = '${leavedet_col.balanceleave}'
                        where id = ${req.params.id}`

        client.query(updateQuery, (err, result)=>{
            //console.log('update details',updateQuery);
            if(!err){
                res.send('Update was successful')
            }
            else{ 
                dataconn.errorlogger('index', 'leavedetails', err);
                res.status(200).json({ Success: false, Message: 'leavedetails table API failed.', Data: null });
             }
        })
    }
    catch(err){
        dataconn.errorlogger('index', 'leavedetails', err);
        res.status(200).json({ Success: false, Message: 'leavedetails table API failed.', Data: null });
    }
    client.end;
})

app.delete('/leavedetails/:id', (req, res)=> {
    try{
        let insertQuery = `delete from tbl_leave_details where id=${req.params.id}`

        client.query(insertQuery, (err, result)=>{
            if(!err){
                res.send('Deletion was successful')
            }
            else{ 
            dataconn.errorlogger('index', 'leavedetails/:id', err);
            res.status(200).json({ Success: false, Message: 'leavedetails table API failed.', Data: null }); }
        })
    }
    catch(err){
        dataconn.errorlogger('index', 'leavedetails/:id', err);
        res.status(200).json({ Success: false, Message: 'leavedetails table API failed.', Data: null });
    }
    client.end;
 })
// General Master KOmal

app.get('/general', (req, res)=>{
    try{
        client.query(`Select * from tbl_general_master ORDER BY id`, (err, result)=>{
            if(!err){
                // res.send(result.rows);
                res.status(200).json({ Success: true, Message: 'tbl_general_master Table Details', Data: result.rows });
            }
            else{
                dataconn.errorlogger('index', 'general', err);
                res.status(200).json({ Success: false, Message: 'General Master table API failed.', Data: null });
            }
        });
      
    }
    catch(err){
        dataconn.errorlogger('index', 'general', err);
        res.status(200).json({ Success: false, Message: 'General Master table API failed.', Data: null });
    }
    client.end;
})


app.get('/getGroupName', (req, res)=>{
    try{
    client.query(`Select * from tbl_general_master where parentid= 0`, (err, result)=>{
        if(!err){
            // res.send(result.rows);
            res.status(200).json({ Success: true, Message: 'tbl_general_master Table Details', Data: result.rows });
        }
        else{
            dataconn.errorlogger('index', 'getGroupName', err);
            res.status(200).json({ Success: false, Message: 'Genaral Master table API failed.', Data: null });
        }
    });
}
catch(err){
    dataconn.errorlogger('index', 'getGroupName', err);
    res.status(200).json({ Success: false, Message: 'General Master table API failed.', Data: null });
}
    client.end;
})

app.get('/GeneralTableGetId/:id', (req, res)=>{
    try{
    client.query(`Select *  from  tbl_general_master where  id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.status(200).json({ Success: true, Message: 'tbl_general_master Table Details', Data: result});
            //console.log("result.rows",result.rows);
        }
        else{
            dataconn.errorlogger('index', 'GeneralTableGetId/id', err);
            res.status(200).json({ Success: false, Message: 'General Master table API failed.', Data: null });
        }
    });
}
catch(err){
    dataconn.errorlogger('index', 'GeneralTableGetId/id', err);
    res.status(200).json({ Success: false, Message: 'General Master table API failed.', Data: null });
}
    client.end;
})


app.get('/GeneralTableGetGroupName/:groupname', (req, res)=>{
    try{
    // //console.log("req.param",req.params.groupname)
    client.query(` Select  distinct parentid, *  from  tbl_general_master where  groupname='${req.params.groupname}' AND ( parentid IS NOT NULL OR parentid <> 0 ) ORDER BY parentid desc `, (err, result)=>{
        if(!err){
            //console.log("err",err);
            //console.log("result",result);
            res.status(200).json({ Success: true, Message: 'tbl_general_master Table Details', Data: result});
            //console.log("result.rows",result.rows);
        }
        else{
            dataconn.errorlogger('index', 'GeneralTableGetGroupName/groupname', err);
            res.status(200).json({ Success: false, Message: 'General Master table API failed.', Data: null });
        }
    });
}
catch(err){
    dataconn.errorlogger('index', 'GeneralTableGetGroupName/groupname', err);
    res.status(200).json({ Success: false, Message: 'General Master table API failed.', Data: null });
}
    client.end;
})

app.post('/CreategeneralMaster', (req, res)=> {
    try{

        let typeid;
        let seqorder;
        client.query(` select max(typeid)+1 as typeid ,max(seqorder)+1 as seqorder from tbl_general_master  `, (err, result)=>{
        if(!err){
        // //console.log("err",err);
        // //console.log("result",result.rows[0]);
        typeid=result.rows[0].typeid;
        seqorder=result.rows[0].seqorder;
        // //console.log(typeid,"...........");
        // //console.log(seqorder,".......");

        const general_col = req.body;  
        // //console.log(general_col);


        let insertQuery = `insert into tbl_general_master( groupname, name, typeid, seqorder, parentid, isactive) 
        values('${general_col.groupname}','${general_col.name}', '${typeid }',
        '${seqorder}','${general_col.parentid}','${general_col.isactive}')`

        client.query(insertQuery, (err, result)=>{
        // //console.log(insertQuery);

        if(result != null){
        // //console.log("result",result);
        // res.send('Insertion was successful')
        res.status(200).json({ Success: true, Message: 'tbl_general_master Table Details', Data: result});
        }
        else{ 
            dataconn.errorlogger('index', 'CreategeneralMaster', err);
            res.status(200).json({ Success: false, Message: 'General Master table API failed.', Data: null });
        }
        })
        client.end;
     }
    })
}   
catch(err){

    dataconn.errorlogger('index', 'CreategeneralMaster', err);
    res.status(200).json({ Success: false, Message: 'General Master table API failed.', Data: null });
}
})

app.post('/Updategeneraltable', (req, res)=> {
    try{
    let general_col = req.body;
    //console.log(general_col);
    // let updateQuery = `update tbl_general_master
    //                    set groupname = '${general_col.groupname}',
    //                    name = '${general_col.name}',
    //                 //    typeid = '${general_col.typeid}',
    //                 //    seqorder = '${general_col.seqorder}',
    //                 //    parentid = '${general_col.parentid}',
    //                 //   isactive = '${general_col.isactive}'
    //                    where id = '${general_col.id}'`
    let updateQuery = `update tbl_general_master
    set name = '${general_col.name}'
    where parentid = '${general_col.parentid}' and typeid ='${general_col.typeid}'`               
                       

    client.query(updateQuery, (err, result)=>{
        //console.log('update details',updateQuery);
        if(!err){
            //console.log(result);
            res.status(200).json({ Success: true, Message: 'Record updated successfully', Data: result});

        }
        else{ 
          
            dataconn.errorlogger('index', 'Updategeneraltable', err);
            res.status(200).json({ Success: false, Message: 'Error occurred while updating record', Data: result});
 
        }
    })
}
catch(err){
    dataconn.errorlogger('index', 'Updategeneraltable', err);
    res.status(200).json({ Success: false, Message: 'Error occurred while updating record', Data: result});
}
    client.end;
})


app.delete('/general/:id', (req, res)=> {
    let insertQuery = `delete from tbl_general_master where id=${req.params.id}`
    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
 })
// Komal

  // Task Details
 app.get('/taskdetails', (req, res)=>{
    client.query(`Select * from tbl_task_details`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
app.get('/taskdetails/:id', (req, res)=>{
    client.query(`Select *  from  tbl_task_details where  id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
app.post('/taskdetails', (req, res)=> {
    const taskdetails_col = req.body;

    //console.log(taskdetails_col);
    let insertQuery = `insert into tbl_task_details( projectid, taskdescription, tasktypeid, efforts, startdate, enddate, attachment, comments, created_date, created_by, modified_date, modified_by, status, isactive) 
                       values('${taskdetails_col.projectid}','${taskdetails_col.taskdescription}', '${taskdetails_col.tasktypeid}','${taskdetails_col.efforts}','${taskdetails_col.startdate}','${taskdetails_col.enddate},'${taskdetails_col.enddate},'${taskdetails_col.attachment},'${taskdetails_col.comments},'${taskdetails_col.created_date},'${taskdetails_col.created_by},'${taskdetails_col.modified_date},'${taskdetails_col.modified_by},'${taskdetails_col.status}','${taskdetails_col.isactive}')`
                       
    client.query(insertQuery, (err, result)=>{
        //console.log(insertQuery);
        if(!err){
            res.send('Insertion was successful')
        }
        else{ }
    })
    client.end;
})

app.put('/general/:id', (req, res)=> {
    let general_col = req.body;
    //console.log(general_col);
    let updateQuery = `update tbl_task_details
                       set projectid = '${general_col.projectid}',
                       taskdescription = '${general_col.taskdescription}',
                       tasktypeid = '${general_col.tasktypeid}',
                       efforts = '${general_col.efforts}',
                       startdate = '${general_col.startdate}',
                       enddate = '${general_col.enddate}',
                       enddate = '${general_col.enddate}',
                       enddate = '${general_col.enddate}',
                       enddate = '${general_col.enddate}',
                       enddate = '${general_col.enddate}',
                       where id = ${req.params.id}`

    client.query(updateQuery, (err, result)=>{
        //console.log('update details',updateQuery);
        if(!err){
            res.send('Update was successful')
        }
        else{  }
    })
    client.end;
})

app.post('/generalTypeid', (req, res)=>{
    try{
    
    client.query(`Select name from  tbl_general_master where  parentid =16 and typeid=${req.body.typeid}`, (err, results)=>{
        if(!err){
           
            if (results != null )  {
				//console.log("results",results.rows);
				res.status(200).json({ Success: true, Data: results.rows});
			} else {
				dataconn.errorlogger('index', 'generalTypeid', err);
                res.status(200).json({ Success: false, Data: null });
			}			
        }
    });
}
catch(err){
            dataconn.errorlogger('index', 'generalTypeid', err);
            res.status(200).json({ Success: false, Data: null });
}
    client.end;
})


app.post('/holiday', (req, res)=> {
    try{
    
            let holiday_col = req.body;
            //console.log('holiday data : ', holiday_col);
            let updateQuery = `update tbl_master_holiday
                            set 
                            description = '${holiday_col.description}',
                            holiday_date = '${holiday_col.holiday_date}',
                            isactive = '${holiday_col.isactive}'
                            where holiday_id = '${holiday_col.holiday_id}'`
            //console.log('query' , updateQuery)

            client.query(updateQuery, (err, result)=>{
                //console.log('update details',updateQuery);
                if(!err){
                
                    res.status(200).json({ Success: true, Message: 'Data Updated Successfully'});
                } else {
                    dataconn.errorlogger('index', '/holiday', err);
                    res.status(200).json({ Success: false, Message: 'Error While Updating'});
            }
        })
    }
    catch(err){
        dataconn.errorlogger('index', '/holiday', err);
        res.status(200).json({ Success: false, Message: 'Error While Updating'});
    }
    
    client.end;
})

app.get('/holiday', (req, res)=>{
    try{
        var flag = req.body.flag
        
        client.query(`Select tbl_general_master.*,tbl_master_holiday.* from tbl_master_holiday 
        inner join tbl_general_master on tbl_master_holiday.holiday_id = tbl_general_master.typeid
        where tbl_general_master.parentid=16`, (err, results)=>{
            if(!err){
                if (results != null )  {
                    //console.log("results",results.rows);
                    res.status(200).json({ Success: true, Message: 'From Date & To Date Data', Data: results.rows});
                } else {
                    dataconn.errorlogger('index', '/holiday', err);
                   
                    res.status(200).json({ Success: false, Message: 'You have entered an invalid From date & To date', Data: null });
                }			
            }
        });
    }
    catch(err){
        dataconn.errorlogger('index', '/holiday', err);
        res.status(200).json({ Success: false, Message: 'You have entered an invalid From date & To date', Data: null });
    }

    client.end;
})
app.get('/allholiday', (req, res)=>{
    try{
        var flag = req.body.flag
        
        client.query(`select typeid,name from tbl_general_master where typeid not in(select holiday_id from tbl_master_holiday)
        and parentid=16`, (err, results)=>{
            if(!err){
                if (results != null )  {
                    //console.log("results",results.rows);
                    res.status(200).json({ Success: true, Message: 'From Date & To Date Data', Data: results.rows});
                } else {
                    dataconn.errorlogger('index', '/allholiday', err);
                    res.status(200).json({ Success: false, Message: 'You have entered an invalid From date & To date', Data: null });
                }			
            }
        }); 
    }
    catch(err){
        dataconn.errorlogger('index', '/allholiday', err);
        res.status(200).json({ Success: false, Message: 'You have entered an invalid From date & To date', Data: null });
    }
    client.end;
})
app.post('/newholiday', (req, res)=> {
    try{

    
        const holiday_col = req.body;
        //console.log(holiday_col);
        
        let insertQuery = `insert into tbl_master_holiday(holiday_id, description, holiday_date, isactive) values('${holiday_col.holiday_id}','${holiday_col.description}','${holiday_col.holiday_date}', '${holiday_col.isactive}')`
        client.query(insertQuery, (err, result)=>{
            //console.log(insertQuery);
            if(!err){
                res.status(200).json({ Success: true, Message: 'Holiday Inserted Successfully'});
            } else {
                dataconn.errorlogger('index', '/newholiday', err);
                res.status(200).json({ Success: false, Message: 'Error while Inserting the Record'});
            }
        })
    }
    catch(err){
        dataconn.errorlogger('index', '/newholiday', err);
        res.status(200).json({ Success: false, Message: 'Error while Inserting the Record'});
    }
    client.end;
})


app.delete('/general/:id', (req, res)=> {
    let insertQuery = `delete from tbl_general_master where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{  }
    })
    client.end;
 })