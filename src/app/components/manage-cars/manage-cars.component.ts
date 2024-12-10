import {Component} from '@angular/core';
import {Car} from '../../models/Car';
import {CarService} from '../../services/car.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
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
  selectedTab: string = 'add';

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
    if (!this.newCar.brand || !this.newCar.model) {
      Swal.fire({
        title: 'Error!',
        text: 'Please provide the car brand and model.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!this.isValidImageUrl(this.newCar.img || '')) {
      Swal.fire({
        title: 'Invalid Image URL!',
        text: 'Please provide a valid image URL. It must end with .jpg, .png, .webp, etc., or be a valid Google link.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    this.carService.create(this.newCar as Car).subscribe({
      next: () => {
        this.fetchCars();
        this.newCar = {};

        Swal.fire({
          title: 'Success!',
          text: 'Car added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add the car. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        console.error('Error adding car:', err);
      },
    });
  }

  isValidImageUrl(url: string): boolean {
    return /\.(jpeg|jpg|gif|png|webp|avif)$/.test(url) || /googleusercontent\.com/.test(url);
  }

  removeCar(carId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to remove this car? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carService.delete(carId).subscribe({
          next: () => {
            this.fetchCars();
            Swal.fire({
              title: 'Deleted!',
              text: 'The car has been removed successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to remove the car. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            console.error('Error removing car:', err);
          },
        });
      }
    });
  }

  startEdit(car: Car): void {
    this.editMode = true;
    this.selectedTab = 'edit';
    this.carToEdit = { ...car };
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
    this.selectedTab = 'add';
  }

  switchTab(tab: string): void {
    this.selectedTab = tab;
  }
}
