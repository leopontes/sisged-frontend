import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EscolaComponent } from './escola/escola.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { FilterEscolaPipe } from "./filter.escola.pipe";
import { TurmaComponent } from './turma/turma.component';
import { FilterturmapipePipe } from './filterturmapipe.pipe';

const appRoutes: Routes = [
  { path: 'escola', component: EscolaComponent},
  { path: 'turma', component: TurmaComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EscolaComponent,
    HeaderComponent,
    FilterEscolaPipe,
    TurmaComponent,
    FilterturmapipePipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing:true}
    ),
    BrowserModule,  
    FormsModule,  
    ReactiveFormsModule,  
    //HttpClientModule,  
    //HttpClient,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [ HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
