import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

function postData(url, data = {}) {
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
  }).then((response) => { response.json(); });
}

export default class SignUpScene extends Phaser.Scene {
  constructor() {
    super('SignUp');
  }

  create() {
    // create title text
    this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 8, 'MMORPG', { fontSize: '64px', fill: '#fff' });
    this.titleText.setOrigin(0.5);

    this.button1 = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.75,
      'button1',
      'button2',
      'Sign Up',
      this.signUp.bind(this),
    );

    this.button3 = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.90,
      'button1',
      'button2',
      'Back',
      this.startScene.bind(this, 'Title'),
    );

    this.createInput();
  }

  createInput() {
    const div = document.createElement('div');
    div.className = 'input-div';
    this.div = div;

    const label = document.createElement('label');
    label.for = 'login';
    label.innerText = 'Email';
    label.className = 'form-label';
    this.loginLabel = label;

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.name = 'login';
    inputField.id = 'login';
    inputField.className = 'login-input';
    inputField.placeholder = 'Email Address';
    this.loginInput = inputField;

    const label2 = document.createElement('label');
    label2.for = 'password';
    label2.innerText = 'Password';
    label2.className = 'form-label';
    this.passwordLabel = label2;

    const inputField2 = document.createElement('input');
    inputField2.type = 'password';
    inputField2.name = 'password';
    inputField2.id = 'password';
    inputField2.className = 'login-input';
    this.passwordInput = inputField2;

    const label3 = document.createElement('label');
    label3.for = 'username';
    label3.innerText = 'Username';
    label3.className = 'form-label';
    this.userNameLabel = label3;

    const inputField3 = document.createElement('input');
    inputField3.type = 'text';
    inputField3.name = 'username';
    inputField3.id = 'username';
    inputField3.className = 'login-input';
    inputField3.placeholder = 'Username';
    this.userNameInput = inputField3;

    this.div.append(this.loginLabel);
    this.div.append(document.createElement('br'));
    this.div.append(this.loginInput);
    this.div.append(document.createElement('br'));
    this.div.append(document.createElement('br'));
    this.div.append(this.passwordLabel);
    this.div.append(document.createElement('br'));
    this.div.append(this.passwordInput);
    this.div.append(document.createElement('br'));
    this.div.append(document.createElement('br'));
    this.div.append(this.userNameLabel);
    this.div.append(document.createElement('br'));
    this.div.append(this.userNameInput);

    document.body.appendChild(this.div);
  }

  startScene(targetScene) {
    this.div.parentNode.removeChild(this.div);
    this.scene.start(targetScene);
  }

  signUp() {
    const loginValue = this.loginInput.value;
    const passwordValue = this.passwordInput.value;
    const userNameValue = this.userNameInput.value;

    if (loginValue && passwordValue && userNameValue) {
      postData('http://localhost:3000/signup', {
        email: loginValue,
        password: passwordValue,
        username: userNameValue,
      }).then((response) => {
        if (response.status === 200) {
          window.alert(response.message);
          this.startScene('Login');
        } else {
          console.log(response.error);
          window.alert('Invalid username or password');
        }
      }).catch((error) => {
        console.log(error.message);
        window.alert('Invalid username or password');
      });
    } else {
      window.alert('all fields must be filled out');
    }
  }
}
