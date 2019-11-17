import { Component, h, State,Event, EventEmitter, Prop} from '@stencil/core';

@Component({
  tag: 'app-notes',
  styleUrl: 'app-notes.css'
})
export class AppHome {
  @State() value: string;
  @Prop() userId:string;

  saveUserNotes(event){
     localStorage.setItem(this.userId,event.target.value);
  }

  componentWillLoad() {
    console.log(this.userId);
   this.value = localStorage.getItem(this.userId);

  }


  render() {
    return[
      <div class="half-height">
        <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" />
        </ion-buttons>
        <ion-title>Notes</ion-title>
      </ion-toolbar>
      </ion-header>
      
      <ion-card>
      <ion-textarea placeholder="Enter user notes here..." on-input={(event) => { this.saveUserNotes(event);}} value={this.value}></ion-textarea> 
      <ion-item>

      </ion-item>
      <ion-item lines="none">
                <ion-button color="secondary" size="small" slot="end" on-click={() => { location.href='/'}}>Done</ion-button>

      </ion-item>
      </ion-card>

      
      </div>
      



    ]
      


    
  }
}

             