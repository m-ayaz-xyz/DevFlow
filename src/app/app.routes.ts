import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { JobListComponent } from './features/jobs/pages/job-list/job-list';
import { JobDetailsComponent } from './features/jobs/pages/job-details/job-details';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Privacy } from './pages/privacy/privacy';

export const routes: Routes = [
  { path: '', component: Landing },
  {path: "jobs", component: JobListComponent },
  {path: "jobs/:id", component: JobDetailsComponent },
  {path: "about", component: About },
  {path: "contact", component: Contact },
  {path: "privacy", component: Privacy },
  {path: '**', redirectTo: '' }
];
