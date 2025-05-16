// src/app/services/compte.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CompteCourantDto, CompteDto, CompteEpargneDto} from '../models/dtos';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private baseUrl = 'http://localhost:8080/api/comptes';

  constructor(private http: HttpClient) {}

  createCompteCourant(dto: CompteCourantDto): Observable<CompteCourantDto> {
    return this.http.post<CompteCourantDto>(`${this.baseUrl}/courant`, dto);
  }

  createCompteEpargne(dto: CompteEpargneDto): Observable<CompteEpargneDto> {
    return this.http.post<CompteEpargneDto>(`${this.baseUrl}/epargne`, dto);
  }

  getCompteByCode(code: string): Observable<CompteDto> {
    return this.http.get<CompteDto>(`${this.baseUrl}/${code}`);
  }

  getComptesByClient(clientId: number): Observable<CompteDto[]> {
    return this.http.get<CompteDto[]>(`${this.baseUrl}/client/${clientId}`);
  }

  getAllComptes(): Observable<CompteDto[]> {
    return this.http.get<CompteDto[]>(this.baseUrl);
  }

  deleteCompte(code: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${code}`);
  }

  changeCompteStatus(code: string, status: string): Observable<CompteDto> {
    return this.http.post<CompteDto>(`${this.baseUrl}/status`, null, {
      params: { code, status }
    });
  }

}
