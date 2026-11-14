import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { JobListComponent } from './features/jobs/pages/job-list/job-list';
import { JobDetailsComponent } from './features/jobs/pages/job-details/job-details';

export const routes: Routes = [
  { path: '', component: Landing },
  {path: "jobs", component: JobListComponent },
  {path: "jobs/:id", component: JobDetailsComponent },
  {path: '**', redirectTo: '' }
];
