import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api/places-api-client';
import { Feature, PlaceResponse } from '../interfaces/place.interface';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];
  
  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(
    private mapService: MapService,
    private placesApi: PlacesApiClient
  ) {
    this.getUserLocation();
  }

  getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = ''): void {

    if(query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    this.isLoadingPlaces = true;

    this.placesApi.get<PlaceResponse>(`/${query}.json`, {
      params: {
        proximity: this.useLocation!.join(',')
      }
    })
      .subscribe((resp: PlaceResponse) => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkersFromPlaces(this.places, this.useLocation!);
      });
  }

  deletePlaces(): void {
    this.places = [];
  }

}
