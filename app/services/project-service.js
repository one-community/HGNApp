
import { inject } from '@ember/service';
import Service from '@ember/service';

export default Service.extend({

  dataService: inject("datastore-service"),

  getUserProjects(requestorId) {
    let relativePath = "/projects/user/" + requestorId;
    let data = "";
    let method = "get";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },

  getAllProjects() {

    let relativePath = "/projects";
    let data = "";
    let method = "get";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);

    return request;
  },

  getProjectById(projectId) {
    let relativePath = "/project/" + projectId;
    let data = "";
    let method = "get";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);

    return request;
  },

  postProject(project) {
    let relativePath = "/projects/";
    let data = project;
    let method = "post";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);

    return request;
  },

  editProjectData(project, projectId) {
    let relativePath = "/project/" + projectId;
    let data = project;
    let method = "put";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },

  deleteProject(projectId) {
    let relativePath = "/project/" + projectId;
    let data = null;
    let method = "delete";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },

  getProjectMembers(projectId) {
    let relativePath = "/project/" + projectId + "/users";
    let data = null;
    let method = "get";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },

  manageProjectMembers(projectId, users) {
    let relativePath = "/project/" + projectId + "/users";
    let data = users;
    let method = "post";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;

  }


});
