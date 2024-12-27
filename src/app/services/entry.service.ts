import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private apiUrl = 'https://backend-vvlk.onrender.com/api/entries';

  constructor(private http: HttpClient) {}

  addEntry(entry: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, entry);
  }

  getEntriesByDate(date: string, pageSize: number, currentPage: number): Observable<{ totalEntries: number; entries: any[] }> {
    const url = `${this.apiUrl}/${date}?limit=${pageSize}&skip=${currentPage * pageSize}`;
    return this.http.get<{ totalEntries: number; entries: any[] }>(url);
  }


  getAllEntries(limit: number = 10, skip: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString());

    return this.http.get<any>(`${this.apiUrl}/all`, { params });
  }
}
