import Vue from "vue";
import Vuex from "vuex";
import grr from "@/store/modules/grr";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    grr
  }
});
