/* global Vue, VueRouter, axios */

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
        formData.append("name", this.name);
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
            this.name = "";
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
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});


