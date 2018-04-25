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
    uploadSample: function() {
      var params = {
        inputName: this.newSample.name,
        inputSampleType: this.newSample.sample_type,
        inputBPM: this.newSample.bpm,
        inputKey: this.newSample.key,
        inputSampleRate: this.newSample.sample_rate,
        inputBitDepth: this.newSample.bit_depth,
      };
      axios.post("/samples", params).then(function(
        response) {
        console.log(response.data);
        this.samples.push(response.data);
        this.newSample = {user_id: "", name: "", sample_type: "", bpm: "", key: "", sample_rate: "", bit_depth: ""};
      }.bind(this));

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