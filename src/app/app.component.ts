import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms"
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currency = '$';

  form = this.fb.group( {
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  });

  productsData:any;

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getData().subscribe(data => this.productsData = data);
  }

  scrollTo(target: HTMLElement) {
    target.scrollIntoView({behavior: "smooth"});
  }

  confirmOrder(){
    if (this.form.valid) {

      this.appService.sendOrder(this.form.value)
      .subscribe({
        next:(response: any)=> {
          alert(response.message);
          this.form.reset();
        },
        error: (response) => {
          alert(response.error.message)
        }
      })

      alert("Спасибо за заказ! Мы скоро свяжемся с вами !");
      this.form.reset();
    }
  }
  changeCurrency() {
    let newCurrency = "$";
    let coefficient = 1;
  
    if (this.currency === "$") {
         newCurrency = "₽";
         coefficient = 80;
      } else if (this.currency === "₽") {
         newCurrency = "BYN";
         coefficient = 3;
      }
      //ДЗ добавить другие валюты
      else if (this.currency === "BYN") {
         newCurrency = "€";
         coefficient = 2,83;
      }
      else if (this.currency === "€") {
         newCurrency = "¥";
         coefficient = 8;
      };
  
     this.currency = newCurrency;
  
     this.productsData.forEach(
      (item: any) => {
        item.price = +(item.basePrice * coefficient).toFixed(1);
      }
     )
  }
}


  
  
  
  


