import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';
import {
  postData, createDiv, createLabel, createInputField, createBrElement,
} from '../utils/utils';

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
    this.div = createDiv('input-div');
    this.loginLabel = createLabel('login', 'Email:', 'form-label');
    this.loginInput = createInputField('text', 'login', 'login', 'login-input', 'Email Address');
    this.passwordLabel = createLabel('password', 'Password', 'form-label');
    this.passwordInput = createInputField('password', 'password', 'password', 'login-input');
    this.userNameLabel = createLabel('username', 'Username:', 'form-label');
    this.userNameInput = createInputField('text', 'username', 'username', 'login-input', 'Username');

    this.div.append(this.loginLabel);
    this.div.append(createBrElement());
    this.div.append(this.loginInput);
    this.div.append(createBrElement());
    this.div.append(createBrElement());
    this.div.append(this.passwordLabel);
    this.div.append(createBrElement());
    this.div.append(this.passwordInput);
    this.div.append(createBrElement());
    this.div.append(createBrElement());
    this.div.append(this.userNameLabel);
    this.div.append(createBrElement());
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
