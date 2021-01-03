import { Component, OnInit } from '@angular/core';
import { PodatkiTekme } from 'src/app/modeli/PodatkiTekme';
import { AvtentikacijaService } from 'src/app/storitve/avtentikacija.service';

//graaf
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color } from 'ng2-charts';
//konec grafa

@Component({
  selector: 'app-moje-tekme',
  templateUrl: './moje-tekme.component.html',
  styleUrls: ['./moje-tekme.component.css']
})
export class MojeTekmeComponent implements OnInit {


  uporabnik: any;
  loaded = false;
  tekme: [PodatkiTekme];

  niTekem = true;


  //zacetek grafa

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },

    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public chartColors: Color[] = [
    { backgroundColor: '#4d5663' },
  ];



  public testtabelca =  [0,0,0,0,0,0,0,0,0,0,0,0];

  public barChartData: ChartDataSets[] = [
    { data: this.testtabelca, label: 'Število tekem' }
  ];


  //konec grafa

  constructor(
    private avtentikacijaStoritev: AvtentikacijaService
  ) { }

  ngOnInit(): void {
    this.vrniUporabnika();
     // console.log(this.barChartData);
  }

  public vrniUporabnika() {
    this.avtentikacijaStoritev.vrniPodatkeUporabnika().then((data) => {
      this.uporabnik = data
      this.tekme = this.uporabnik.tekme
      this.loaded = true
      if (this.tekme.length > 0) {
        this.niTekem = false;
      }
      //zacetek grafa
        for(var tekma of this.tekme) {
          var trenutniDatum = tekma.datum;
          var mesec = trenutniDatum.split("-");
          var mesecc = parseInt(mesec[1]);
          //console.log(typeof(mesecc));
          var mesec1 = mesecc - 1;

          this.testtabelca[mesec1] ++;

        }
        //console.log("tabela: ",tabelcaGraf);

      //konec grafa


    })


  }


  //graf zacetek
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }




  //graf konec

}
