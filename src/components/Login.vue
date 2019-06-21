<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md3>
          <v-card>
            <v-card-title primary-title>
              <v-layout column>
                <v-flex xs12 align-self-center>
                  <v-avatar color="primary">
                    <v-icon dark>lock</v-icon>
                  </v-avatar>
                </v-flex>
                <v-flex xs12 align-self-center>
                  <h3 class="headline mb-0">Sign in</h3>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  name="login"
                  label="Username"
                  type="text"
                  v-model="login"
                  :rules="[rules.required]"
                  v-on:keyup.enter="loginHandler"
                ></v-text-field>
                <v-text-field
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                  :error-messages="errors"
                  :rules="[rules.required]"
                  v-on:keyup.enter="loginHandler"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="loginHandler">Login</v-btn>
              <v-btn flat color="gray" to="/register">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  props: ["nextUrl"],
  data: function() {
    return {
      login: "",
      password: "",
      errors: [],
      loading: false,
      rules: {
        required: value => !!value || "Required"
      }
    };
  },
  methods: {
    loginHandler: function(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        this.errors = [];
        if (this.password.length > 0) {
          this.loading = true;
          this.$http
            .post(
              "api/users/login",
              {
                login: this.login,
                password: this.password
              },
              {
                validateStatus: function(status) {
                  return status < 500;
                }
              }
            )
            .then(response => {
              this.loading = false;
              if (response.data.status === "success") {
                localStorage.setItem("jtoken", response.data.data.token);

                if (localStorage.getItem("jtoken") != null) {
                  this.$emit("loggedin");

                  if (this.$route.params.nextUrl != null) {
                    this.$router.push(this.$route.params.nextUrl);
                  } else {
                    this.$router.push("/");
                  }
                }
              } else {
                for (let key in response.data.data) {
                  this.errors.push(response.data.data[key][0].message);
                }
              }
            })
            .catch(err => {
              this.loading = false;
              alert("Some error occured" + err.message);
            });
        }
      }
    }
  }
};
</script>
