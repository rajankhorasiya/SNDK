import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  /**
   * 
   * @returns This will check if users has rights for managing/view task details or not.
   */

  canActivate(): Observable<boolean> {
    return new Observable(observable => {
      if (localStorage.getItem("LOGGEDIN_USER")) {
        observable.next(true);
        observable.complete();
      } else {
        this.router.navigate(['']);
        observable.next(false);
        observable.complete();
      }

    })
  }
}
