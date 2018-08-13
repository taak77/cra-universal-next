import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId : process.env.COGNITO_USER_POOL_ID,
    ClientId : process.env.COGNITO_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);
let cognitoUser;

export function getCurrentUser() {
    return new Promise((resolve) => {
        cognitoUser = userPool.getCurrentUser();
        console.log('getCurrentUser', cognitoUser)
        resolve(cognitoUser);
    });
}

export function signUp({email, password}) {
    console.log('signUp',email, password)
    const attributeList = [];
    attributeList.push(new CognitoUserAttribute({
        Name: 'email',
        Value: email
    }));

    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                console.log(err.message || JSON.stringify(err));
                reject(err);
                return;
            }
            cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername(), JSON.stringify(result));
            resolve(cognitoUser);
        });
    });
}

export function confirmRegistration({email, code}) {
    const userData = {
        Username : email,
        Pool : userPool
    };
    cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (err) {
                console.log(err.message || JSON.stringify(err));
                reject(err);
                return;
            }
            console.log('call result: ' + result);
            resolve(result);
        });
    });
}

export function signIn({email, password}) {
    const authenticationData = {
        Username : email,
        Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
        Username : email,
        Pool : userPool
    };
    cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: async function () {
                cognitoUser = await getCurrentUser();
                resolve(cognitoUser);
            },
            onFailure: function(err) {
                console.log(err.message || JSON.stringify(err));
                cognitoUser = null;
                reject(err);
            },
        });
    });
}

export function signOut() {
    if (!cognitoUser) {
        return Promise.reject(new Error('User is not signed in'));
    }
    return new Promise((resolve) => {
        cognitoUser.signOut();
        cognitoUser = null;
        resolve(cognitoUser);
    });
}

export function deleteUser() {
    if (!cognitoUser) {
        return Promise.reject(new Error('User is not signed in'));
    }
    return new Promise((resolve, reject) => {
        cognitoUser.deleteUser(function(err, result) {
            if (err) {
                console.log(err.message || JSON.stringify(err));
                reject(err);
                return;
            }
            cognitoUser = null;
            console.log('call result: ' + result);
            resolve(cognitoUser);
        });
    });
}
