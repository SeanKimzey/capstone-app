/* global Vue, VueRouter, axios */
var LogoutPage = {
  template: "<h1>Logout</h1>",
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/v1/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};


var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Audio Sample List",
      samples: [],
      newSample: {name: ""}
    };
  },
  created: function() {
    axios.get("/samples").then(function(response) {
      this.samples = response.data;
    }.bind(this));

  },
  methods: {
    uploadFile: function(event) {
      input = document.getElementById("fileUploadInput");
      if (input.files.length > 0) {
        var formData = new FormData();
        formData.append("name", this.newSample.name);
        formData.append("sample_type", this.newSample.sample_type);
        formData.append("bpm", this.newSample.bpm);
        formData.append("key", this.newSample.key);
        formData.append("sample_rate", this.newSample.sample_rate);
        formData.append("bit_depth", this.newSample.bit_depth);
        formData.append("image", input.files[0]);

        axios
          .post("http://localhost:3000/samples", formData)
          .then(function(response) {
            console.log(response);
            console.log(this);
            this.newSample.name = "";
            this.newSample.sample_type = "";
            this.newSample.bpm = "";
            this.newSample.key = "";
            this.newSample.sample_rate = "";
            this.newSample.bit_depth = ""; 
            input.value = "";
          }.bind(this));

      }
    }
  },

  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage },
    { path: "/signup", component: SignupPage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage }
  ],
      
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});


