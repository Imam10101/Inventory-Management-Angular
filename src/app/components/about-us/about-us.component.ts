import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FooterComponent,RouterLink],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})

export class AboutUsComponent {

}
