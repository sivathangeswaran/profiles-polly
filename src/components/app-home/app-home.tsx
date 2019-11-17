import { Component, h, State,Event, EventEmitter, Prop} from '@stencil/core';
import { TabHome } from '../tab-home/tab-home';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  @State() value: string;
  @State() showData: boolean;
  @State() usersData : any;
  @State() user_id = 10046;
  @State() currentUser :any;
  @State() searchQuery :string;


  @Prop() searchText:string;

  handleChange(event) {
    this.searchQuery = event.target.value;
    this.getUsersData(this.searchQuery);
  }
  showSelectedUserCard(selecteduser) {
    console.log("showSelectedUserCard called");
    this.getUsersData(selecteduser.first_name);
  }

  prepareNotes(selecteduser) {
    console.log("prepareNotes called");
  }

  followSelectedUser(selecteduser) {
    console.log('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nasdaq-polly-lqprf/service/profiles-service/incoming_webhook/follow?action=follow&user='+this.user_id+'&follow='+selecteduser.emp_id.$numberInt);
    console.log("followSelectedUser called");
    fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nasdaq-polly-lqprf/service/profiles-service/incoming_webhook/follow?action=follow&user='+this.user_id+'&follow='+selecteduser.emp_id.$numberInt)
    .then((response: Response) => response.json())
    .then(response => {
      console.log("followSelectedUser response captured");
      console.log(response);
      var index = 0;
      this.usersData.forEach(user => {
        if(user==selecteduser){
          this.usersData[index].isFollowing = true;
        }
        index++;
      });

    });


  }

  getUsersData(searchText) {
console.log("printing serachtext before api call");
  fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nasdaq-polly-lqprf/service/profiles-service/incoming_webhook/get-profiles?user=10046&arg='+searchText)
  .then((response: Response) => response.json())
  .then(response => {
    this.usersData = response.result;
    this.currentUser = response.user[0];

    this.getFollowingStatus();

  });
  }

  getFollowingStatus() {
    console.log("getFollowingStatus called");
    var index = 0;
    var followings = this.currentUser.followers;
    console.log("current user in getFollowingStatus"+ this.currentUser);
    this.usersData.forEach(user => {
      if(user.picture){
        this.usersData[index].imgUrl = "assets/icon/"+user.first_name.toLowerCase()+".jpg";
      }else{
        this.usersData[index].imgUrl = "assets/icon/avatar.jpeg";
      }
      
      followings.forEach(following => {
        this.usersData[index].followText = "Follow";
        if(user.emp_id==following.emp_id){
          this.usersData[index].followText = "Following";

        }
      });
      index++;
    });
    this.showData = true;
 
  }

  componentWillLoad() {
    if(!this.searchText){
      this.searchText= "";
    }
    this.searchQuery = this.searchText;

    console.log("printing serachtext before api call componentWillLoad"+this.searchText);
    this.getUsersData(this.searchQuery);
  }


  render() {
    if(this.showData){
      return (

        <div class="full-height">
                <ion-item>
                <ion-label></ion-label>                
                </ion-item>
              <ion-toolbar color="primary">
              
                <ion-buttons slot="primary">
                
                  <ion-button on-click={() => { location.href='/notifications' }}>
                    <ion-icon slot="icon-only" name="notifications" size="small" />
                  </ion-button>
                  <ion-button>
                    <ion-icon slot="icon-only" name="star" size="small" />
                  </ion-button>
                  <ion-button>
                    <ion-icon slot="icon-only" name="settings" size="small" />
                  </ion-button>
                </ion-buttons>
                <ion-title>Nasdaq Polly</ion-title>
                <ion-button on-click={() => { location.href='/' }}>
                    <ion-icon slot="icon-only" name="home" size="small" />
                  </ion-button>
              </ion-toolbar>  
              
              <ion-searchbar on-change={(event) => { this.handleChange(event);}} on-input={(event) => { this.handleChange(event);}} value={this.searchQuery}></ion-searchbar>
              <ion-list> 
        
                {this.usersData.map(user =>
                <div>
                  
                  <ion-item>
                  
                <ion-avatar slot="start">
                  <img src={user.imgUrl} />
                </ion-avatar>
                
                <ion-label on-click={() => { this.showSelectedUserCard(user); }}>{user.first_name} {user.last_name}</ion-label>
                
              </ion-item>
                <ion-card hidden={!(user==this.usersData[0])}>
                <ion-card-header>
                  <ion-card-subtitle>{user.first_name} {user.last_name}</ion-card-subtitle>
                  <ion-card-title>{user.designation}</ion-card-title>
                  
                </ion-card-header>
      
                <ion-card-content>
                  Keep close to Nature's heart... and break clear away, once in awhile,
                  and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </ion-card-content>
                <ion-item>
                  <ion-icon name="pin" slot="start" />
                <ion-label>Checkedin at {user.city}</ion-label>                
                </ion-item>
                <ion-item>
                  <ion-icon name="alarm" slot="start" />
                <ion-label>{user.last_checkin}</ion-label>                
                </ion-item>
                <ion-item>
                <ion-button color="secondary" size="small" on-click={() => { this.followSelectedUser(user); }}>{user.followText}</ion-button>
                <ion-button color="secondary" size="small" on-click={() => { location.href='/notes/'+user.emp_id.$numberInt }}>Notes</ion-button>
                </ion-item>


              </ion-card>
              
              
             </div>
                
                              )}


                
              </ion-list>    
            </div>      
            );
    }else{
      return;
    }
    
  }
}

                {/* <ion-card>
                  <ion-item>
                    <ion-icon name="pin" slot="start" />
                    <ion-label>ion-item in a card, icon left, button right</ion-label>
                    <ion-button fill="outline" slot="end">View</ion-button>
                  </ion-item>
        
                  <ion-card-content>
                    This is content, without any paragraph or header tags,
                    within an ion-cardContent element.
            </ion-card-content>
                </ion-card>
        
                <ion-card>
                  <ion-item href="#" class="activated">
                    <ion-icon name="wifi" slot="start" />
                    <ion-label>Card Link Item 1 .activated</ion-label>
                  </ion-item>
        
                  <ion-item href="#">
                    <ion-icon name="wine" slot="start" />
                    <ion-label>Card Link Item 2</ion-label>
                  </ion-item>
        
                  <ion-item class="activated">
                    <ion-icon name="warning" slot="start" />
                    <ion-label>Card Button Item 1 .activated</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon name="walk" slot="start" />
                    <ion-label>Card Button Item 2</ion-label>
                  </ion-item>
                </ion-card> */}