
import { Component, signal, computed, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobService } from '../../../../core/services/job';
import { Job } from '../../../../models/job';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-details.html'
})
export class JobDetailsComponent implements OnInit {

  job = signal<Job | null>(null);

  jobs = signal<Job[]>([]);

  loading = signal(true);

  error = signal('');

  similarJobs = computed(() => {

    const currentJob = this.job();

    if (!currentJob) return [];

    return this.jobs()
      .filter(item =>
        item.category === currentJob.category &&
        item.id !== currentJob.id
      )
      .slice(0, 4);

  });

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!Number.isInteger(id) || id <= 0) {
      this.error.set('Invalid job ID.');
      this.loading.set(false);
      return;
    }

    this.jobService.getJobs().subscribe({

      next: (data) => {

        this.jobs.set(data);

        const selectedJob = data.find(
          item => item.id === id
        );

        if (!selectedJob) {

          this.error.set('Job not found or no longer available.');

        } else {

          this.job.set(selectedJob);

        }

        this.loading.set(false);

      },

      error: () => {

        this.error.set('Unable to load job details.');
        this.loading.set(false);

      }

    });

  }

}
