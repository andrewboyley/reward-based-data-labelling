import { shallowMount } from "@vue/test-utils";
import CreateJob from "@/components/CreateJob/CreateJob.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);
describe("CreateJob", () => {
  const wrapper = shallowMount(CreateJob, {
    propsData: {
      isShowDialog: false,
    },
  });
  describe("When loaded", () => {
    it("should be vue instance", () => {
      expect(wrapper.vm).toBeTruthy();
    });

    it("should have all the necessary UI elements", () => {
      expect(wrapper.find("#title-input").exists()).toBe(true);
      expect(wrapper.find("#description-input").exists()).toBe(true);
      expect(wrapper.find("#discard-input").exists()).toBe(true);
      expect(wrapper.find("#submit-input").exists()).toBe(true);
      expect(wrapper.find("#createJobCard").exists()).toBe(true);
    });
  });
});
