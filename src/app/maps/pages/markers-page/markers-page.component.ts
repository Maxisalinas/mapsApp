import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';


interface MarkerAndColor {
    color: string;
    marker: Marker;
}

interface PlainMarker {
    color: string;
    lngLat: number[];
}


@Component({
    selector: 'markers-page',
    templateUrl: './markers-page.component.html',
    styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy{


    public map?: Map;   
    public currentCenter = new LngLat(-74.5, 40);
    public markers: MarkerAndColor[] = []; 

    @ViewChild('map') divMapRef?: ElementRef;

    ngAfterViewInit(): void {
        this.map = new Map({
            container: this.divMapRef?.nativeElement, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: this.currentCenter, // starting position [lng, lat]
            zoom: 13 // starting zoom
        });
        
        if ( localStorage.getItem('plainMarkers')) this.readFromLocalStorage();

    }
    
    ngOnDestroy(): void {
        this.map?.off('dragend', () =>{})
    }

    addMarker( lngLat: LngLat | number[], color: string ) {
        if ( !this.map ) return;

        const marker = new Marker({ color: color, draggable: true })
            .setLngLat( lngLat as LngLat )
            .addTo( this.map );

        this.markers.push( { color, marker } );  // Añadiendo marcadores a mi array de marcadores.

        this.saveToLocalStorage(); // Lo guardamos en el LocalStorage   

        marker.on('dragend', () => {
            this.saveToLocalStorage()
        })
    }       

    createMarker() {
        if( !this.map ) return;
        
       const lngLat = this.map?.getCenter();
       const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16)); // Genera un hexadecimal de manera aleatroia

       this.addMarker( lngLat, color )
       
    }

    deleteMarker( indice: number ) {

        this.markers[indice].marker.remove()

        this.markers.splice(indice, 1 );

    }

    flyTo( marker: Marker ) {

        this.map?.flyTo( { zoom: 14, center: marker.getLngLat() } )

    }

    saveToLocalStorage() {
        const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => { 
            return { 
                lngLat: marker.getLngLat().toArray(),
                color: color, 
            } 
        });
        
        localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
    }
 
    readFromLocalStorage() {
        const markersSaves = localStorage.getItem('plainMarkers');

        const markersSavesParsed: PlainMarker[] = JSON.parse(markersSaves!);

        markersSavesParsed.forEach( ({color, lngLat} ) => {
           const [ lng, lat ] = lngLat;
           const coords = new LngLat( lng, lat )
           this.addMarker( coords, color );
        })      
    }

}
