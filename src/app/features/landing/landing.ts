
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

  searchTerm = signal('');
  location = signal('');

  constructor(private router: Router) {}

  searchJobs() {
    this.router.navigate(['/jobs'], {
      queryParams: {
        search: this.searchTerm() || null,
        location: this.location() || null,
        page: 1
      }
    });
  }

  featuredJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechNova',
      location: 'Remote',
      type: 'Full Time',
      salary: '$60k - $90k',
      logo: 'T',
      color: '#e0e7ff',
      tag: 'React'
    },
    {
      id: 2,
      title: 'Angular Developer',
      company: 'CodeCraft',
      location: 'India',
      type: 'Full Time',
      salary: '₹5L - ₹8L',
      logo: 'C',
      color: '#fee2e2',
      tag: 'Angular'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'DevSphere',
      location: 'Remote',
      type: 'Contract',
      salary: '$40k - $70k',
      logo: 'D',
      color: '#dcfce7',
      tag: 'Node.js'
    }
  ];

  categories = [
    { name: 'Frontend Developer', count: '120+' },
    { name: 'Backend Developer', count: '90+' },
    { name: 'Full Stack Developer', count: '150+' },
    { name: 'Software Engineer', count: '200+' },
    { name: 'DevOps Engineer', count: '60+' },
    { name: 'UI/UX Designer', count: '45+' }
  ];
}
