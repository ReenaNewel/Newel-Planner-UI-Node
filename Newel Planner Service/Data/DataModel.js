var connect = require("./Connect");

var sequelize = connect.sequelize;
var Sequelize = connect.Sequelize;
const Model = connect.Sequelize.Model;

// Log Tables
class ErrorLog extends Model { }
class MailLog extends Model { }

//class CronService extends Model { }
class tbl_master_holiday extends Model{}
class tbl_master_clientmaster extends Model{}
class tbl_general_master extends Model{}
class tbl_project_stage_details extends Model{}
class tbl_master_project extends Model{}
class tbl_master_userdetails extends Model{}
class tbl_task_details extends Model{}
class tbl_task_status extends Model{}
class tbl_task_assignee_details extends Model{}
class tbl_timesheet_details extends Model{}
class tbl_timesheet_approval extends Model{}

class tbl_master_ra_mapping extends Model{}

class tbl_ui_Rolemap extends Model{}
class tbl_ui_mst extends Model{}
class tbl_master_role extends Model{}
class tbl_userproject_mapping extends Model{}
class tbl_menu_ui_mst extends Model{}
class Error_Log extends Model{}
class tbl_leave_details extends Model{}
class tbl_weekly_efforts extends Model{}
class tbl_month_week extends Model{}
class Report_type_master extends Model{}





module.exports.Error_Log = function () {
    Error_Log.init({
    id :{ type: Sequelize.BIGINT,primaryKey:true,autoIncrement:true},
    servicename:{ type: Sequelize.STRING(1000), allowNull: true},
    functionname:{ type: Sequelize.STRING(1000), allowNull: true},
    errordetails:{  type: Sequelize.TEXT,allowNull: true },
    Transactionid: { type: Sequelize.STRING(100), allowNull: true},
    inputvalue : { type: Sequelize.STRING(500), allowNull: true },
    Errorsubject : { type: Sequelize.STRING(1000), allowNull: true },
    created_by : { type: Sequelize.STRING(500), allowNull: true },
    createddate : { type: Sequelize.DATE, allowNull: true,defaultValue:sequelize.NOW}

    }, {
        sequelize,
        modelName: 'Error_Log',
        tableName: 'Error_Log'
    });

    return Error_Log;
}


module.exports.tbl_timesheet_details = function () {
    tbl_timesheet_details.init({
   
    id :{ type: Sequelize.INTEGER,primaryKey:true,autoIncrement:true, allowNull: false },
    projectid :{ type: Sequelize.INTEGER, allowNull: true },
    taskid :{ type: Sequelize.INTEGER, allowNull: true },
    description: { type: Sequelize.STRING(500), allowNull: true },
    timeinhours: { type: Sequelize.SMALLINT, allowNull: true },
    timeinminutes : { type: Sequelize.SMALLINT, allowNull: true },
    date: { type: Sequelize.DATE, allowNull: true },
    isactive:{  type: Sequelize.BOOLEAN, defaultValue: true },
    activityid :{ type: Sequelize.INTEGER, allowNull: true },
    created_date: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    created_by : { type: Sequelize.INTEGER, allowNull: true },
    modified_date : { type: Sequelize.DATE, allowNull: true },
    modified_by : { type: Sequelize.INTEGER, allowNull: true },
 

    }, {
        sequelize,
        modelName: 'tbl_timesheet_details',
        tableName: 'tbl_timesheet_details'
    });

    return tbl_timesheet_details;
}



module.exports.tbl_master_holiday = function () {
    tbl_master_holiday.init({
    id:{type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    holiday_id:{ type: Sequelize.INTEGER, allowNull: true },
    description :{ type: Sequelize.STRING(100), allowNull: false},
    holiday_date:{ type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW},
    isactive:{  type: Sequelize.BOOLEAN, defaultValue: true }

    }, {
        sequelize,
        modelName: 'tbl_master_holiday',
        tableName: 'tbl_master_holiday'
    });

    return tbl_master_holiday;
}

module.exports.tbl_master_clientmaster = function () {
    tbl_master_clientmaster.init({
    id:{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
    name:{ type: Sequelize.STRING(200), allowNull: false },
    isactive:{  type: Sequelize.BOOLEAN, defaultValue: true }

    }, {
        sequelize,
        modelName: 'tbl_master_clientmaster',
        tableName: 'tbl_master_clientmaster'
    });

    return tbl_master_clientmaster;
}

module.exports.tbl_general_master = function () {
    tbl_general_master.init({
    id:{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
    groupname:{ type: Sequelize.STRING, allowNull: true },
    name:{ type: Sequelize.STRING, allowNull: true },
    typeid:{ type: Sequelize.INTEGER, allowNull: true },
    seqorder:{ type: Sequelize.INTEGER, allowNull: true },
    parentid:{ type: Sequelize.INTEGER, allowNull: true },
    isactive:{  type: Sequelize.BOOLEAN, defaultValue: true }

    }, {
        sequelize,
        modelName: 'tbl_general_master',
        tableName: 'tbl_general_master'
    });

    return tbl_general_master;
}

module.exports.tbl_project_stage_details = function () {
    tbl_project_stage_details.init({
    id:{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
    projectid:{ type: Sequelize.INTEGER, allowNull: true },
    stageid:{ type: Sequelize.INTEGER, allowNull: true },
    planned_startdate:{ type: Sequelize.DATE, allowNull: true , defaultValue: Sequelize.NOW },
    planned_enddate:{ type: Sequelize.DATE, allowNull: true , defaultValue: Sequelize.NOW},
    actual_startdate:{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    actual_enddate:{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    status:{ type: Sequelize.STRING(40), allowNull: true },
    remarks:{  type: Sequelize.STRING(40), allowNull: true },
    created_date:{ type: Sequelize.DATE, allowNull: true , defaultValue: Sequelize.NOW},
    created_by:{ type: Sequelize.INTEGER, allowNull: true },
    modified_date: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    modified_by :{ type: Sequelize.INTEGER, allowNull: true },
    isactive:{  type: Sequelize.BOOLEAN, defaultValue: true }

    }, {
        sequelize,
        modelName: 'tbl_project_stage_details',
        tableName: 'tbl_project_stage_details'
    });

    return tbl_project_stage_details;
}

module.exports.tbl_master_project = function () {
    tbl_master_project.init({
    id:{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
    name:{type: Sequelize.STRING(200), allowNull: false},
    activity:{type: Sequelize.STRING(500), allowNull: true},
    clientid:{type:Sequelize.INTEGER, allowNull: false},
    fromdate:{type: Sequelize.DATE, allowNull: true , defaultValue: Sequelize.NOW},
    todate:{type: Sequelize.DATE, allowNull: true , defaultValue: Sequelize.NOW},
    owner:{ type: Sequelize.STRING(100), allowNull: true },
    // remarks:{type: Sequelize.STRING(40), allowNull: true },
    created_date:{ type: Sequelize.DATE, allowNull: true , defaultValue: Sequelize.NOW},
    created_by:{ type: Sequelize.INTEGER, allowNull: true },
    modified_date: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    modified_by :{ type: Sequelize.INTEGER, allowNull: true },
    isactive:{type: Sequelize.BOOLEAN, defaultValue: true },
    projecttype:{type: Sequelize.INTEGER, allowNull: true },
    plannedeffort:{type: Sequelize.DECIMAL, allowNull: true },
    projectstage:{type: Sequelize.INTEGER, allowNull: true },
    stagestatus:{type: Sequelize.INTEGER, allowNull: true },
    projectstatus:{type: Sequelize.INTEGER, allowNull: true }

    }, {
        sequelize,
        modelName: 'tbl_master_project',
        tableName: 'tbl_master_project'
    });

    return tbl_master_project;
}

module.exports.tbl_master_userdetails = function () {
    tbl_master_userdetails.init({
    id:{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
    name:{ type: Sequelize.STRING(200), allowNull: true},
    emailid:{ type: Sequelize.STRING(200), allowNull: true},
    password:{ type: Sequelize.STRING(20), allowNull: true},
    defaultroleid:{ type: Sequelize.INTEGER, allowNull: true},
    created_date:{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
    created_by:{ type: Sequelize.INTEGER, allowNull: true},
    isactive:{  type: Sequelize.BOOLEAN, defaultValue: true}

    }, {
        sequelize,
        modelName: 'tbl_master_userdetails',
        tableName: 'tbl_master_userdetails'
    });

    return tbl_master_userdetails;
}

// Ashleshas
module.exports.tbl_task_details = function () {
    tbl_task_details.init({
    id:{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
    projectid:{ type: Sequelize.INTEGER, allowNull: true},
    taskname:{ type: Sequelize.STRING(200), allowNull: true},
    taskdescription:{ type: Sequelize.STRING(200), allowNull: true},
    tasktypeid:{ type: Sequelize.INTEGER, allowNull: true},
    efforts:{ type: Sequelize.NUMBER, allowNull: true},
    startdate:{ type: Sequelize.DATE, allowNull: true},
    enddate:{ type: Sequelize.DATE, allowNull: true},
    attachment:{ type: Sequelize.STRING, allowNull: true},
    comments:{ type: Sequelize.STRING, allowNull: true},
    attachment:{ type: Sequelize.STRING, allowNull: true},
    created_date:{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
    created_by:{ type: Sequelize.INTEGER, allowNull: true},
    modified_date:{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
    modified_by:{ type: Sequelize.INTEGER, allowNull: true},
    status:{ type: Sequelize.INTEGER, allowNull: true},
    isactive:{  type: Sequelize.BOOLEAN, defaultValue: true}

    }, {
        sequelize,
        modelName: 'tbl_task_details',
        tableName: 'tbl_task_details'
    });

    return tbl_task_details;
}
// Ashlesha 

module.exports.tbl_month_week = function () {

    tbl_month_week.init({

        id:{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
        startdate:{ type: Sequelize.DATE, allowNull: true},
        enddate:{ type: Sequelize.DATE, allowNull: true},

    }, {

        sequelize,

        modelName: 'tbl_month_week',
        tableName: 'tbl_month_week'

    });
    return tbl_month_week;
}

module.exports.tbl_weekly_efforts = function () {

    tbl_weekly_efforts.init({

        id: { type: Sequelize.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
        id_ra: { type: Sequelize.INTEGER, allowNull: true },
        id_user: { type: Sequelize.INTEGER, allowNull: true },
        id_week: { type: Sequelize.INTEGER, allowNull: true },
        id_project: { type: Sequelize.INTEGER, allowNull: true },
        hours: { type: Sequelize.INTEGER, allowNull: true },
        id_activity: { type: Sequelize.INTEGER, allowNull: true },
        efforts_planned_by: { type: Sequelize.INTEGER, allowNull: true },


    }, {

        sequelize,
        modelName: 'tbl_weekly_efforts',

        tableName: 'tbl_weekly_efforts'

    });

    return tbl_weekly_efforts;

}
module.exports.tbl_task_status = function () {
    tbl_task_status.init({
    id:{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
    taskId:{ type: Sequelize.INTEGER, allowNull: true},
    statusId:{ type: Sequelize.INTEGER, allowNull: true},
    createdDate:{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
    created_by:{ type: Sequelize.INTEGER, allowNull: true},
    active:{  type: Sequelize.BOOLEAN, defaultValue: true},
    assigneeId:{ type: Sequelize.INTEGER, allowNull: true},

 

    }, {
        sequelize,
        modelName: 'tbl_task_status',
        tableName: 'tbl_task_status'
    });

    return tbl_task_status;
}


module.exports.tbl_task_assignee_details = function () {
    tbl_task_assignee_details.init({
    id:{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
    taskid:{ type: Sequelize.INTEGER, allowNull: true},
    userid:{ type: Sequelize.INTEGER, allowNull: true},
    isactive:{ type: Sequelize.INTEGER, allowNull: true},
    }, {
        sequelize,
        modelName: 'tbl_task_assignee_details',
        tableName: 'tbl_task_assignee_details'
    });

    return tbl_task_assignee_details;
}




module.exports.tbl_timesheet_approval = function () {
    tbl_timesheet_approval.init({
    id:{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
    task_id:{ type: Sequelize.INTEGER, allowNull: true}, 
    userid:{ type: Sequelize.INTEGER, allowNull: true}, 
    ra_id:{ type: Sequelize.INTEGER, allowNull: true}, 
    approval_status:{ type: Sequelize.INTEGER, allowNull: true},    
    project_id :{ type: Sequelize.INTEGER, allowNull: true}, 
    activity_id:{ type: Sequelize.INTEGER, allowNull: true}, 
    approval_date:{ type: Sequelize.DATE, allowNull: true},
    created_date:{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
    created_by:{ type: Sequelize.INTEGER, allowNull: true},
    modified_date:{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
    modified_by:{ type: Sequelize.INTEGER, allowNull: true},
    

    }, {
        sequelize,
        modelName: 'tbl_timesheet_approval',
        tableName: 'tbl_timesheet_approval'
    });

    return tbl_timesheet_approval;
}
module.exports.tbl_master_ra_mapping = function () {
    tbl_master_ra_mapping.init({
   

    id :{ type: Sequelize.INTEGER,primaryKey:true,autoIncrement:true, allowNull: false },
    userid:{ type: Sequelize.INTEGER, allowNull: true},
    ra_id:{ type: Sequelize.INTEGER, allowNull: true},
    isactive:{  type: Sequelize.BOOLEAN, defaultValue: true },
    created_date: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    created_by : { type: Sequelize.INTEGER, allowNull: true },
    modified_date : { type: Sequelize.DATE, allowNull: true },
    modified_by : { type: Sequelize.INTEGER, allowNull: true },
 

    }, {
        sequelize,
        modelName: 'tbl_master_ra_mapping',
        tableName: 'tbl_master_ra_mapping'
    });

    return tbl_master_ra_mapping;
}
module.exports.tbl_userproject_mapping =function(){
    tbl_userproject_mapping.init({
        id :{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
        projectid :{ type: Sequelize.INTEGER, allowNull: true},
        userid :{ type: Sequelize.INTEGER, allowNull: true},
        roleid :{ type: Sequelize.INTEGER, allowNull: true},
        isactive:{  type: Sequelize.INTEGER, defaultValue: 1},        
        created_by :{ type: Sequelize.INTEGER, allowNull: true}, 
        created_date :{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
        modified_by :{ type: Sequelize.INTEGER, allowNull: true}, 
        modified_date :{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
           
        }, {
            sequelize,
            modelName: 'tbl_userproject_mapping',
            tableName: 'tbl_userproject_mapping'
        });
    
        return tbl_userproject_mapping;

    }

module.exports.tbl_master_role =function(){
    tbl_master_role.init({
        id :{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
        name: { type: Sequelize.STRING(100), allowNull: true},
        isactive:{  type: Sequelize.BOOLEAN, defaultValue: true},        
        created_by :{ type: Sequelize.INTEGER, allowNull: true}, 
        created_date :{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
        modified_by :{ type: Sequelize.INTEGER, allowNull: true}, 
        modified_date :{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
           
        }, {
            sequelize,
            modelName: 'tbl_master_role',
            tableName: 'tbl_master_role'
        });
    
        return tbl_master_role;

    }

module.exports.tbl_ui_mst =function(){
    tbl_ui_mst.init({
        id :{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
        parentid :{ type: Sequelize.INTEGER, allowNull: true}, 
        title: { type: Sequelize.STRING(100), allowNull: true},
        path :{ type: Sequelize.STRING(2000), allowNull: true},
        icon: { type: Sequelize.STRING(2000), allowNull: true},
        cssclass : { type: Sequelize.STRING(2000), allowNull: true},
        sequence :{ type: Sequelize.INTEGER, allowNull: true}, 
        isactive :{ type: Sequelize.INTEGER, allowNull: true}, 
        ischild :{ type: Sequelize.INTEGER, allowNull: true}, 
        createdby :{ type: Sequelize.INTEGER, allowNull: true}, 
        createddate :{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
        modifiedby :{ type: Sequelize.INTEGER, allowNull: true}, 
        modifieddate :{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
           
        }, {
            sequelize,
            modelName: 'tbl_ui_mst',
            tableName: 'tbl_ui_mst'
        });
    
        return tbl_ui_mst;

    }


    module.exports.tbl_menu_ui_mst =function(){
        tbl_menu_ui_mst.init({
            id :{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
            parentid :{ type: Sequelize.INTEGER, allowNull: true}, 
            name: { type: Sequelize.STRING(100), allowNull: true},
            url :{ type: Sequelize.STRING(2000), allowNull: true},
            iconComponent: { type: Sequelize.STRING(2000), allowNull: true},
            cssclass : { type: Sequelize.STRING(2000), allowNull: true},
            sequence :{ type: Sequelize.INTEGER, allowNull: true}, 
            isactive :{ type: Sequelize.INTEGER, allowNull: true}, 
            ischild :{ type: Sequelize.INTEGER, allowNull: true}, 
            createdby :{ type: Sequelize.INTEGER, allowNull: true}, 
            createddate :{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
            modifiedby :{ type: Sequelize.INTEGER, allowNull: true}, 
            modifieddate :{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
               
            }, {
                sequelize,
                modelName: 'tbl_menu_ui_mst',
                tableName: 'tbl_menu_ui_mst'
            });
        
            return tbl_menu_ui_mst;
    
        }


module.exports.tbl_ui_Rolemap =function(){
    tbl_ui_Rolemap.init({
    id:{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
    UI_id :{ type: Sequelize.INTEGER, allowNull: true}, 
    roleid :{ type: Sequelize.INTEGER, allowNull: true}, 
    view :{ type: Sequelize.INTEGER, allowNull: true}, 
    add :{ type: Sequelize.INTEGER, allowNull: true}, 
    edit :{ type: Sequelize.INTEGER, allowNull: true}, 
    export :{ type: Sequelize.INTEGER, allowNull: true}, 
    upload :{ type: Sequelize.INTEGER, allowNull: true}, 
    isactive :{ type: Sequelize.INTEGER, allowNull: true}, 
    createdby :{ type: Sequelize.INTEGER, allowNull: true}, 
    createddate:{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
    modifiedby :{ type: Sequelize.INTEGER, allowNull: true}, 
    modifieddate:{ type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
    createdbyroleid :{ type: Sequelize.INTEGER, allowNull: true},
    modifiedbyroleid :{ type: Sequelize.INTEGER, allowNull: true}       
    
        }, {
            sequelize,
            modelName: 'tbl_ui_Rolemap',
            tableName: 'tbl_ui_Rolemap'
        });
    
        return tbl_ui_Rolemap;

    }

    module.exports.Report_type_master = function () {
        Report_type_master.init({
        id:{type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true,allowNull: false },
        ReportType:{ type: Sequelize.STRING, allowNull: true },
        ReportTypeid:{ type: Sequelize.INTEGER, allowNull: true },
        isactive:{  type: Sequelize.BOOLEAN, defaultValue: true }
    
        }, {
            sequelize,
            modelName: 'Report_type_master',
            tableName: 'Report_type_master'
    
        });
    
        return Report_type_master;
    }

module.exports.tbl_leave_details = function () {
    tbl_leave_details.init({


        leave_name: { type: Sequelize.STRING(100), allowNull: true },
        description: { type: Sequelize.STRING(100), allowNull: true },
        fromdate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
        todate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
        leave_type: { type: Sequelize.INTEGER, allowNull: true },
        balanceleave: { type: Sequelize.INTEGER, allowNull: true },
        created_by: { type: Sequelize.INTEGER, allowNull: true },
        created_date: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
        modified_by: { type: Sequelize.INTEGER, allowNull: true },
        modified_date: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
        ra_id: { type: Sequelize.INTEGER, allowNull: true },
        user_id: { type: Sequelize.INTEGER, allowNull: true },
        approved_by: { type: Sequelize.INTEGER, allowNull: true },
        status: { type: Sequelize.INTEGER, allowNull: true },
        no_of_leaves: { type: Sequelize.INTEGER, allowNull: true },
        remark: { type: Sequelize.STRING(100), allowNull: true },

    }, {
        sequelize,
        modelName: 'tbl_leave_details',
        tableName: 'tbl_leave_details'
    });

    return tbl_leave_details;

}