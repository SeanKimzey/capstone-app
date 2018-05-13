/* global Vue, VueRouter, axios */
var LogoutPage = {
  template: "<h1>Logout</h1>",
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
    alert("You successfully logged out!");
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
          alert("You successfully logged in!");
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
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    createAccount: function(event) {
      var userInput = document.getElementById("imageUploadInput");
      if (userInput.files.length > 0) {
        var formData = new FormData();
        formData.append("first_name", this.first_name);
        formData.append("last_name", this.last_name);
        formData.append("email", this.email);
        formData.append("password", this.password);
        formData.append("password_confirmation", this.passwordConfirmation);
        formData.append("image", userInput.files[0]);

        axios
          .post("/users", formData)
          .then(function(response) {
            console.log(response);
            router.push("/login");
          })
          .catch(
            function(error) {
              this.errors = error.response.data.errors;
            }.bind(this)
          );
      }
    }
  }
};

// submit: function() {
//     var params = {
//       first_name: this.first_name,
//       last_name: this.last_name,
//       email: this.email,
//       password: this.password,
//       password_confirmation: this.passwordConfirmation
//     };
//     axios
//       .post("/users", params)
//       .then(function(response) {
//         router.push("/login");
//       })
//       .catch(
//         function(error) {
//           this.errors = error.response.data.errors;
//         }.bind(this)
//       );
//   }

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Audio Sample List",
      current_user: [],
      samples: [],
      newSample: { name: "" },
      currentUser: false,
      song: "a.mp3"
    };
  },
  mounted: function() {
    axios.get("/samples").then(
      function(response) {
        this.samples = response.data;
      }.bind(this)
    );
    setTimeout(function() {
      var wavesurfers = [].map.call(
        document.querySelectorAll(".player"),
        function(element) {
          var wavesurfer = new WaveSurfer({
            container: element,
            waveColor: "violet",
            progressColor: "purple"
          });

          wavesurfer.init();

          return wavesurfer;
        }
      );
    }, 3000);

    axios.get("/current_user").then(
      function(response) {
        this.$parent.current_user = response.data;
        console.log(response.data);
        if (response.data !== null) {
          console.log("inside");
          this.currentUser = true;
        }
      }.bind(this)
    );
  },
  methods: {
    uploadFile: function(event) {
      var input = document.getElementById("fileUploadInput");
      if (input.files.length > 0) {
        var formData = new FormData();
        formData.append("name", this.newSample.name);
        formData.append("sample_type", this.newSample.sample_type);
        formData.append("bpm", this.newSample.bpm);
        formData.append("key", this.newSample.key);
        formData.append("sample_rate", this.newSample.sample_rate);
        formData.append("bit_depth", this.newSample.bit_depth);
        formData.append("image", input.files[0]);

        axios.post("http://localhost:3000/samples", formData).then(
          function(response) {
            console.log(response);
            console.log(this);
            this.newSample.name = "";
            this.newSample.sample_type = "";
            this.newSample.bpm = "";
            this.newSample.key = "";
            this.newSample.sample_rate = "";
            this.newSample.bit_depth = "";
            input.value = "";
          }.bind(this)
        );
        alert("Sample Uploaded Successfully");
        router.push("/search_samples");
      }
    }
  },

  computed: {}
};

var SearchSamplesPage = {
  template: "#search_samples-page",
  data: function() {
    return {
      message: "Audio Sample List",
      currentUser: false,
      searchName: "",
      searchType: "",
      searchKey: "",
      searchBPM: "",
      samples: []
    };
  },
  created: function() {
    axios.get("/samples").then(
      function(response) {
        this.samples = response.data;
      }.bind(this)
    );
    axios.get("/current_user").then(
      function(response) {
        console.log(response.data);
        if (response.data !== null) {
          console.log("inside");
          this.currentUser = true;
        }
      }.bind(this)
    );
  },
  methods: {
    isValidSample: function(inputSample) {
      var validName = inputSample.name
        .toLowerCase()
        .includes(this.searchName.toLowerCase());
      var validType = inputSample.sample_type
        .toLowerCase()
        .includes(this.searchType.toLowerCase());
      var validKey = inputSample.key
        .toLowerCase()
        .includes(this.searchKey.toLowerCase());
      var validBPM = inputSample.validBPM
        .toString()
        .includes(this.searchBPM.toString());

      return validName && validType && validKey && validBPM;
    }
  },

  computed: {}
};

var SampleUploadPage = {
  template: "#sample_upload-page",
  data: function() {
    return {
      message: "Audio Sample List",
      newSample: { name: "" }
    };
  },
  created: function() {
    axios.get("/samples").then(
      function(response) {
        this.samples = response.data;
      }.bind(this)
    );
    axios.get("/current_user").then(
      function(response) {
        console.log(response.data);
        if (response.data !== null) {
          console.log("inside");
          this.currentUser = true;
        }
      }.bind(this)
    );
  },
  methods: {
    uploadFile: function(event) {
      var input = document.getElementById("fileUploadInput");
      if (input.files.length > 0) {
        var formData = new FormData();
        formData.append("name", this.newSample.name);
        formData.append("sample_type", this.newSample.sample_type);
        formData.append("bpm", this.newSample.bpm);
        formData.append("key", this.newSample.key);
        formData.append("sample_rate", this.newSample.sample_rate);
        formData.append("bit_depth", this.newSample.bit_depth);
        formData.append("image", input.files[0]);

        axios.post("http://localhost:3000/samples", formData).then(
          function(response) {
            console.log(response);
            console.log(this);
            this.newSample.name = "";
            this.newSample.sample_type = "";
            this.newSample.bpm = "";
            this.newSample.key = "";
            this.newSample.sample_rate = "";
            this.newSample.bit_depth = "";
            input.value = "";
          }.bind(this)
        );
        router.push("/");
        alert("Sample Uploaded Successfully");
        router.push("/search_samples");
        location.reload(true);
      }
    }
  },

  computed: {}
};

var CartedSamplePage = {
  template: "#carted_samples-page",
  data: function() {
    return {
      message: "Your Carted Samples",
      carted_samples: []
    };
  },
  created: function() {
    axios.get("/carted_samples").then(
      function(response) {
        this.carted_samples = response.data;
      }.bind(this)
    );
  },
  methods: {},

  computed: {}
};

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/signup", component: SignupPage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
    { path: "/carted_samples", component: CartedSamplePage },
    { path: "/search_samples", component: SearchSamplesPage },
    { path: "/sample_upload", component: SampleUploadPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  data: function() {
    return {
      current_user: []
    };
  },
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});
