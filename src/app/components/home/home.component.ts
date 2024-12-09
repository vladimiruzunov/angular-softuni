import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Car} from '../../models/Car';
import {CarService} from '../../services/car.service';
import {CommonModule} from '@angular/common';
import {TestimonialService} from '../../services/testimonial.service';
import {Testimonial} from '../../models/Testimonial';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  featuredCars: Car[] = [];
  testimonials: Testimonial[] = [];

  constructor(private carService: CarService, private testimonialService: TestimonialService, private router: Router) {
  }

  ngOnInit(): void {
    this.carService.getAll().subscribe((cars) => {
      this.featuredCars = cars;
    });
    this.testimonialService.getTestimonials().subscribe((testimonials) => {
      this.testimonials = testimonials;
    })
  }

  scrollToCars(): void {
    const carSection = document.querySelector('.featured-cars');
    if (carSection) {
      carSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  rentCar(car: Car): void {
    this.router.navigate(['/car-details', car.id]);
  }

}
