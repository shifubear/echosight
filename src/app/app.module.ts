import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { SlidesComponent } from './components/slides.component';
import { EditorComponent } from './components/editor.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule 
  ],
  declarations: [ 
    AppComponent, 
    SlidesComponent,
    EditorComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
