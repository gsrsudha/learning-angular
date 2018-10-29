import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let id = +next.url[1].path; //to get the value from products/10 url path
      // '+' here converts the url path to number
      if(isNaN(id) || id < 1) {
        alert("Invalid product Id"); // Typically we would route to the error page
        this.router.navigate(['/products']);
        return false;
      }
    return true;
  }
}
