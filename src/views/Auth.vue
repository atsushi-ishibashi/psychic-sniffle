<template>
    <div id="auth">
        <amplify-authenticator :authConfig="authConfig"/>
    </div>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      authConfig: {
        signInConfig: {
          usernameAlias: "email",
        },
        signUpConfig: {
          hiddenDefaults: ['phone_number'],
        },
      }
    }
  }
}
</script>