import CredentialsBaseScene from './CredentialsBaseScene';
import { postData } from '../utils/utils';

export default class LoginScene extends CredentialsBaseScene {
  constructor() {
    super('Login');
  }

  create() {
    this.createUi('Login', this.login.bind(this), 'Forgot Password', this.startScene.bind(this, 'ForgotPassword'), 'Back', this.startScene.bind(this, 'Title'));
  }

  login() {
    const loginValue = this.loginInput.value;
    const passwordValue = this.passwordInput.value;

    if (loginValue && passwordValue) {
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
    } else {
      window.alert('all fields must be filled out');
    }
  }
}
