import { Injectable } from '@angular/core';
import { Observable,of  } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';
@Injectable()
export class MapService {
    private geoCoder;
    private locationCache: any = {};

    constructor(private camelizePipe: CamelizePipe){}

    private camilize(value: string): string{
        return this.camelizePipe.transform(value);
    }

    private cacheLocation(location:string, coordiantes: any){
        this.locationCache[this.camilize(location)] = coordiantes;
    }

    private isLocationCached(location): boolean{
        return this.locationCache[this.camilize(location)];
    }

    private geoCodeLocaton(location: string):Observable<any>{
        if(!this.geoCoder) {
            this.geoCoder = new (<any>window).google.maps.Geocoder();
        }
        return new Observable((observer) => {
            this.geoCoder.geocode({address: location}, (result, status) => {
                if (status === 'OK'){
                    const geometry = result[0].geometry.location;
                    const coordinates = {lat: geometry.lat(), lng: geometry.lng()}

                    this.cacheLocation(location, coordinates);
                    observer.next(coordinates);
                } else {
                    observer.error('Location cound not be geocoded');
                }
            });
        });
    }
    public getGeoLocation(location: string): Observable <any> {

        if(this.isLocationCached(location)){
            return Observable.of(this.locationCache(this.camilize(location)));
        } else {
            return this.geoCodeLocaton(location);
        }
    }
}