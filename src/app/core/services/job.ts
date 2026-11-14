
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  of,
  throwError
} from 'rxjs';

import {
  catchError,
  map,
  shareReplay,
  tap
} from 'rxjs';
import { Job,  RemotiveResponse } from '../../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private readonly API_URL =
    'https://remotive.com/api/remote-jobs';

  private readonly CACHE_KEY = 'devflow_remotive_jobs';

  private readonly CACHE_DURATION =
    6 * 60 * 60 * 1000; // 6 hours

  private jobs$?: Observable<Job[]>;

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {

    // 1. Check in-memory cache
    if (this.jobs$) {
      return this.jobs$;
    }

    // 2. Check browser cache
    const cachedJobs = this.getCachedJobs();

    if (cachedJobs) {
      this.jobs$ = of(cachedJobs);
      return this.jobs$;
    }

    // 3. Fetch from API
    this.jobs$ = this.http
      .get<RemotiveResponse>(this.API_URL)
      .pipe(

        map(response => response.jobs ?? []),

        // 4. Save response in browser cache
        tap(jobs => {
          this.saveCachedJobs(jobs);
        }),

        // 5. Share same API response
        shareReplay(1),

        // 6. Handle errors
        catchError(error => {
          this.jobs$ = undefined;

          return throwError(() => error);
        })

      );

    return this.jobs$;
  }

  private getCachedJobs(): Job[] | null {

    try {

      const cached = localStorage.getItem(this.CACHE_KEY);

      if (!cached) return null;

      const parsed = JSON.parse(cached);

      const isExpired =
        Date.now() - parsed.timestamp > this.CACHE_DURATION;

      if (isExpired) {
        localStorage.removeItem(this.CACHE_KEY);
        return null;
      }

      return parsed.jobs;

    } catch {
      return null;
    }
  }

  private saveCachedJobs(jobs: Job[]): void {

    try {

      localStorage.setItem(
        this.CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          jobs
        })
      );

    } catch (error) {
      console.error('Unable to save jobs cache:', error);
    }
  }

  getJobById(id: number): Observable<Job | undefined> {

    return this.getJobs().pipe(
      map(jobs => jobs.find(job => job.id === id))
    );
  }

}
