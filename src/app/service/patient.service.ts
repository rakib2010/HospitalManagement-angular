import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }




  saveData(data: any, file: any) {
    const formData: FormData = new FormData();
    formData.append('name', data.name);

    formData.append('gender', data.gender);
    formData.append('age', data.age);
    formData.append('dob', data.date);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('file', file);
    

    return this.http.post('http://localhost:8080/savepatient_withfile', formData);




  }


  getAll() {
    let header = {
      "Content-Type": "application/json"
    };
    return this.http.get<any>('http://localhost:8080/patient/getAll', { headers: header });

  }

  






}
