import { shallowMount, mount } from "@vue/test-utils";
import ListJobs from "@/views/ListJobs.vue";
import Vue from "vue";
import Vuetify from "vuetify";

import * as Job from "@/api/Job.api";
import flushPromises from "flush-promises";

//create dummy jobs
let testJobs = [
  {
    _id: "0",
    title: "Title",
    type: "Type",
    labels: ["a", "b"],
    description: "Description",
  },
  {
    _id: "1",
    title: "Title",
    type: "Type",
    labels: ["a", "b"],
    description: "Description",
  },
  {
    _id: "2",
    title: "Title",
    type: "Type",
    labels: ["a", "b"],
    description: "Description",
  },
];

//mock the job api
jest.mock("../../src/api/Job.api", () => ({
  getAllJobs: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ data: testJobs })),
  getAcceptedJobs: jest.fn().mockImplementation(() => Promise.resolve()),
  getAuthoredJobs: jest.fn().mockImplementation(() => Promise.resolve()),
  getAvailableJobs: jest.fn().mockImplementation(() => Promise.resolve()),
}));

const vuetify = new Vuetify();

const title = "Test";

const mockJobResponse = {
  data: {
    testJobs,
  },
};

Vue.use(Vuetify);

describe("When list jobs is loaded", async () => {
  const wrapper = shallowMount(ListJobs);
  it("should have all the necessary UI elements", () => {
    expect(wrapper.find("#list-jobs").exists()).toBe(true);
  });
});
// a test for each possible endpoint is made
describe("When list jobs is loaded and get accepted jobs is called", () => {
  const getAcceptedJobSpy = jest.spyOn(Job, "getAcceptedJobs");
  getAcceptedJobSpy.mockResolvedValue(mockJobResponse);

  const wrapper = shallowMount(ListJobs, {
    vuetify,
    propsData: {
      title: title,
      jobs: testJobs,
      endpoint: "accepted",
    },
  });

  it("should be vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("handles accepted jobs", async () => {
    await flushPromises();
    expect(getAcceptedJobSpy).toHaveBeenCalled();
  });
});

describe("When list jobs is loaded and get available jobs is called", () => {
  const getAvailableJobSpy = jest.spyOn(Job, "getAvailableJobs");
  getAvailableJobSpy.mockResolvedValue(mockJobResponse);

  //mock list jobs
  const wrapper = shallowMount(ListJobs, {
    vuetify,
    propsData: {
      title: title,
      jobs: testJobs,
      endpoint: "available",
    },
  });

  //make sure it is a vue instance
  it("should be vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("handles available jobs", async () => {
    await flushPromises();
    expect(getAvailableJobSpy).toHaveBeenCalled();
  });
});

describe("When list jobs is loaded and get authored jobs is called", () => {
  //spy the job response
  const getAuthoredJobSpy = jest.spyOn(Job, "getAuthoredJobs");
  getAuthoredJobSpy.mockResolvedValue(mockJobResponse);

  // mock list jobs
  const wrapper = shallowMount(ListJobs, {
    vuetify,
    propsData: {
      title: title,
      jobs: testJobs,
      endpoint: "authored",
    },
  });

  // make sure it is a vue instance
  it("should be vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  // ensure jobs authored by a particular author (the logged in one) appear correctly
  it("handles authored jobs", async () => {
    await flushPromises();
    expect(getAuthoredJobSpy).toHaveBeenCalled();
  });
});

describe("When list jobs is loaded and get all jobs is called", () => {
  // mock job response 
  const getAllJobSpy = jest.spyOn(Job, "getAllJobs");
  getAllJobSpy.mockResolvedValue(mockJobResponse);

  const wrapper = shallowMount(ListJobs, {
    vuetify,
    propsData: {
      title: title,
      jobs: testJobs,
    },
  });
  it("should be vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  // ensure all jobs display appropriately
  it("handles all jobs", async () => {
    await flushPromises();
    expect(getAllJobSpy).toHaveBeenCalled();
  });
});

describe("testing handleResponseList", () => {
  // output expected
  let expectedOutput = [
    {
      _id: "0",
      title: "Title",
      type: "Image",
      labels: ["a", "b"],
      description: "Description",
    },
    {
      _id: "1",
      title: "Title",
      type: "Image",
      labels: ["a", "b"],
      description: "Description",
    },
    {
      _id: "2",
      title: "Title",
      type: "Image",
      labels: ["a", "b"],
      description: "Description",
    },
  ];
  // mock list jobs
  const wrapper = shallowMount(ListJobs, {
    vuetify,
    propsData: {
      title: title,
      jobs: testJobs,
      endpoint: "authored",
    },
  });

  it("correctly updates the type", () => {
    // call the function
    let actualOutput = (wrapper.vm as any).handleResponseList(testJobs);

    // check the output
    for (let i = 0; i < testJobs.length; i++) {
      const expected = expectedOutput[i];
      const actual = actualOutput[i];

      expect(actual["_id"]).toEqual(expected["_id"]);
      expect(actual["title"]).toEqual(expected["title"]);
      expect(actual["labels"]).toEqual(expected["labels"]);
      expect(actual["description"]).toEqual(expected["description"]);
      expect(actual["type"]).toEqual("Image");
    }
  });
});
