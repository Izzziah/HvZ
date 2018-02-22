import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class NavService {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  navTo(location: string)
  {
    this.router.navigate([location]);
  }

}
