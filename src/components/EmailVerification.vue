<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm5 md4 lg3 v-if="success">
      <v-card>
        <v-card-title primary-title>
          <v-layout column>
            <v-flex xs12 align-self-center>
              <v-avatar color="primary">
                <v-icon large dark>check</v-icon>
              </v-avatar>
            </v-flex>
            <v-flex xs12 align-self-center>
              <h3 class="headline mb-0">Success</h3>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text align-self-center>
          <p class="text-xs-center">
            Your email has been verified.
            <br>You can now
            <router-link to="/login">sign in</router-link>&nbsp;using your username and password.
          </p>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 sm5 md4 lg3 v-if="!success">
      <v-card>
        <v-card-title primary-title>
          <v-layout column>
            <v-flex xs12 align-self-center>
              <v-icon x-large>mood_bad</v-icon>
            </v-flex>
            <v-flex xs12 align-self-center>
              <h3 class="headline mb-0">Oops!</h3>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text align-self-center>
          <p class="text-xs-center">Invalid or expired verification code.</p>
        </v-card-text>
        <v-card-action>
          <v-btn block color="primary">Send New Verification Code</v-btn>
        </v-card-action>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      success: false
    };
  },
  mounted() {
    this.$http
      .post(
        "/api/users/verify-email/",
        { email: this.$route.params.email, code: this.$route.params.code },
        {
          validateStatus: function(status) {
            return status < 500;
          }
        }
      )
      .then(response => {
        if (response.data.status === "success") {
          this.success = true;
        } else {
          this.success = false;
        }
      });
  }
};
</script>
