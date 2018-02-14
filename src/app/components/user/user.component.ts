import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GithubService } from '../../shared/services/github.service';
import { User } from '../../shared/user';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User

  constructor(private route: ActivatedRoute, private router: Router, private service: GithubService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getUser(id)
      .subscribe(user => this.user = user);
  }

}
