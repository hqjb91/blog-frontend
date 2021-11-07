import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

    /**
     * This method logs in a user
     * @param username
     * @param password
     * @returns Observable login response
     */
    login(username: string, password: string): Observable<{success: boolean, result: any}> {
        const user = {username, password};
        return this.http.post<{success: boolean, result: any}>(`/api/user/login`, user);
    }

    constructor(private http: HttpClient) {}
} 