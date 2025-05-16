// src/app/services/operation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OperationDto} from '../models/dtos';


@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private baseUrl = 'http://localhost:8080/api/operations';

  constructor(private http: HttpClient) {}

  versement(compteCode: string, montant: number): Observable<OperationDto> {
    const params = new HttpParams()
      .set('compteCode', compteCode)
      .set('montant', montant.toString());
    return this.http.post<OperationDto>(`${this.baseUrl}/versement`, null, { params });
  }

  retrait(compteCode: string, montant: number): Observable<OperationDto> {
    const params = new HttpParams()
      .set('compteCode', compteCode)
      .set('montant', montant.toString());
    return this.http.post<OperationDto>(`${this.baseUrl}/retrait`, null, { params });
  }

  virement(compteSource: string, compteDestination: string, montant: number): Observable<void> {
    const params = new HttpParams()
      .set('compteSource', compteSource)
      .set('compteDestination', compteDestination)
      .set('montant', montant.toString());
    return this.http.post<void>(`${this.baseUrl}/virement`, null, { params });
  }

  getHistorique(compteCode: string): Observable<OperationDto[]> {
    return this.http.get<OperationDto[]>(`${this.baseUrl}/historique/${compteCode}`);
  }
}
