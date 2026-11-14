
import {
  Component,
  signal,
  computed,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs';

import { JobService } from '../../../../core/services/job';
import { Job } from '../../../../models/job';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './job-list.html'
})
export class JobListComponent implements OnInit {

  // API states
  jobs = signal<Job[]>([]);
  loading = signal(true);
  error = signal('');

  // Search
  searchControl = new FormControl('', {
    nonNullable: true
  });

  searchTerm = signal('');

  // Filters
  selectedType = signal('all');
  selectedCategory = signal('all');
  sortBy = signal('latest');

  // Pagination
  currentPage = signal(1);
  pageSize = 12;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadJobs();

    // Read initial filters from URL
    this.route.queryParamMap.subscribe(params => {

      const search = params.get('search') ?? '';
      const page = Number(params.get('page')) || 1;

      if (this.searchControl.value !== search) {
        this.searchControl.setValue(search, {
          emitEvent: false
        });
      }

      this.searchTerm.set(search);
      this.currentPage.set(page);

    });

    // Debounced search
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {

        this.searchTerm.set(value.trim());
        this.currentPage.set(1);

        this.updateUrl();

      });

  }

  // Fetch jobs
  loadJobs(): void {

    this.loading.set(true);
    this.error.set('');

    this.jobService.getJobs().subscribe({

      next: (data) => {

        this.jobs.set(data);
        this.loading.set(false);

      },

      error: (err) => {

        console.error(err);

        this.error.set(
          'Unable to load jobs. Please try again later.'
        );

        this.loading.set(false);

      }

    });

  }

  // Get unique categories
  categories = computed(() => {

    const values = this.jobs()
      .map(job => job.category)
      .filter(Boolean);

    return [...new Set(values)].sort();

  });

  // Filter jobs
  filteredJobs = computed(() => {

    let result = [...this.jobs()];

    const search = this.searchTerm().toLowerCase();

    // Search filter
    if (search) {

      result = result.filter(job => {

        const searchableText = [
          job.title,
          job.company_name,
          job.category,
          job.candidate_required_location,
          ...(job.tags ?? [])
        ]
          .join(' ')
          .toLowerCase();

        return searchableText.includes(search);

      });

    }

    // Job type filter
    if (this.selectedType() !== 'all') {

      result = result.filter(
        job => job.job_type === this.selectedType()
      );

    }

    // Category filter
    if (this.selectedCategory() !== 'all') {

      result = result.filter(
        job => job.category === this.selectedCategory()
      );

    }

    // Sorting
    if (this.sortBy() === 'latest') {

      result.sort(
        (a, b) =>
          new Date(b.publication_date).getTime() -
          new Date(a.publication_date).getTime()
      );

    }

    if (this.sortBy() === 'title') {

      result.sort(
        (a, b) => a.title.localeCompare(b.title)
      );

    }

    return result;

  });

  // Pagination
  totalPages = computed(() => {

    return Math.ceil(
      this.filteredJobs().length / this.pageSize
    );

  });

  paginatedJobs = computed(() => {

    const start =
      (this.currentPage() - 1) * this.pageSize;

    return this.filteredJobs().slice(
      start,
      start + this.pageSize
    );

  });

  // Reset page when filters change
  resetPage(): void {

    this.currentPage.set(1);
    this.updateUrl();

  }

  // Change page
  changePage(page: number): void {

    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.currentPage.set(page);
    this.updateUrl();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

  // Update URL
  updateUrl(): void {

    this.router.navigate([], {

      relativeTo: this.route,

      queryParams: {
        search: this.searchTerm() || null,
        page: this.currentPage()
      },

      queryParamsHandling: 'merge',
      replaceUrl: true

    });

  }

  trackByJobId(index: number, job: Job): number {
    return job.id;
  }

}
