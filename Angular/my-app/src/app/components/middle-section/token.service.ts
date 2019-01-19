import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
 
@Injectable({ providedIn: 'root' })
export class TokenService {
    private token = new Subject<any>();
 
    setToken(strtoken: string) {
        localStorage.setItem('token', strtoken);
        this.token.next(strtoken);
    }

    getToken(): Observable<any> {
        return this.token.asObservable();
    }

}