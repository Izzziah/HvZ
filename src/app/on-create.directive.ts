import { Directive, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[OnCreate]'
})
export class OnCreateDirective implements OnInit {
  @Output() onCreate:EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.onCreate.emit('dummy');
  }

}
