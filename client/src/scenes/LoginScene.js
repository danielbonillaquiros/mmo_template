import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';
import { postData } from '../utils/utils';

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super('Login');
  }

  create() {
    // create title text
    this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 8, 'MMORPG', { fontSize: '64px', fill: '#fff' });
    this.titleText.setOrigin(0.5);

    this.button1 = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.60,
      'button1',
      'button2',
      'Login',
      this.login.bind(this),
    );

    this.button2 = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.75,
      'button1',
      'button2',
      'Forgot Password',
      this.startScene.bind(this, 'ForgotPassword'),
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

    this.div.append(this.loginLabel);
    this.div.append(document.createElement('br'));
    this.div.append(this.loginInput);
    this.div.append(document.createElement('br'));
    this.div.append(document.createElement('br'));
    this.div.append(this.passwordLabel);
    this.div.append(document.createElement('br'));
    this.div.append(this.passwordInput);

    document.body.appendChild(this.div);
  }

  startScene(targetScene) {
    this.div.parentNode.removeChild(this.div);
    this.scene.start(targetScene);
  }

  login() {
    const loginValue = this.loginInput.value;
    const passwordValue = this.passwordInput.value;

    postData('http://localhost:3000/login', {
      email: loginValue,
      password: passwordValue,
    }).then((response) => {
      if (response.status === 200) {
        this.startScene('Game');
      } else {
        console.log(response.error);
        window.alert('Invalid username or password');
      }
    }).catch((error) => {
      console.log(error.message);
      window.alert('Invalid username or password');
    });
  }
}
