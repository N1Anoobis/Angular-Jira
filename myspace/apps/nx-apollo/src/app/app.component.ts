import { Component, OnInit, DoCheck } from '@angular/core';
import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'myspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  rates!: any[];
  loading = true;
  error: any;
  cache!: InMemoryCache;
  reactiveVar: any;


  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.rates = result?.data?.rates;
        this.loading = result.loading;
        this.error = result.error;
      });

      this.cache = new InMemoryCache({})
  }

  ngDoCheck() {
    console.log(this.apollo)
  }
}
