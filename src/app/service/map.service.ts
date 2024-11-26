import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MapTo {

  constructor() { }

  FormGrouptoFormData(formGroup: FormGroup): FormData {
    const formData = new FormData();
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control && control.value) {
        if (key === 'File' && control.value instanceof File) {
          formData.append(key, control.value, control.value.name);
        } else {
         formData.append(key, control.value);
        }
      }
    });
    
    return formData;
  }

  convertJsonToFormData(json: any): FormData {
    const formData = new FormData();
    Object.keys(json).forEach(key => {
        if (json[key] instanceof Object && !(json[key] instanceof File)) {
            formData.append(key, JSON.stringify(json[key]));
        } else {
            formData.append(key, json[key]);
        }
    });
 
    return formData;
}

  ToISOString(date: any): string {
    const tempdate = new Date(date);
    return tempdate.toISOString();
  }

   ToUppercaseFirstLetterJson(obj: any) {
    const newObject: any = {};
  
    for (const key of Object.keys(obj)) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      newObject[capitalizedKey] = obj[key];
    }
  
    return newObject;
  }

  ToUppercaseFirstLetterFormData(form:any) {
    const newFormData = new FormData();
    for (let [key, value] of form.entries()) {
      const newKey = key.charAt(0).toUpperCase() + key.slice(1);
      newFormData.append(newKey, value);
    }
    
    return newFormData;
  }

  toFormalDate(data)
  {
   
      // Create a Date object from the input date string
      const date = new Date(data);
  
      // Extract day, month, and year
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
  
      // Format the date as dd/mm/yyyy
      return `${day}/${month}/${year}`;
  
  }
}