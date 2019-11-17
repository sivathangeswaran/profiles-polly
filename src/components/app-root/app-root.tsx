import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/home/:searchText" component="app-home" />
          <ion-route url="/notifications" component="app-profile" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
