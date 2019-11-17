import { Component, Prop, State, h } from '@stencil/core';
import { sayHello } from '../../helpers/utils';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {
@State() dataLoaded: boolean;
  @State() state = false;
  @Prop() name: string;
  @State() notifications : any;

  formattedName(): string {
    if (this.name) {
      return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
    }
    return '';
  }

  getNotificationsData() {

    fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nasdaq-polly-lqprf/service/profiles-service/incoming_webhook/get-profiles?arg=')
    .then((response: Response) => response.json())
    .then(response => {
      this.notifications = ["Heather Abott is in Bangalore",
      "Vikash Kumar is out of office",
      "Siva T is attending the MongoDB Training",
      "Heather Abott is in Bangalore",
      "Vikash Kumar is out of office",
      "Siva T is attending the MongoDB Training",
      "Heather Abott is in Bangalore",
      "Vikash Kumar is out of office",
      "Siva T is attending the MongoDB Training",
      "Heather Abott is in Bangalore",
      "Vikash Kumar is out of office",
      "Siva T is attending the MongoDB Training","Heather Abott is in Bangalore",
      "Vikash Kumar is out of office",
      "Siva T is attending the MongoDB Training",
      "Heather Abott is in Bangalore",
      "Vikash Kumar is out of office"];
      this.dataLoaded = true;

    });
  }

  componentWillLoad() {
    this.getNotificationsData();
    //this.showData = false;
  }

  render() {
    if(this.dataLoaded){
      return [

        <ion-header>
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/" />
    </ion-buttons>
    <ion-title>Notifications</ion-title>
  </ion-toolbar>
  </ion-header>,
  
  <ion-list> 
          
  {this.notifications.map(notification =>
    
    <ion-item>
    
  <ion-avatar slot="start">
    <img src="assets/icon/avatar.jpeg" />
  </ion-avatar>
  <ion-label>{notification}</ion-label>
  
  </ion-item>
  
                )}
  
  
  
  </ion-list>    
  
      ];
    }else{
      return;
    }
    
  }
}


{/* <ion-header>
<ion-toolbar color="primary">
  <ion-buttons slot="start">
    <ion-back-button defaultHref="/" />
  </ion-buttons>
  <ion-title>Profile: {this.name}</ion-title>
</ion-toolbar>
</ion-header>,

<ion-content class="ion-padding">
<p>
  {sayHello()}! My name is {this.formattedName()}. My name was passed in through a
  route param!
</p>

<ion-item>
  <ion-label>Setting ({this.state.toString()})</ion-label>
  <ion-toggle
    checked={this.state}
    onIonChange={ev => (this.state = ev.detail.checked)}
  />
</ion-item>
</ion-content> */}