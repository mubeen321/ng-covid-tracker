import { CssSelector } from '@angular/compiler';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0
  globalData: GlobalDataSummary[];
  datatable=[];

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

  constructor(private dataservice: DataServiceService) { }



  initChart(caseType: string) {
this.datatable=[]
    // this.datatable.push(["country", "cases"]);

    this.globalData.forEach(cs => {
      let value: number;


      if (caseType == "c")
        if (cs.confirmed > 50000){
          value = cs.confirmed
          // this.datatable.push([cs.country, value])
        }

      if (caseType == "a")
        if (cs.active > 1000){

          value = cs.active
// this.datatable.push([cs.country, value])
}

      if (caseType == "d")
        if (cs.deaths > 1000){

          value = cs.deaths
// this.datatable.push([cs.country, value])
}

      if (caseType == "r")
        if (cs.recovered > 1000){
          value = cs.recovered
        }
      this.datatable.push([cs.country, value])
        
    })
    console.log(this.datatable)
    
    
  }


  ngOnInit(): void {

    this.dataservice.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            console.log(result);

            this.globalData = result;
            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {
                this.totalActive += cs.active;
                this.totalConfirmed += cs.confirmed;
                this.totalDeaths += cs.deaths;
                this.totalRecovered += cs.recovered
              }
            })
            this.initChart('c');
          }
        }

      )


  }
  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value)
  }

}
