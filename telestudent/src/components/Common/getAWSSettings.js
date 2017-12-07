import appConfig from "../../config";
import toastr from 'toastr';
var AWS = require("aws-sdk");
var AWSCognito = require("amazon-cognito-identity-js");
var apigClientFactory = require("aws-api-gateway-client").default;
var poolData = {
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId
};
AWS.config.update({ region: appConfig.region });
const userPool = new AWSCognito.CognitoUserPool(poolData);

function getUserPool() {
    return userPool;
}

function getcognitoUser(username) {
    var userData = {
        Username: username,
        Pool: userPool
    };
    return new AWSCognito.CognitoUser(userData);
}

function getAutheticationDetails(username, password) {
    var authenticationData = {
        Username: username,
        Password: password,
    };
    return new AWSCognito.AuthenticationDetails(authenticationData);
}

function getCredentials(userToken, callback) {
    console.log("Getting temporary credentials");
    var logins = {};
    logins[
        "cognito-idp." + appConfig.region + ".amazonaws.com/" + appConfig.UserPoolId
    ] = userToken;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: appConfig.IdentityPoolId,
        Logins: logins
    });
    AWS.config.credentials.get(function (err) {
        if (err) {
            console.log(err.message ? err.message : err);
            return;
        }
        callback();
    });
}
function makeAPIRequest(pathTemplate, callback) {
    var apigClient;
    apigClient = apigClientFactory.newClient({
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken,
        region: appConfig.region,
        invokeUrl: appConfig.InvokeUrl
    });
    var params = JSON.parse('{}');
    var additionalParams = JSON.parse('{}');
    var body = JSON.parse('{}');

    apigClient
        .invokeApi(params, pathTemplate, appConfig.Method, additionalParams, body)
        .then(function (result) {
            callback(result.data);
        })
        .catch(function (result) {

            if (result.response) {
                toastr.error(JSON.stringify(result.response));
            } else {
                toastr.error(result.message);
            }
            callback(null);
        });
}
export {
    getUserPool,
    getcognitoUser,
    getAutheticationDetails,
    getCredentials,
    makeAPIRequest
}