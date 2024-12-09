import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  missionStatement = "Our mission is to provide affordable, high-quality car rentals for every occasion.";
  visionStatement = "We strive to be the most trusted and innovative car rental service provider globally.";
  values = ["Customer Satisfaction", "Transparency", "Innovation", "Sustainability"];

}
