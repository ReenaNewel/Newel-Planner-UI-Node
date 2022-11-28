import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
constructor (){}

logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('menuItems');
    localStorage.removeItem('Type');
    localStorage.removeItem('TypeId');
    localStorage.removeItem('Clone');
    localStorage.removeItem('GroupId');
}
}