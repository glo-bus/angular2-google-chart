import {Directive,ElementRef,Input,OnInit} from '@angular/core';
declare var google:any;
declare var googleLoaded:any;
@Directive({
  selector: '[GoogleChart]',
  // properties: [
  //     'chartType',
  //     'chartOptions',
  //     'chartData'
  //   ]
})
export class GoogleChart implements OnInit {
  public _element: any;
  public _chartData: Object;
  @Input('chartType') public chartType: string;
  @Input('chartOptions') public chartOptions: Object;
  @Input('redraw') public redraw: boolean = false;

  @Input()
  set chartData(val: Object) {
    this._chartData = val;
    if (this.redraw === true) {
      this.drawAfterGoogleLoaded();
    }
  }
  get chartData() { return this._chartData; }

  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }

  ngOnInit() {
    this.drawAfterGoogleLoaded();
  }

  drawAfterGoogleLoaded() {
    if(!googleLoaded) {
      googleLoaded = true;
      google.charts.load('current', {'packages':['corechart', 'gauge']});
    }
    setTimeout(() =>this.drawGraph(this.chartOptions,this.chartType,this.chartData,this._element),1000);
  }

  drawGraph (chartOptions,chartType,chartData,ele) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var wrapper;
      wrapper = new google.visualization.ChartWrapper({
        chartType: chartType,
        dataTable:chartData ,
        options:chartOptions || {},
        containerId: ele.id
      });
      wrapper.draw();
    }
  }
}
