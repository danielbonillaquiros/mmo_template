import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

export default class SignUpScene extends Phaser.Scene {
  constructor() {
    super('SignUp');
  }

  create() {
    // create title text
    this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Zenva MMORPG', { fontSize: '64px', fill: '#fff' });
    this.titleText.setOrigin(0.5);

    // create a login button
    this.loginButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.65,
      'button1',
      'button2',
      'Login',
      this.startScene.bind(this, 'Login'),
    );

    // create a sign up button
    this.loginButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.80,
      'button1',
      'button2',
      'Sign Up',
      this.startScene.bind(this, 'SignUp'),
    );
  }

  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
