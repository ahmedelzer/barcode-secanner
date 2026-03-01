import axios from "axios";
//export const domainURL = "https://maingatewayapi.ihs-solutions.com:8000";
//export const domainURL = "41.196.0.25";
export const domainURL = "ihs-solutions.com";
export const baseURL = "http://" + domainURL;
export const defaultCentralizationProxyRoute =
  "http://" + domainURL + "/Centralization/api";
export const defaultProjectProxyRoute = `${baseURL}/BrandingMart/api/`;
export const defaultProjectProxyRouteWithoutAPI = `${baseURL}/BrandingMart/`;
export const publicImageURL = "https://" + domainURL + ":5055/";
export let isOnline = true;

//export const publicImageURL = "https://ihs-solutions.com:5055/";
//export const websocketBaseURI =
// "wss://maingatewayapi.ihs-solutions.com:8000/Chanels";
export const websocketBaseURI = "ws://" + domainURL + ":9001";
// export const languageName = window.localStorage.getItem("language");
// export const languageID = window.localStorage.getItem("languageID");
// export const projectProxyRoute =
//   window.sessionStorage.getItem("projectProxyRoute");//!make it by storge
// export let projectProxyRoute = "BrandingMart";

export function SetIsOnline(state) {
  isOnline = state;
}

// Add other methods as needed

export var baseURLWithoutApi = `${baseURL}`;
//"proxy": "http://ihs.ddnsking.com:8000",

export function GetProjectUrl(projectProxyRoute) {
  baseURLWithoutApi = `${baseURL}/${projectProxyRoute}`;
  return `${baseURL}/${projectProxyRoute}/api`;
}
export async function SetHeaders() {
  const headers = {
    "Content-Type": "application/json",
    // clientID: "",
  };

  // Remove any undefined or null properties
  Object.keys(headers).forEach(
    (key) =>
      (headers[key] === undefined || headers[key] === null) &&
      delete headers[key],
  );

  return headers;
}

export const request = axios.create({
  // baseURL: baseURL,
  // headers: {
  //   ...SetHeaders(),
  // },
  // withCredentials: true,
});
