import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
	selector: 'my-heroes',
	templateUrl: 'app/heroes.component.html',
	styleUrls: ['app/heroes.component.css']
})
export class HeroesComponent implements OnInit{
	error: any;
	title = "Tour of Heroes";
	heroes: Hero[];
	selectedHero: Hero;
	addingHero:boolean;
	addHero(){
		this.addingHero = true;
		this.selectedHero = null;
	}

	deleteHero(hero: Hero, event: any){
		event.stopPropagation();
		this.heroService
			.delete(hero)
			.then(res =>{
				this.heroes = this.heroes.filter(h => h !== hero);
				if (this.selectedHero === hero) { this.selectedHero = null; }
			})
			.catch(error => this.error = error);
	}

	close(saveHero: Hero){
		this.addingHero = false;
		if(saveHero) { this.getHeroes(); }
	}
	onSelect(hero:Hero){ this.selectedHero=hero; }
	constructor(private heroService: HeroService, private router: Router){}
	getHeroes(){
		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	}
	ngOnInit(){
		this.getHeroes();
	}
	gotoDetail(){
		this.router.navigate(['/detail', this.selectedHero.id]);
	}
}
