import { query, style, transition, trigger ,group, animate } from '@angular/animations';
import { Component } from '@angular/core';
import {Event, Router , NavigationStart ,NavigationEnd, RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})
export class AppComponent {
  title = 'MyStore';
  showLoadingIndicator= true ;
  constructor(private _router: Router){
    this._router.events.subscribe((routerEvent:Event)=>{
      if(routerEvent instanceof NavigationStart){
        this.showLoadingIndicator =true;
        }
      
        if(routerEvent instanceof NavigationEnd){
          this.showLoadingIndicator =false; 
          }  
    })
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
