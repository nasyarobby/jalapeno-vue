<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm5 md4 lg3>
      <v-card>
        <v-card-title primary-title>
          <v-layout column>
            <v-flex xs12 align-self-center>
              <v-avatar color="primary">
                <v-icon large dark>person</v-icon>
              </v-avatar>
            </v-flex>
            <v-flex xs12 align-self-center>
              <h3 class="headline mb-0">Sign Up</h3>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              name="name"
              label="Name"
              type="text"
              v-model="name.value"
              :error-messages="name.errors"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              name="email"
              label="Email"
              type="text"
              v-model="email.value"
              :error-messages="email.errors"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              name="username"
              label="Username"
              type="text"
              v-model="username.value"
              :error-messages="username.errors"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              name="password"
              label="Password"
              type="password"
              v-model="password.value"
              :error-message="password.errors "
              :rules="[rules.required]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="signUpHandler">
            Sign up
            <div class="ml-3" v-if="loading">
              <v-expand-transition>
                <v-progress-circular v-if="loading" size="24" color="white" indeterminate></v-progress-circular>
              </v-expand-transition>
            </div>
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <p>
            already signed up?&nbsp;
            <router-link to="/login">Sign in</router-link>&nbsp;instead.
          </p>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      email: { value: "", errors: [] },
      username: { value: "", errors: [] },
      password: { value: "", errors: [] },
      name: { value: "", errors: [] },
      rules: {
        required: value => !!value || "Required"
      }
    };
  },
  methods: {
    signUpHandler: function(e) {
      e.preventDefault();
      this.$http
        .put(
          "api/users/register",
          {
            email: this.email.value,
            name: this.name.value,
            username: this.username.value,
            password: this.password.value
          },
          {
            validateStatus: function(status) {
              return status < 500;
            }
          }
        )
        .then(response => {
          if (response.data.status === "success") {
          } else {
            this.username.errors = response.data.data.username
              ? response.data.data.username.map(e => {
                  return e.message;
                })
              : [];

            this.email.errors = response.data.data.email
              ? response.data.data.email.map(e => {
                  return e.message;
                })
              : [];
            this.name.errors = response.data.data.name
              ? response.data.data.name.map(e => {
                  return e.message;
                })
              : [];
          }
        })
        .catch(err => {
          this.loading = false;
          alert("Some error occured" + err.message);
        });
    }
  }
};
</script>
