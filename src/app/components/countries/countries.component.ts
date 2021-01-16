import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';
import{DateWiseData} from '../../models/dateWise'
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
data:GlobalDataSummary[];
  countries:string[]=[]
  totalConfirmed=0;
totalActive=0;
totalDeaths=0;
totalRecovered=0;
selectedCountry:DateWiseData[]
dateWiseData;
// globalData:


chart={
  PieChart:"PieChart",
  ColumnChart:"ColumnChart",
  LineChart:"LineChart",
  height:500,
  options:{
    animation:{
      duration:1000,
      easing:'out'
    },
    is3D:true
  }
}

  constructor(private service :DataServiceService) { }

  ngOnInit(): void {
this.service.getDateWiseData().subscribe(
  result=>{
     console.log(result)
  }
)

  this.service.getGlobalData().subscribe(
    result=>{
      this.data=result;
      this.data.forEach(cs=>
        this.countries.push(cs.country))
    })
   }
  updateValues(country:string){

    this.data.forEach(cs=>
      {
        if(cs.country==country){
          this.totalConfirmed=cs.confirmed;
          this.totalActive=cs.active;
          this.totalDeaths=cs.deaths;
          this.totalRecovered=cs.recovered
        }
      })
      this.selectedCountry=this.dateWiseData[country]
console.log(this.selectedCountry)
    }



   
      


}
