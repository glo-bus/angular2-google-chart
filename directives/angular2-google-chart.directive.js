System.register(['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var GoogleChart;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            GoogleChart = (function () {
                function GoogleChart(element) {
                    this.element = element;
                    this.chartOptions = {};
                    this.redraw = false;
                    this.exportOnDblClick = false;
                    this.elementId = element.nativeElement.id;
                }
                Object.defineProperty(GoogleChart.prototype, "chartData", {
                    get: function () { return this._chartData; },
                    set: function (val) {
                        this._chartData = val;
                        if (this.redraw === true) {
                            this.drawAfterChartPackagesLoaded();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                GoogleChart.prototype.ngOnInit = function () {
                    if (!googleChartsRequested) {
                        googleChartsRequested = true;
                        google.charts.load('current', { 'packages': ['corechart', 'gauge'] });
                    }
                    google.charts.setOnLoadCallback(this.drawChart.bind(this));
                };
                GoogleChart.prototype.drawAfterChartPackagesLoaded = function () {
                    if (googleChartsLoaded) {
                        // The chart packages have been loaded, proceed
                        this.drawChart();
                    }
                };
                GoogleChart.prototype.drawChart = function () {
                    googleChartsLoaded = true;
                    this.wrapper = new google.visualization.ChartWrapper({
                        chartType: this.chartType,
                        dataTable: this.chartData,
                        options: this.chartOptions,
                        containerId: this.elementId
                    });
                    this.wrapper.draw();
                };
                GoogleChart.prototype.exportImage = function () {
                    if (this.exportOnDblClick) {
                        this.exportURICallback(this.getImageURI());
                    }
                };
                GoogleChart.prototype.getImageURI = function () {
                    var ret = null;
                    if (this.wrapper != null) {
                        ret = this.wrapper.getChart().getImageURI();
                    }
                    return ret;
                };
                __decorate([
                    core_1.Input('chartType'), 
                    __metadata('design:type', String)
                ], GoogleChart.prototype, "chartType", void 0);
                __decorate([
                    core_1.Input('chartOptions'), 
                    __metadata('design:type', Object)
                ], GoogleChart.prototype, "chartOptions", void 0);
                __decorate([
                    core_1.Input('redraw'), 
                    __metadata('design:type', Boolean)
                ], GoogleChart.prototype, "redraw", void 0);
                __decorate([
                    core_1.Input('exportOnDblClick'), 
                    __metadata('design:type', Boolean)
                ], GoogleChart.prototype, "exportOnDblClick", void 0);
                __decorate([
                    core_1.Input('exportURICallback'), 
                    __metadata('design:type', Object)
                ], GoogleChart.prototype, "exportURICallback", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], GoogleChart.prototype, "chartData", null);
                __decorate([
                    core_1.HostListener('dblclick'), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], GoogleChart.prototype, "exportImage", null);
                GoogleChart = __decorate([
                    core_1.Directive({
                        selector: '[GoogleChart]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], GoogleChart);
                return GoogleChart;
            }());
            exports_1("GoogleChart", GoogleChart);
        }
    }
});
//# sourceMappingURL=angular2-google-chart.directive.js.map