export function postData(url, data = {}) {
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include', // needed for cookies
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  }).then(response => response.json());
}

export function createDiv(className) {
  const div = document.createElement('div');
  div.className = className;
  return div;
}

export function createLabel(labelTarget, text, className) {
  const label = document.createElement('label');
  label.for = labelTarget;
  label.innerText = text;
  label.className = className;
  return label;
}

export function createInputField(inputType, name, id, className, placeholder) {
  const inputField = document.createElement('input');
  inputField.type = inputType;
  inputField.name = name;
  inputField.id = id;
  inputField.className = className;
  if (placeholder) inputField.placeholder = placeholder;
  return inputField;
}

export function createBrElement() {
  return document.createElement('br');
}

export function getParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}
