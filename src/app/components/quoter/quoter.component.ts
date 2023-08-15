import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/interfaces/city';
import { DocumentType } from 'src/app/interfaces/document-type';
import { GlobalProduct } from 'src/app/interfaces/global-product';
import { InsuranceQuote } from 'src/app/interfaces/insurance-quote';
import { Rate } from 'src/app/interfaces/rate';
import { State } from 'src/app/interfaces/state';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { GlobalProductService } from 'src/app/services/global-product.service';
import { InsuranceQuoteService } from 'src/app/services/insurance-quote.service';
import { StateService } from 'src/app/services/state.service';
import { RateService } from 'src/app/services/rate.service';
import { pictures } from 'src/app/interfaces/pictures'

const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';



@Component({
  selector: 'app-quoter',
  templateUrl: './quoter.component.html',
  styleUrls: ['./quoter.component.css']
})
export class QuoterComponent {
  form: FormGroup;
  listDocumentTypes: DocumentType[] = [];
  listStates: State[] = [];
  listCities: City[] = [];
  listCitiesBeneficiary: City[] = [];
  listGlobalProducts: GlobalProduct[] = [];
  listRates: Rate[] = [];
  loading: boolean = false;
  second_beneficiary: boolean = false;
  third_beneficiary: boolean = false;
  showAgeBeneficiary: any;
  showAge: any;
  year_university: any;
  now: any;
  isDisabled: boolean = false;
  show_picture: string = pictures.boy;

  constructor(private fb: FormBuilder,
    private _documentTypeService: DocumentTypeService,
    private _globalProductService: GlobalProductService,
    private _stateService: StateService,
    private _insuranceQuote: InsuranceQuoteService,
    private _rateService: RateService,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      principal_document_type: ['0', Validators.required],
      principal_name: ['', Validators.required],
      principal_document_number: ['', Validators.required],
      principal_first_last_name: ['', Validators.required],
      principal_second_last_name: ['', Validators.required],
      principal_birthdate: ['', Validators.required],
      principal_age: [{ value: '', disabled: true }],
      principal_gender: ['male'],
      principal_mail: ['', Validators.required],
      principal_phone: ['', Validators.required],
      principal_state: ['0', Validators.required],
      principal_city: ['0', Validators.required],
      beneficiary_document_number: ['', Validators.required],
      beneficiary_document_type: ['0', Validators.required],
      beneficiary_name: ['', Validators.required],
      beneficiary_first_last_name: ['', Validators.required],
      beneficiary_second_last_name: ['', Validators.required],
      beneficiary_birthdate: ['', Validators.required],
      beneficiary_age: [{ value: '', disabled: true }],
      beneficiary_state: ['0', Validators.required],
      beneficiary_city: ['0', Validators.required],
      beneficiary_gender: ['male'],
      beneficiary_start_university: ['', Validators.required],
      beneficiary_school: ['',],
      beneficiary_grade: ['-1',],
      year_university_calculated: [{ value: '', disabled: true }],
      product: ['0', Validators.required],
      rate: ['0', Validators.required],
      observations: [''],
      second_beneficiary: [],
      beneficiary_calendary: ['-1']
    });
  }

  ngOnInit(): void {
    this.getListDocumentTypes();
    this.getListStates();
    this.getListGlobalProducts();
    this.getListRates();

    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd')
  }

  getListRates() {
    this.loading = true;
    this._rateService.getListRates().subscribe((data: Rate[]) => {
      this.listRates = data;
      this.loading = false;
    });
  }

  getListGlobalProducts() {
    this.loading = true;
    this._globalProductService.getListActiveGlobalProducts().subscribe((data: GlobalProduct[]) => {
      this.listGlobalProducts = data;
      this.loading = false;
    });
  }

  getListDocumentTypes() {
    this.loading = true;
    this._documentTypeService.getListDocumentTypes().subscribe((data: DocumentType[]) => {
      this.listDocumentTypes = data;
      this.loading = false;
    });
  }

  getListStates() {
    this.loading = true;
    this._stateService.getStates().subscribe((data: State[]) => {
      this.listStates = data;
      this.loading = false;
    });
  }


  getCities(stateId: any) {
    this._stateService.getCities(stateId.target.value).subscribe((data: State[]) => {
      this.listCities = data;
    });
  }

  getCitiesBeneficiary(stateId: any) {
    this._stateService.getCities(stateId.target.value).subscribe((data: State[]) => {
      this.listCitiesBeneficiary = data;
    });
  }

  ageCalculator() {
    if (this.form.value.principal_birthdate) {
      const convertAge = new Date(this.form.value.principal_birthdate);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.form.value.principal_age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      this.showAge = this.form.value.principal_age;
    }
  }

  ageCalculatorBeneficiary() {

    if (this.form.value.beneficiary_birthdate) {
      const convertAge = new Date(this.form.value.beneficiary_birthdate);
      this.form.value.year_university_calculated = convertAge.getFullYear() + 18;
      this.year_university = this.form.value.year_university_calculated;
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.form.value.beneficiary_age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      this.showAgeBeneficiary = this.form.value.beneficiary_age;
    }

    if (this.form.value.beneficiary_age < 4) {
      this.isDisabled = true;
      this.form.get('beneficiary_school')?.disabled;
      this.form.controls['beneficiary_school'].disabled;
      this.toastr.warning('El Beneficiario aun no cuenta con la edad requerida para estar en el colegio', 'Edad beneficiario');
    }
    else {
      this.isDisabled = false;
    }
  }

  addProduct() {
    const insuranceQuote: InsuranceQuote = {
      principal_document_type: this.form.value.principal_document_type,
      principal_document_number: this.form.value.principal_document_number,
      principal_name: this.form.value.principal_name,
      principal_first_last_name: this.form.value.principal_first_last_name,
      principal_second_last_name: this.form.value.principal_second_last_name,
      principal_birthdate: this.form.value.principal_birthdate,
      principal_age: this.showAge,
      principal_gender: this.form.value.principal_gender,
      principal_mail: this.form.value.principal_mail,
      principal_phone: this.form.value.principal_phone,
      principal_state: this.form.value.principal_state,
      principal_city: this.form.value.principal_city,
      beneficiary_name: this.form.value.beneficiary_name,
      beneficiary_first_last_name: this.form.value.beneficiary_first_last_name,
      beneficiary_second_last_name: this.form.value.beneficiary_second_last_name,
      beneficiary_document_type: this.form.value.beneficiary_document_type,
      beneficiary_document_number: this.form.value.beneficiary_document_number,
      beneficiary_birthdate: this.form.value.beneficiary_birthdate,
      beneficiary_age: this.showAgeBeneficiary,
      beneficiary_state: this.form.value.beneficiary_state,
      beneficiary_gender: this.form.value.beneficiary_gender,
      beneficiary_city: this.form.value.beneficiary_city,
      beneficiary_school: this.form.value.beneficiary_school,
      beneficiary_grade: this.form.value.beneficiary_grade,
      year_university_calculated: this.year_university,
      beneficiary_start_university: this.form.value.beneficiary_start_university,
      global_product: this.form.value.product,
      global_rate: this.form.value.rate,
      state: true,
      observations: this.form.value.observations
    };

    console.log(insuranceQuote);
    this._insuranceQuote.saveInsuranceQuotes(insuranceQuote).subscribe(() => {
      this.toastr.info('La cotización fue guardada satisfactoriamente', 'Cotización guardada');
    })

  }

  addBeneficiary(){
    this.second_beneficiary = true;
  }
  delBeneficiary(){
    this.second_beneficiary = false;
  }
  addBeneficiary2(){
    this.third_beneficiary = true;
  }
  delBeneficiary2(){
    this.third_beneficiary = false;
  }

  createPdf() {
    if(this.form.value.beneficiary_gender == "female"){
      this.show_picture = pictures.girl;
    }
    else{
      this.show_picture = pictures.boy;
    }
    const pdfDefinition: any = {
      content: [
        {
          style: 'tableHeader',
          table: {
            widths: [5, '*', 75, '*'],
            body: [
              [' ',
                {
                  image: pictures.logo,
                  width: 150
                }, ' ',
                [
                  {
                    table: {
                      heights: [2, 20, 2],
                      body: [
                        [''],
                        ['Seguro Educativo'],
                        ['']
                      ]
                    },
                    layout: 'noBorders'
                  }
                ]]
            ]
          },
          layout: 'noBorders'
        },
        {
          style: 'subheader',
          table: {
            widths: [300, '*'],
            body: [
              [' ', ' '],
              ['', 'Fecha Cotización: 09 de agosto de 2023'],
              ['', 'No. Cotizacion: 396574']
            ]
          },
          layout: 'noBorders'
        },
        {
          style: 'tablePicture',
          table: {
            widths: [35, '*'],
            body: [
              [{
                table: {
                  heights: [200, 200, 150],                  
                  body: [
                    [''],
                    [
                      {
                      image: pictures.vigilated,
                      height: 200,
                      width: 19
                    }],
                    ['']
                  ]
                },
                layout: 'noBorders'
              },
              {
                table: {
                  heights: [300, 200],
                  widths: [500],
                  body: [                    
                    [
                      {
                      image: this.show_picture,
                      height: 300,
                      width: 450
                    }],
                    [{
                      style: 'tableDataUser',
                      table: {
                        widths: [270, 25, 180],
                        heights: [8, 35, 1, 4, 250, 20],
                        body: [
                          ['','',''],
                          [{text: 'COTIZACIÓN           ', bold: true, color: 'gray', fontSize: 21}, '', 
                           {text: ' Soluciones\n Educativas', alignment: 'left'}],
                          [{text: '', fillColor:'#017BC4'}, '', {text: '', fillColor:'#017BC4'}],
                          ['', '', ''],
                          [{
                            table:{
                              body:[
                                [{text: 'ASEGURADO: ',  alignment: 'right'}, {text: this.form.value.principal_name + ' ' + this.form.value.principal_first_last_name + ' ' + this.form.value.principal_second_last_name, alignment: 'left'}],
                                [{text: 'No. IDENTIFICACIÓN: ', alignment: 'right'}, {text: this.form.value.principal_document_number, alignment: 'left'}],
                                [{text: 'BENEFICIARIO: ', alignment: 'right'}, {text: this.form.value.beneficiary_name  + ' ' + this.form.value.beneficiary_first_last_name + ' ' + this.form.value.beneficiary_second_last_name, alignment: 'left'}],
                                [{text: 'No. IDENTIFICACIÓN: ', alignment: 'right'}, {text: this.form.value.beneficiary_document_number, alignment: 'left'}]
                              ]
                            },
                            layout: 'noBorders'
                          }, '', 
                           {text: 'NOMBRE ASESOR:\nAsesor Autorizado', alignment: 'left'}],
                          [{text: 'Tarifa Septiembre 2023', alignment: 'left'}, '', 
                           {text: 'Hoja 1/3', alignment: 'right'}],
                        ]
                      },
                      layout: 'noBorders'
                    }]
                  ]
                },
                layout: 'noBorders'
              }
              ]
            ]
          },
          layout: 'noBorders'
        },
        {text: ' ', pageBreak: 'before', style: 'subheader'},
        {
          style: 'tablePicture',
          table: {
            widths: [35, '*'],
            body: [
              [{
                table: {
                  heights: [200, 200, 150],                  
                  body: [
                    [''],
                    [
                      {
                      image: pictures.vigilated,
                      height: 200,
                      width: 19
                    }],
                    ['']
                  ]
                },
                layout: 'noBorders'
              },
              {
                table: {
                  heights: [10, 50],
                  widths: [500],
                  body: [                    
                    [{text: 'No. Cotizacion: 396574',  alignment: 'right', color: 'gray', fontSize: 10}],
                    [{
                      style: 'tableDataUser',
                      table: {
                        widths: [370],
                        heights: [8, 15, 1, 1],
                        body: [
                          [''],
                          [{text: 'INFORMACIÓN DEL ASEGURADO', color: 'gray', fontSize: 21, alignment: 'left'}],
                          [{text: '', fillColor:'#017BC4'}],
                          ['']
                        ]
                      },
                      layout: 'noBorders'
                    }],
                    [{
                      style: 'tableDataUser',
                      table: {
                        widths: [500],
                        heights: [35, 1, 4, 250, 20],
                        body: [
                          [{
                            style: 'tableDataUserDetail',
                            table:{
                              widths: [2,125,120,50,170],
                              heights: [32,32,32],
                              body:[
                                [{text:' ', fillColor: '#ECECEC'},
                                 {text: 'TOMADOR:\n' + this.form.value.principal_name + ' ' + this.form.value.principal_first_last_name + ' ' + this.form.value.principal_second_last_name,  alignment: 'left', fillColor: '#ECECEC'}, 
                                 {text: 'FECHA NACIMIENTO:\n' + this.form.value.principal_birthdate,  alignment: 'left', fillColor: '#ECECEC'},
                                 {text: 'EDAD:\n' + this.showAge,  alignment: 'left', fillColor: '#ECECEC'},
                                 {text:'', fillColor: '#ECECEC'}],
                                [{text:' ', fillColor: '#FCFCFC'},
                                 {text: 'BENEFICIARIO:\n' + this.form.value.beneficiary_name  + ' ' + this.form.value.beneficiary_first_last_name + ' ' + this.form.value.beneficiary_second_last_name, alignment: 'left', fillColor: '#FCFCFC'}, 
                                 {text: 'FECHA NACIMIENTO:\n' + this.form.value.beneficiary_birthdate,  alignment: 'left', fillColor: '#FCFCFC'},
                                 {text: 'EDAD:\n' + this.showAgeBeneficiary,  alignment: 'left', fillColor: '#FCFCFC'},
                                 {text: 'FECHA ESPERADA DE INGRESO A\nLA UNIVERSIDAD: ' + this.form.value.beneficiary_start_university,  alignment: 'left', fillColor: '#FCFCFC'}],
                                [{text:' ', fillColor: '#ECECEC'},
                                 {text: 'Nota: Las primas de los productos corresponden a la fecha esperada de ingreso a la universidad del beneficiario (Fecha de Maduración) el cálculo de esta fecha debe ser confirmado por el tomador.', colSpan: 4, alignment: 'left', fillColor: '#ECECEC'}]
                              ]
                            },
                            layout: 'noBorders'
                          }]
                        ]
                      },
                      layout: 'noBorders'
                    }],
                    [{
                      style: 'tableDataUser',
                      table: {
                        widths: [370],
                        heights: [8, 15, 1, 1],
                        body: [
                          [''],
                          [{text: 'RESULTADOS COTIZACIÓN', color: 'gray', fontSize: 21, alignment: 'left'}],
                          [{text: '', fillColor:'#017BC4'}],
                          ['']
                        ]
                      },
                      layout: 'noBorders'
                    }],
                    [{
                      style: 'tableDataUser',
                      table: {
                        widths: [500],
                        heights: [35, 1, 4, 250, 20],
                        body: [
                          [{
                            style: 'tablePlans',
                            table:{
                              widths: [255,90,110],
                              heights: [27,22,22,22,22,22,22],
                              body:[
                                [{text: 'NOMBRE DE LA SOLUCIÓN',  alignment: 'center', fillColor: '#017BC4', color: '#FFFFFF', bold: true, borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}, 
                                 {text: 'VALOR DE PRIMA',  alignment: 'center', fillColor: '#017BC4', color: '#FFFFFF', bold: true, borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']},
                                 {text: 'TARIFA',  alignment: 'center', fillColor: '#017BC4', color: '#FFFFFF', bold: true, borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}],
                                [{text: 'GLOBAL UNIVERSIDAD SEGURA 4 SMMLV', color: '#034088', alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}, 
                                 {text: '$ 39,627,000', color: '#034088',  alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']},
                                 {text: 'Septiembre de 2023', color: '#034088',  alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}],
                                [{text: 'GLOBAL UNIVERSIDAD SEGURA 6 SMMLV', color: '#034088', alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}, 
                                 {text: '$ 57,186,000', color: '#034088',  alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']},
                                 {text: 'Septiembre de 2023', color: '#034088',  alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}],
                                [{text: 'GLOBAL UNIVERSIDAD SEGURA 8 SMMLV', color: '#034088', alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}, 
                                 {text: '$ 75,085,000', color: '#034088',  alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']},
                                 {text: 'Septiembre de 2023', color: '#034088',  alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}],
                                [{text: 'GLOBAL UNIVERSIDAD SEGURA 10 SMMLV', color: '#034088', alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}, 
                                 {text: '$ 95,560,000', color: '#034088',  alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']},
                                 {text: 'Septiembre de 2023', color: '#034088',  alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}],
                                [{text: 'GLOBAL UNIVERSIDAD SEGURA 12 SMMLV', color: '#034088', alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}, 
                                 {text: '$ 101,454,000', color: '#034088',  alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']},
                                 {text: 'Septiembre de 2023', color: '#034088',  alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}],
                                [{text: 'GLOBAL UNIVERSIDAD SEGURA 13 SMMLV', color: '#034088', alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}, 
                                 {text: '$ 101,219,000', color: '#034088',  alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']},
                                 {text: 'Septiembre de 2023', color: '#034088',  alignment: 'center', fillColor: '#CCE5F3', borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}]
                              ]
                            },
                          }],
                        ]
                      },
                      layout: 'noBorders'
                    }],
                    [{
                      style: 'tableDataUser',
                      table: {
                        widths: ['*'],
                        heights: [230],
                        body: [
                          [{
                            style: 'tablePlans',
                            table:{
                              widths: [100,375],
                              heights: [150],
                              body:[
                                [{
                                  table:{
                                    style: 'tableCobert',
                                    heights: [45,72],
                                    widths: ['*'],
                                    body:[
                                      [{text:'', fillColor: '#017BC4', borderColor: ['#017BC4', '#017BC4', '#017BC4', '#017BC4']}],
                                      [{text: 'COBERTURA',  alignment: 'center', fillColor: '#017BC4', color: '#FFFFFF', bold: true, borderColor: ['#017BC4', '#017BC4', '#017BC4', '#017BC4']}],
                                    ]
                                  },
                                  //layout: 'noBorders'
                                },
                                {
                                  table:{
                                    style: 'tableCobert',
                                    heights: ['*'],
                                    widths: ['*'],
                                    body:[                                      
                                      [{text: '\n' +
                                      ' - Pago total o parcial de la matricula de acuerdo a los salarios mínimos adquiridos \n\n' + 
                                      ' - Cualquier carrera - cualquier universidad pregrado en Colombia \n\n' +
                                      ' - Especificaión períodos de cobertura: Cubre según los salarios mínimos ' +
                                      'adquiridos para el pago de cada matricula, máximo hasta diez (10) semestres académicos.\n\n ',  
                                        alignment: 'left', fillColor: '#CCE5F3', color: '#034088',  borderColor: ['#CCE5F3', '#CCE5F3', '#CCE5F3', '#CCE5F3']}],
                                    ]
                                  },
                                  //layout: 'noBorders'
                                }]                                
                              ]
                            },
                            layout: 'noBorders'
                          }],
                          [{
                            style: 'tableDataUser',
                            table: {
                              widths: [270, 25, 180],
                              body: [                                
                                [{text: 'Tarifa Septiembre 2023', alignment: 'left'}, '', 
                                 {text: 'Hoja 2/3', alignment: 'right'}],
                              ]
                            },
                            layout: 'noBorders'
                          }]
                        ]
                      },
                      layout: 'noBorders'
                    }]
                  ]
                },
                layout: 'noBorders'
              }
              ]
            ]
          },
          layout: 'noBorders'
        }
      ],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 18,
          color: 'white',
          fillColor: '#017BC4',
          alignment: 'center',
          margin: [-45, 0, -45, 0]
        },
        subheader: {
          fontSize: 9,
          color: 'gray',
          alignment: 'right'
        },
        tablePicture: {
          alignment: 'center',
          margin: [-25, 0, -25, 0]
        },
        tableResume: {
          bold: true,
          fontSize: 18,
          color: 'gray',
          alignment: 'left',
        },
        tableDataUser: {
          color: 'gray', 
          fontSize: 10,
        },
        tableDataUserDetail: {
          color: '#555555', 
          fontSize: 9,
        },
        tableCobert:{
          fillColor: '#017BC4', 
          borderColor: ['#017BC4', '#017BC4', '#017BC4', '#017BC4']
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

}
