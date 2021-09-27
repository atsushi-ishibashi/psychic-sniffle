const awsconfig = {
    Auth: {
        region: 'ap-northeast-1',
        userPoolId: process.env.VUE_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.VUE_APP_USER_POOL_CLIENT_ID,
        authenticationFlowType: 'USER_SRP_AUTH',
    },
    Analytics: {
        AWSPinpoint: {
            appId: process.env.VUE_APP_PINPOINT_APP_ID,
            region: 'us-east-1',
            mandatorySignIn: false,
        },
    },
}

export default awsconfig