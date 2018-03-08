import _ from "lodash";
import App from "./App";
import x from "./main";
function component() {
  const arr = [1, 2, 3];
  const iAmJavascriptES6 = () => console.log(...arr);
  window.iAmJavascriptES6 = iAmJavascriptES6;

  var element = document.createElement("div");

  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello", "webpack", _.join(arr, "/")], " ");

  return element;
}

document.body.appendChild(component());
