import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

declare var google: any;
declare var googleChartsRequested: boolean;
declare var googleChartsLoaded: boolean;

@Directive({
  selector: '[GoogleChart]'
})
export class GoogleChart implements OnInit {
  private elementId: any;
  private wrapper: any;
  private _chartData: Object;
  @Input('chartType') public chartType: string;
  @Input('chartOptions') public chartOptions: Object = {};
  @Input('redraw') public redraw: boolean = false;
  @Input('exportOnDblClick') public exportOnDblClick: boolean = false;
  @Input('exportURICallback') public exportURICallback: any;

  @Input()
  set chartData(val: Object) {
    this._chartData = val;
    if (this.redraw === true) {
      this.drawAfterChartPackagesLoaded();
    }
  }
  get chartData() { return this._chartData; }

  constructor(public element: ElementRef) {
    this.elementId = element.nativeElement.id;
  }

  ngOnInit() {
    if (!googleChartsRequested) {
      googleChartsRequested = true;
      google.charts.load('current', {'packages':['corechart', 'gauge']});
    }
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawAfterChartPackagesLoaded(): void {
    if (googleChartsLoaded){
      // The chart packages have been loaded, proceed
      this.drawChart();
    }
  }

  drawChart() {
    googleChartsLoaded = true;
    this.wrapper = new google.visualization.ChartWrapper({
      chartType:    this.chartType,
      dataTable:    this.chartData ,
      options:      this.chartOptions,
      containerId:  this.elementId
    });
    this.wrapper.draw();
  }

  @HostListener('dblclick') exportImage() {
    if (this.exportOnDblClick) {
      this.exportURICallback(this.getImageURI());
    }
  }

  getImageURI() {
    let ret:any = null;
    if (this.wrapper != null) {
      ret = this.wrapper.getChart().getImageURI();
    }
    return ret;
  }
}
