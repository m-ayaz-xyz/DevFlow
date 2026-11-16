# DevFlow – Developer Job Platform

DevFlow is a job discovery platform built with Angular that helps developers find remote job opportunities in one place. Users can explore jobs, search by keywords, apply filters, sort listings, and view detailed job information.

The main focus of this project is to build a practical Angular application while following clean architecture, reusable components, and frontend performance best practices.

## Tech Stack

- Angular
- TypeScript
- Tailwind CSS v4
- RxJS
- Angular Signals
- Angular Router
- Remotive API
- LocalStorage

## Features

### 1. Landing Page

- Clean and responsive landing page.
- Search jobs directly from the hero section.
- Featured jobs and popular categories.
- Platform overview and statistics.
- Responsive navigation and footer.
- Navigation to job listings with search parameters.

### 2. Job Listings

- Fetch remote job listings using the Remotive API.
- Search by job title, company, and skills.
- Filter jobs by category, job type, and location.
- Sort jobs based on available options.
- Client-side pagination.
- Search and filters synchronized with URL query parameters.
- Debounced search to avoid unnecessary processing.
- Loading, error, and empty states.

### 3. Job Details

- Dynamic job details pages.
- Display company information and job descriptions.
- Show job categories, location, and other relevant information.
- Similar jobs based on category.
- Direct application link to the original job posting.
- Safely render job descriptions containing HTML.

### 4. API Integration & Caching

- Centralized JobService for API communication.
- TypeScript interfaces for structured API responses.
- In-memory caching.
- LocalStorage caching with a 6-hour expiration.
- RxJS `shareReplay(1)` to reuse API responses.
- Error handling for failed API requests.

## Frontend Engineering Practices

While building DevFlow, I focused on implementing frontend concepts that are useful in real-world applications.

| Concept | Implementation |
|---|---|
| Lazy Loading | Lazy-loaded routes |
| State Management | Angular Signals |
| Reactive Programming | RxJS |
| API Communication | Angular HttpClient |
| Search Optimization | Debounced search |
| Caching | LocalStorage and in-memory caching |
| URL State Management | Query parameters |
| Pagination | Client-side pagination |
| Reusability | Shared services and components |
| Performance | Modern Angular control flow |
| Responsive Design | Tailwind CSS |

## API

DevFlow uses the Remotive public API to fetch remote job listings.

**Endpoint:**

https://remotive.com/api/remote-jobs

**Documentation:** https://remotive.com/api-documentation

Job information includes titles, company names, descriptions, categories, locations, publication dates, and application links.

##Project Status

The initial development of DevFlow is complete, covering the landing page, job discovery, API integration, search, filtering, pagination, and job details.

The application is built with a focus on maintainability, performance, and a responsive user experience.

###Built with Angular and TypeScript, By Ayaz

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>

2. Navigate to the project

cd devflow

3. Install dependencies

npm install

4. Start the development server

ng serve

5. Open the application

http://localhost:4200
