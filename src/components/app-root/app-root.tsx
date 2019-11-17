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
          <ion-route url="/" component="app-home" />
          <ion-route url="/home/:searchText" component="app-home" />
          <ion-route url="/notifications" component="app-profile" />
          <ion-route url="/notes/:userId" component="app-notes" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
