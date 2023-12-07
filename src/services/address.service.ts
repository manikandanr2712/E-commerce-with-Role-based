// address.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { AddressModel } from 'src/app/Models/address.model';
export interface City {
	id: number;
	name: string;
	state_id: number;
	state_code: string;
	state_name: string;
	country_id: number;
	country_code: string;
	country_name: string;
	latitude: string;
	longitude: string;
	wikiDataId: string;
}
export interface Timezone {
	zoneName: string;
	gmtOffset: number;
	gmtOffsetName: string;
	abbreviation: string;
	tzName: string;
}

export interface Translation {
	kr: string;
	"pt-BR": string;
	pt: string;
	nl: string;
	hr: string;
	fa: string;
	de: string;
	es: string;
	fr: string;
	ja: string;
	it: string;
	cn: string;
	tr: string;
}

export interface Country {
	id: number;
	name: string;
	iso3: string;
	iso2: string;
	numeric_code: string;
	phone_code: string;
	capital: string;
	currency: string;
	currency_name: string;
	currency_symbol: string;
	tld: string;
	native: string;
	region: string;
	subregion: string;
	timezones: Timezone[];
	translations: Translation;
	latitude: string;
	longitude: string;
	emoji: string;
	emojiU: string;
}
export interface State {
	id: number;
	name: string;
	country_id: number;
	country_code: string;
	country_name: string;
	state_code: string;
	type: string;
	latitude: string;
	longitude: string;
}

@Injectable({
  providedIn: 'root',
})
export class AddressService {
	apiUrl = 'https://localhost:7257/api';
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
		//You can call your custom apis here
		//I am using static data for demo
		return this.http.get<Country[]>("./assets/Json/countries.json");
	}

	// Method to get states by country name
	getStatesByCountry(country: Country): Observable<State[]> {
		//You can call your custom apis here
		//I am using static data for demo
		return this.http.get<State[]>("./assets/Json/states.json").pipe(
			map((states) =>{
				console.log(states)
				//Filtering due to passed static data
				return states.filter((state) => state.country_id === country.id)
			}
			)
		);
	}

	// Method to get cities by state name
	getCitiesByState(state: State): Observable<City[]> {
    console.log("state",state)
		//You can call your custom apis here
		return this.http
			.get<City[]>("./assets/Json/cities.json")
			.pipe(
				map((cities) =>
					//Filtering due to passed static data
					cities.filter((city) => city.state_id === state.id)
				)
			);
	}

	getStatesByCountryId(countryId: number): Observable<State[]> {
		return this.http.get<State[]>(`./assets/Json/states.json`).pipe(
		  map((states) => states.filter((state) => state.country_id === countryId))
		);
	  }
	  
	  getCitiesByStateId(stateId: number): Observable<City[]> {
		return this.http.get<City[]>(`./assets/Json/cities.json`).pipe(
		  map((cities) => cities.filter((city) => city.state_id === stateId))
		);
	  }

	  saveAddress(addressDetail: any) {
		const apiUrl = `${this.apiUrl}/ShippingAddress/PostShippingAddress	`;
		return this.http.post(apiUrl, addressDetail);
	  }

	  getAddress(userId: string)  {
		const apiUrl = `${this.apiUrl}/ShippingAddress/GetShippingAddressByUserId/${userId}`;
		return this.http.get(apiUrl);
	  }
}