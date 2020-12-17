import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import  gql  from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsService {
  Register_No=6000;
  constructor(private apollo:Apollo) { }
  getRegisterNo(){
    return this.Register_No;
  }
  getDropDown(str: string) {
    const req = gql`
      query personReference($data: Person_Reference_Input) {
        personReference(data: $data){
          Ref_Code
          Category
          Ref_Name
        }
      }`;
    return this.apollo.watchQuery({
        query: req,
        variables: {
          data: {
            Category: str
          }
        }
      })
      .valueChanges.pipe(map((result: any) =>
      JSON.parse(JSON.stringify(result.data['personReference']))
      ));
  }
}
