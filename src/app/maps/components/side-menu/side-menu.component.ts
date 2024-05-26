import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  route: string;
  
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styles: `li { cursor: pointer; transition: 0.3s all;} `
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [

    { name: 'Pantalla Completa',  route: '/maps/fullscreen'},
    { name: 'Marcadores',  route: '/maps/markers'},
    { name: 'Propiedades',  route: '/maps/properties'},
    { name: 'Zoom',  route: '/maps/zoom'},

  ];

}
