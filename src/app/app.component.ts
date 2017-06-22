import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="header">
      <h1>echosight</h1>
    </div>
    <div class="row">
      <!-- 
      <div class="large-4 medium-6 columns" style="background-color: pink">
        <slides></slides>
      </div>
      -->
      <div class="large-12 medium-12 columns" style="background-color: black">
        <editor></editor>
      </div>
    </div>
  `,
  styles: [`
    .header {
      height: 20hv;
    }
  `]
})
export class AppComponent { 
  name = 'Hello'; 
}
