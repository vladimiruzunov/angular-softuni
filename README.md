# Rent a car Angular Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

Project which handles some basic functionality which a normal rent a car website would have.

Home page with list of the available cars for renting, coming from service, which is taking the information from the json-server and testimonials part which currently is read-only.
![img.png](readme-pictures/home1.png)
![img.png](readme-pictures/home2.png)

Contact page got a contact form, that got validations as well.
![img.png](readme-pictures/contact.png)

About page with some general information.
![img.png](readme-pictures/about.png)

Cars page, which is the "main" one for the application. You are able to see all the available cars and perform searches on parameters like brand, model, mileage, year and fuel type. When you find the suitable vehicle for you, you can click on it to view more details.
![img.png](readme-pictures/cars.png)

Car  Detail page is a page, where you can see everything for a car, accompanied by a picture. You've got "Rent now" button, which will be clickable, only if you are logged-in user.
![img.png](readme-pictures/details.png)

Rent page is the final page for your car rent. In it, you are able to enter the wanted days for rent, again with validations for a starting date, starting from today and end date, later than the start one.
![img.png](readme-pictures/rent.png)

You will receive some fancy notification if successful booking is done. For it, its used sweetalert2 library.
![img.png](readme-pictures/notification.png)

Manage cars page, which is for admin only. It gives the chance to remove, edit, add cars. When editing or adding new, you've got picture preview, which can handle links for images and can handle, mostly used image formats.
![img.png](readme-pictures/manageAdd.png)

Edit or remove.
![img.png](readme-pictures/manageEditRemove.png)

The edit sends you to another part, which you can change each specification of a car.
![img.png](readme-pictures/manageEdit.png)

Login page, using JWT token for authentication. Token is deleted after logout or an hour inactivity as well. After successful login, automatically redirects you to the Home page.
![img.png](readme-pictures/login.png)

Register page with all the validations for email, password, already in use email and username. Automatic login after successful register.
![img.png](readme-pictures/register.png)

Error page with return to Home button, if you navigate to a non-existing path.
![img.png](readme-pictures/error.png)


Credentials for admin account:
username: _admin_
password: _admin123_

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Backend server

For a backend, json-server its used, to run it and get all the features for the app, navigate to "assets" folder and run `node server.js`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
