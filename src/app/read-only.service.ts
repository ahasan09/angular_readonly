import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class ReadOnlyService {	
	readOnlyEvent: EventEmitter<any> = new EventEmitter<any>();

}