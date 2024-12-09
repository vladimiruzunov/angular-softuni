import { Component } from '@angular/core';
import { Car } from '../model/Car';
import { CarService } from '../services/car.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-cars',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './manage-cars.component.html',
  styleUrls: ['./manage-cars.component.css'],
})
export class ManageCarsComponent {
  cars: Car[] = [];
  newCar: Partial<Car> = {};
  editMode: boolean = false;
  carToEdit: Partial<Car> = {};
  selectedTab: string = 'add'; // Tracks the active tab

  constructor(private carService: CarService) {
    this.fetchCars();
  }

  fetchCars(): void {
    this.carService.getAll().subscribe({
      next: (data) => (this.cars = data),
      error: (err) => console.error('Error fetching cars:', err),
    });
  }

  addCar(): void {
    if (this.newCar.brand && this.newCar.model) {
      this.carService.create(this.newCar as Car).subscribe({
        next: () => {
          this.fetchCars();
          this.newCar = {}; // Clear the form
        },
        error: (err) => console.error('Error adding car:', err),
      });
    }
  }

  removeCar(carId: number): void {
    this.carService.delete(carId).subscribe({
      next: () => this.fetchCars(),
      error: (err) => console.error('Error removing car:', err),
    });
  }

  startEdit(car: Car): void {
    this.editMode = true;
    this.selectedTab = 'edit'; // Switch to edit tab
    this.carToEdit = { ...car }; // Create a copy of the car for editing
  }

  saveEdit(): void {
    if (this.carToEdit.id) {
      this.carService.update(this.carToEdit as Car).subscribe({
        next: () => {
          this.fetchCars();
          this.cancelEdit();

          Swal.fire({
            title: 'Changes Saved!',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
          });
        },
        error: (err) => {
          console.error('Error updating car:', err);

          Swal.fire({
            title: 'Error',
            text: 'Failed to save changes. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
    } else {
      console.error('Error: Missing car ID for update.');
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.carToEdit = {};
    this.selectedTab = 'add'; // Switch back to add tab
  }

  switchTab(tab: string): void {
    this.selectedTab = tab;
  }
}
