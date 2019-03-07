import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ArticleEditComponent } from './views/article-edit/article-edit.component';
import { ArticlesComponent } from './views/articles/articles.component';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './views/error/error.component';

const routes: Routes = [
  // Default to index
  { path: '', redirectTo: 'articles', pathMatch: 'full'},

  { path: 'articles', component: ArticlesComponent },
  { path: 'article-edit/:mode/:id', component: ArticleEditComponent },

  // Handle all other routes
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticleEditComponent,
    ArticlesComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
