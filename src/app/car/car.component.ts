import {Component, OnInit} from '@angular/core';
import {Car} from '../model/Car';
import {CarService} from '../services/car.service';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService, private router : Router) {
  }

  ngOnInit(): void {
    this.carService.getAll().subscribe((items) => {
      this.cars = items;
    });
  }

  viewDetails(id : number) {
    this.router.navigate(['/car-details', id]);
  }
}
