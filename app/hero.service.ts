import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero } from './hero';

@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes';
    private handleError(error: any){
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    getHeroes(){
        return this.http.get(this.heroesUrl)
                    .toPromise()
                    .then(response => response.json().data as Hero[])
                    .catch(this.handleError);
    }
    getHero(id: number){
        return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
    }
    constructor(private http: Http) { }

}