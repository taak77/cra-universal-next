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

console.log('poolData', poolData)

const userPool = new CognitoUserPool(poolData);
let cognitoUser;

export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        cognitoUser = userPool.getCurrentUser();
        console.log('getCurrentUser', cognitoUser);
        if (cognitoUser && !cognitoUser.attributes) {
            cognitoUser.getSession(async function(err, session) {
                if (err) {
                    console.error(err.message || JSON.stringify(err));
                    reject(err);
                    return;
                }
                console.log('session validity: ' + session.isValid());
                try {
                    cognitoUser.attributes = await getUserAttributes();
                    resolve(cognitoUser);
                } catch (err) {
                    console.error(err.message || JSON.stringify(err));
                    reject(err);
                }
            });
        } else {
            resolve(cognitoUser);
        }
    });
}

export function signUp({username, email, password}) {
    console.log('signUp', username, email, password)
    const attributeList = [];
    attributeList.push(new CognitoUserAttribute({
        Name: 'email',
        Value: email
    }));

    return new Promise((resolve, reject) => {
        userPool.signUp(username, password, attributeList, null, (err, result) => {
            if (err) {
                console.error(err.message || JSON.stringify(err));
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
                console.error(err.message || JSON.stringify(err));
                reject(err);
                return;
            }
            console.log('call result: ' + result);
            resolve(result);
        });
    });
}

export function signIn({username, password}) {
    const authenticationData = {
        Username : username,
        Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
        Username : username,
        Pool : userPool
    };
    cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: async function () {
                try {
                    cognitoUser = await getCurrentUser();
                    resolve(cognitoUser);
                } catch (err) {
                    console.error(err.message || JSON.stringify(err));
                    reject(err);
                }
            },
            onFailure: function(err) {
                console.error(err.message || JSON.stringify(err));
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
                console.error(err.message || JSON.stringify(err));
                reject(err);
                return;
            }
            cognitoUser = null;
            console.log('call result: ' + result);
            resolve(cognitoUser);
        });
    });
}

export function getUserAttributes() {
    if (!cognitoUser) {
        return Promise.reject(new Error('User is not signed in'));
    }
    return new Promise((resolve, reject) => {
        cognitoUser.getUserAttributes(function(err, attributes) {
            if (err) {
                console.error(err.message || JSON.stringify(err));
                reject(err);
                return;
            } else {
                const attrs = attributes.reduce((acc, attr) => {
                    if (attr.Name === 'preferred_username') {
                        acc.username = attr.Value;
                    } else if (attr.Name !== 'sub' && attr.Name !== 'email_verified') {
                        acc[attr.Name] = attr.Value;
                    }
                    return acc;
                }, {userId: cognitoUser.username});
                resolve(attrs);
            }
        });
    });
}

export function updateAttributes(attributes) {
    const attributeList = [];
    attributes.forEach(attr => {
        const attribute = new CognitoUserAttribute(attr);
        attributeList.push(attribute);
    });

    return new Promise((resolve, reject) => {
        cognitoUser.updateAttributes(attributeList, async function(err, result) {
            if (err) {
                console.log(err.message || JSON.stringify(err));
                reject(err);
                return;
            }
            try {
                cognitoUser = await getCurrentUser();
                resolve(cognitoUser);
            } catch (err) {
                console.error(err.message || JSON.stringify(err));
                reject(err);
            }
            console.log('call result: ' + result);
        });
    });
}
