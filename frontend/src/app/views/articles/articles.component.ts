import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent implements OnInit {

  @ViewChild('menuDrop') menuPanel: ElementRef;
  @ViewChild('menuButton') menuButton: ElementRef;

  articles = [];
  currentArticle;

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {
    this.loadData();
  }

  @HostListener('document:click', ['$event'])
  documentClick(evt) {
    if (this.menuPanel) {
      if (this.menuButton && this.menuButton.nativeElement.contains(event.target)) {
        return;
      }
      this.currentArticle.showMenu = false;
    }
  }

  loadData() {
    this.http.Get('articles').subscribe((data: any) => {
      console.log(data);
      this.articles = data;
      this.articles.map(a => {
        a.isSelect = false;
        a.text = JSON.parse(a.text);
        return a;
      });
    });
  }

  show(article) {
    this.currentArticle = article;
    this.currentArticle.showMenu = true;
  }

  view(article) {
    this.router.navigate([`/article-edit/view/${article.article_id}`]);
  }

  edit(article) {
    this.router.navigate([`/article-edit/update/${article.article_id}`]);
  }

  remove(article) {
    this.http.Delete(`articles/${article.article_id}`).subscribe((data) => {
      this.loadData();
    }, (err) => {
      this.loadData();
    });
  }

  add() {
    this.router.navigate([`/article-edit/create/0`]);
  }
}
