import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.sass']
})
export class ArticleEditComponent implements OnInit {

  article_id: string = null;
  mode = 'create';
  text: any = {};

  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.mode = this.route.snapshot.paramMap.get('mode');

    if (this.mode === 'update') {
      this.article_id = this.route.snapshot.paramMap.get('id');
      this.http.Get(`articles/${this.article_id}`).subscribe((article: any) => {
        article.text = JSON.parse(article.text);
        this.text = article.text;
      });
    }
  }

  save() {
    console.log(this.text);

    if (this.mode === 'create') { // create
      this.http.Post(`articles`, {text: JSON.stringify(this.text)}).subscribe(data => {
        this.router.navigate(['articles']);
      });
    } else { // update
      this.http.Put(`articles/${this.article_id}`, {text: JSON.stringify(this.text)}).subscribe(data => {
        this.router.navigate(['articles']);
      });
    }
  }
}
