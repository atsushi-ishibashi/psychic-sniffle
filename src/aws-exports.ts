const awsconfig = {
    Auth: {
        region: 'ap-northeast-1',
        userPoolId: process.env.VUE_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.VUE_APP_USER_POOL_CLIENT_ID,
        authenticationFlowType: 'USER_SRP_AUTH',
        identityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID,
    },
    Analytics: {
        AWSPinpoint: {
            appId: process.env.VUE_APP_PINPOINT_APP_ID,
            region: 'ap-northeast-1',
            mandatorySignIn: false,
        },
        AWSKinesisFirehose: {
            region: 'ap-northeast-1',
        }
    },
}

export default awsconfig