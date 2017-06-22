import { Component } from '@angular/core';

@Component({
  selector: 'slides',
  template: `
    <div class="display-box">
        <ul>
            <li *ngFor="let slide of slides; let i = index;">
                <img *ngIf="selectedIndex === i" src={{slide.imageUrl}} width="400 px" (click)="selectSlide(i)">
                <img *ngIf="selectedIndex !== i" src={{slide.imageUrl}} width="200 px" (click)="selectSlide(i)">
            </li>
        </ul>
    </div>
  `,
  styles: [`
    ul {
        list-style-type: none;
    }

    .display-box {
        overflow-y: scroll;
        position: relative;
        height: 80vh;
    }
  `]
})
export class SlidesComponent { 
    slides: Slide[];

    selectedIndex: number;

    constructor() {
        this.slides = [];
        this.selectedIndex = 0;

        for (var i = 0; i < 6; i++) {
            var newSlide = new Slide("/assets/images/sample_ppt-" + (i + 1) + ".jpg", i);
            this.slides.push(newSlide);
        }
    }

    selectSlide(i: number) {
        this.selectedIndex = i;
    }
}

class Slide {
    imageUrl: string;
    index: number;

    constructor( url: string, i: number ) {
        this.imageUrl = url;
        this.index = i;
    }
}