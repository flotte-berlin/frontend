import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Subscription, ReplaySubject, Subject } from "rxjs";
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';


@Component({ selector: "select-search", templateUrl: "form-select-search.component.html", styleUrls: ["./form-select-search.component.scss"] })
export class FormSelectSearchComponent implements OnInit, OnDestroy, OnChanges {


  //@Input() group: FormGroup;
  //@Input() controlName: string; 
  @Input() formCtrl: FormControl;
  
  @Input() data: any[];
  @Input() preSelectedData: any[];
  @Input() label: string;
  @Input() multiple: boolean;

  selectedOptions: any[] = [];

  public filteredInterfacesBMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  
  public searchCtrl: FormControl = new FormControl();


  constructor(private _formBuilder: FormBuilder) {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed

    if (changes['data']) {
      
      if (this.preSelectedData !== undefined){
        //console.log( this.label + " is not undefined :D");
        //console.log(this.label + " preselected: " + this.preSelectedData);
        //console.log(JSON.stringify(this.preSelectedData))
        this.riskListGeneratorB(this.preSelectedData);
        console.log(this.label + " selected options: "+ JSON.stringify(this.selectedOptions) + " all options: " + JSON.stringify(this.data));
      }
      
      //this.listenInterfacesSearchable();
      this.filterInterfacesBMulti();
    }
    if (changes['preSelectedData']) {
      
      if (this.preSelectedData !== undefined){
        /*console.log(this.label + " preselect data change");
        console.log(this.label + " preselected: " + this.preSelectedData);
        console.log(JSON.stringify(this.preSelectedData))*/
        this.riskListGeneratorB(this.preSelectedData);
        console.log(this.label + " selected options: "+ JSON.stringify(this.selectedOptions) + " all options: " + JSON.stringify(this.data));
      }
      
      //this.listenInterfacesSearchable();
      this.filterInterfacesBMulti();
    }
  }

  ngOnInit() {
    //this.group.addControl('searchCtrl', this.searchCtrl);
    //this.formCtrl = this.group[this.controlName];
    if (this.preSelectedData !== undefined){
      /*console.log("preselected is not undefined :D");
      console.log("preselected: " + this.preSelectedData);*/
      this.riskListGeneratorB(this.preSelectedData);
      console.log("selected options: "+ JSON.stringify(this.selectedOptions) + " all options: " + JSON.stringify(this.data));
    }
    
    this.listenInterfacesSearchable();
  }
  
  private listenInterfacesSearchable(){
    this.filteredInterfacesBMulti.next(this.data.slice());

    this.searchCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterInterfacesBMulti();
      });

  }

  private _onDestroy = new Subject<void>();

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  private filterInterfacesBMulti() {
    if (!this.data) {
      return;
    }
    // get the search keyword
    let search = this.searchCtrl.value;
    if (!search) {
      this.filteredInterfacesBMulti.next(this.data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredInterfacesBMulti.next(
      this.data.filter(interf => interf.NAME.toLowerCase().indexOf(search) > -1)
    );
  }



  private riskListGeneratorB(risks: any[]) {
    for (let risk of risks) {
      for (let riskItem of this.data) {
        if (risk._id === riskItem._id) {
          console.log(this.label + " added id actual data: " + risk._id + " id background data: " + riskItem._id);
          if (this.multiple === undefined){
            this.selectedOptions = riskItem;
            console.log("set instead of add");
          } else if (this.selectedOptions.find(e => e._id === risk._id) == undefined){ // only add it to the list if its not added already
             this.selectedOptions.push(riskItem);
          }
          
        }
      }
    }
  }



}
