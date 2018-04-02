import { Component, Injectable,Input,Output,EventEmitter } from '@angular/core';

@Injectable()
export class SharedService {
  @Output() fire: EventEmitter<any> = new EventEmitter();

   change() {
    console.log('emit'); 
     this.fire.emit(true);
   }

   getEmittedValue() {
     return this.fire;
   }

} 