const environmentConfig = {
    
    local: {
        service_port: 1352,
        ui_url: 'http://localhost:4200/planner/',
        dbConn: {
            dbServer: '43.204.223.103',
            dbName: 'Planner_Prod',
            dbUser: 'postgres',
            dbPassword: 'India@123',
        }
    },
  
}
// 1352
//// Planner_Prod

const Domain_name ="https://uatretailwebsiteapi.edelweissarc.in/api"
const environment = 'local';
const NODEAPIURL='http://localhost:8686/api/';
const finalConfig = environmentConfig[environment];
const Company = 'Newel';
const secretekey = 'Edelweissmf';
const SignupLanCheck = NODEAPIURL + "signup/signupLANcheak";
const SmsOtp = '“{{Domain_name}}/ws_sms”';
const generateJWTToken=NODEAPIURL+"JwtToken/GenerateJWTToken";
const ARCTokenAuthorization=NODEAPIURL+ "JwtToken/ARCTokenAuthorization";





module.exports.service_port = finalConfig.service_port;
module.exports.ui_url = finalConfig.ui_url;
module.exports.dbConn = finalConfig.dbConn;
// module.exports.email_smtp_config = email_smtp_config;

module.exports.Domain_name=Domain_name
 