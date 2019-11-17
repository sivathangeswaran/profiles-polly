import { Component,h ,State} from '@stencil/core';


@Component({
  tag: 'tab-home',
  styleUrl: 'tab-home.css'
})
export class TabHome {
  @State() value: string;


  login() {
      // let form = this.host.querySelector('form');
      // if (form.reportValidity()) {
      //     let inputs = this.host.querySelectorAll('input');
      //     this.loginShouldOccur.emit({ username: inputs[0].value, password: inputs[1].value });
      // }
  }

  handleChange(event) {
    console.log("handleEnter called");
      //this.login();
  }
  render() {
    return (
      <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          <ion-card-title>Card Title</ion-card-title>
        </ion-card-header>
  
        <ion-card-content>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </ion-card-content>
      </ion-card>
    </ion-content>
    );
  }
}
