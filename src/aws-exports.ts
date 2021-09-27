const awsconfig = {
    Auth: {
        region: 'ap-northeast-1',
        userPoolId: process.env.VUE_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.VUE_APP_USER_POOL_CLIENT_ID,
        authenticationFlowType: 'USER_SRP_AUTH',
    },
    Analytics: {
        AWSPinpoint: {
            appId: 'd2ab3f817dbb42148f25ad137cef142b',
            region: 'us-east-1',
        },
    },
}

export default awsconfig