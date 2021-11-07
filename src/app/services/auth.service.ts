import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as moment from "moment";

@Injectable({providedIn: 'root'})
export class AuthService {

    /**
     * This method logs in a user
     * @param username
     * @param password
     * @returns Observable login response
     */
    login(username: string, password: string): Observable<{success: boolean, token: string, expiresIn: string}> {
        const user = {username, password};
        return this.http.post<{success: boolean, token: string, expiresIn: string}>(`/api/user/login`, user);
    }

    setLocalStorage(response: {success: boolean, token: string, expiresIn: string}): void {
        const expiresAt = moment().add(response.expiresIn);
        localStorage.setItem('id_token', response.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          
    
    logout(): void {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }
    
    public isLoggedIn(): boolean {
        return moment().isBefore(this.getExpiration());
    }
    
    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }
    
    getExpiration() {
        const expiration: any = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    constructor(private http: HttpClient) {}
} 