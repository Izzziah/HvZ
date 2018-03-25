import { Component, Injectable,Input,Output,EventEmitter } from '@angular/core';

@Injectable()
export class SharedService {
  @Output() fire: EventEmitter<any> = new EventEmitter();

   constructor() { }

   change() {
    console.log('emit'); 
     this.fire.emit(true);
   }

   getEmittedValue() {
     return this.fire;
   }

} 