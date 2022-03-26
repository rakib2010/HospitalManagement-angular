import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';
import { Patient } from './forms.model';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  patient: Patient = new Patient() 

  file: any;

  model: any;
  submitted = false;

  items : any;
  
  isSaved : boolean = true;

  

  constructor(private http: HttpClient, private ps: PatientService) {}

  





  

  ngOnInit(): void {
    this.ps.getAll().subscribe(res => {
      console.log(res);
      this.items = res.data;
    }, err => {
      console.log(err);

    })
  }


  handleFileInput(evnet: any) {
    console.log(evnet);

    this.file = evnet.target.files.item(0);
  }




  

  onSubmit(){
    this.submitted = true;
    console.log(this.patient.name, this.patient.gender, this.patient.phone, this.patient.age, this.patient.address, this.patient.email, this.patient.date);
    
    this.ps.saveData(this.patient, this.file)
        .subscribe(res => {

          console.log(res);

        }, err => {
          console.log(err);

        })




  }



  showData(){
    this.ps.getAll().subscribe(res => {
      console.log(res);
      this.items = res.data;
    }, err => {
      console.log(err);

    })
  }



  editRow(patient: any) {
    
    // this.patient = p;
    // this.isSaved = false;
    
    // this.patient = p;
    // this.isSaved = false;
    this.patient = patient;
    
    
    // console.log(p);
    

    // const headers = { 'content-type': 'application/json' };
    // this.http.get("http://localhost:8080/patient/findById/" + p.id, { headers: headers })
    //   .subscribe(res => {
    //     console.log(res)
    //     this.item2 = res;
    //     this.item2.id = this.patient.id;
    //     this.item2.name = this.patient.name;

        
    //   }
    //   )







  }












  deleteItem(p: any) {
    const headers = { 'content-type': 'application/json' };
    this.http.get("http://localhost:8080/patient/delete/" + p.id, { headers: headers })
      .subscribe(data => {
        this.ps.getAll().subscribe(res => {
          console.log(res);
          this.items = res.data;
        }, err => {
          console.log(err);
    
        })
      }
      )
  }


  update(patient: any) {
    this.isSaved = true;
    this.patient = patient;
    const header = { 'content-Type': 'application/json' }
    this.http.put("http://localhost:8080/patient/update", JSON.stringify(this.patient), { headers: header })
      .subscribe(data => {
        console.log(data)


      })
  }

}
