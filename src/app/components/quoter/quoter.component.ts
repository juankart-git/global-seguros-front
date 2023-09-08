import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DocumentType } from 'src/app/interfaces/document-type';
import { InsuranceQuote } from 'src/app/interfaces/insurance-quote';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { InsuranceQuoteService } from 'src/app/services/insurance-quote.service';
import { pictures } from 'src/app/interfaces/pictures'
import { ProductRateService } from 'src/app/services/product-rate.service';
import { ProductRate } from 'src/app/interfaces/product-rate';


const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-quoter',
  templateUrl: './quoter.component.html',
  styleUrls: ['./quoter.component.css']
})
export class QuoterComponent {
  form: FormGroup;
  listDocumentTypes: DocumentType[] = [];
  loading: boolean = false;
  second_beneficiary: boolean = false;
  third_beneficiary: boolean = false;
  year_university: any;
  year_university_2: any;
  year_university_3: any;
  now: any;
  dayAsString: any;
  monthAsString: any;
  yearAsString: any;
  isDisabled: boolean = false;
  isDisabled_2: boolean = false;
  isDisabled_3: boolean = false;
  show_picture: string = pictures.boy;
  show_picture2: string = pictures.boy;
  show_picture3: string = pictures.boy;

  isDisabledDocumentType: boolean = false;
  isDisabledDocumentNumber: boolean = false;
  isDisabledName: boolean = false;
  isDisabledPhone: boolean = false;
  isDisabledEmail: boolean = false;

  isDisabledBenName: boolean = false;
  isDisabledBenBirth: boolean = false;
  isDisabledBenGrade: boolean = false;
  isDisabledBenCalendar: boolean = false;

  isDisabledBenName2: boolean = false;
  isDisabledBenBirth2: boolean = false;
  isDisabledBenGrade2: boolean = false;
  isDisabledBenCalendar2: boolean = false;

  isDisabledBenName3: boolean = false;
  isDisabledBenBirth3: boolean = false;
  isDisabledBenGrade3: boolean = false;
  isDisabledBenCalendar3: boolean = false;

  id_saved: any;
  grade: string = "";
  grade2: string = "";
  grade3: string = "";

  calendar: string = "";
  calendar2: string = "";
  calendar3: string = "";

  plan_4: string = "";
  plan_6: string = "";
  plan_8: string = "";
  plan_10: string = "";
  plan_12: string = "";
  plan_13:string = "";

  plan_4_2: string = "";
  plan_6_2: string = "";
  plan_8_2: string = "";
  plan_10_2: string = "";
  plan_12_2: string = "";
  plan_13_2:string = "";

  plan_4_3: string = "";
  plan_6_3: string = "";
  plan_8_3: string = "";
  plan_10_3: string = "";
  plan_12_3: string = "";
  plan_13_3:string = "";
  rate:string = "";

  principal_document_type_error:string = "";

  constructor(private fb: FormBuilder,
    private _documentTypeService: DocumentTypeService,
    private _insuranceQuote: InsuranceQuoteService,
    private _productRate: ProductRateService,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      id:[0],
      principal_document_type: ['0', Validators.required],
      principal_name: ['', Validators.required],
      principal_document_number: ['', Validators.required],
      principal_mail: ['', Validators.required],
      principal_phone: ['', Validators.required],
      beneficiary_name: ['', Validators.required],
      beneficiary_birthdate: ['', Validators.required],
      beneficiary_age: [{ value: '', disabled: true }],
      beneficiary_gender: ['male'],
      beneficiary_start_university: ['', Validators.required],
      beneficiary_grade: ['-1',],
      beneficiary_calendar: ['-1',],

      beneficiary_name_2: ['', Validators.required],
      beneficiary_birthdate_2: ['', Validators.required],
      beneficiary_age_2: [{  value: '',disabled: true }],
      beneficiary_gender_2: ['male'],
      beneficiary_start_university_2: ['', Validators.required],
      beneficiary_grade_2: ['-1',],
      beneficiary_calendar_2: ['-1',],

      beneficiary_name_3: ['', Validators.required],
      beneficiary_birthdate_3: [ '',Validators.required],
      beneficiary_age_3: [{  value: '', disabled: true }],
      beneficiary_gender_3: ['male'],
      beneficiary_start_university_3: [ Validators.required],
      beneficiary_grade_3: ['-1',],
      beneficiary_calendar_3: ['-1',],

      year_university_calculated: [{ value: '', disabled: true }],
      second_beneficiary: [],

      principal_document_type_error: ['']
    });
  }

  searchPrincipalInfo(){   
    let name = "";
    if(this.form.value.principal_document_number != null && this.form.value.principal_document_number != ""){
      this._insuranceQuote.getListInsuranceQuotesByDocument(this.form.value.principal_document_number).subscribe((data: InsuranceQuote) => {
        if(data){
          this.form.patchValue({
            id: data.id,
            principal_name: data.principal_name,
            principal_mail: data.principal_mail,
            principal_phone: data.principal_phone,
            principal_document_type: data.principal_document_type,

            beneficiary_name: data.beneficiary_name,
            beneficiary_birthdate: data.beneficiary_birthdate,
            beneficiary_gender: data.beneficiary_gender,
            showAgeBeneficiary: data.beneficiary_age,
            beneficiary_age: data.beneficiary_age,
            beneficiary_grade: data.beneficiary_grade,
            beneficiary_calendar: data.beneficiary_calendar,

            beneficiary_name_2: data.beneficiary_name_2,
            beneficiary_birthdate_2: data.beneficiary_birthdate_2,
            beneficiary_gender_2: data.beneficiary_gender_2,
            showAgeBeneficiary_2: data.beneficiary_age_2,
            beneficiary_age_2: data.beneficiary_age_2,
            beneficiary_grade_2: data.beneficiary_grade_2,
            beneficiary_calendar_2: data.beneficiary_calendar_2,

            beneficiary_name_3: data.beneficiary_name_3,
            beneficiary_birthdate_3: data.beneficiary_birthdate_3,
            beneficiary_age_3: data.beneficiary_age_3,
            beneficiary_gender_3: data.beneficiary_gender_3,
            showAgeBeneficiary_3: data.beneficiary_age_3,
            beneficiary_grade_3: data.beneficiary_grade_3,
            beneficiary_calendar_3: data.beneficiary_calendar_3,
          });
          this.ageCalculatorBeneficiary();

          if(data.beneficiary_name_2 != ""){
            this.second_beneficiary = true;  
            this.ageCalculatorBeneficiary_2();          
          }else{
            this.second_beneficiary = false;  
          }
          if(data.beneficiary_name_3 != ""){
            this.third_beneficiary = true;  
            this.ageCalculatorBeneficiary_3();          
          }    else{
            this.third_beneficiary = false;  
          }  
        }
        else{
          this.toastr.warning('No se encontraron datos para el documento No. ' + this.form.value.principal_document_number, 'Buscar cotizaciones');
        }
      });
    }
    else{
          this.toastr.error('Digite un numero de documento para realizar la busqueda', 'Buscar cotizaciones');
    }    
  }

  searchRate(year: any ){    
      this._productRate.getProductRateByYear(year).subscribe((data: ProductRate) => {
        console.log(data)
        if(data){
          this.plan_4 = new Intl.NumberFormat('es-CO').format(data.plan_4);
          this.plan_6 = new Intl.NumberFormat('es-CO').format(data.plan_6);
          this.plan_8 = new Intl.NumberFormat('es-CO').format(data.plan_8);
          this.plan_10 = new Intl.NumberFormat('es-CO').format(data.plan_10);
          this.plan_12 = new Intl.NumberFormat('es-CO').format(data.plan_12);
          this.plan_13 = new Intl.NumberFormat('es-CO').format(data.plan_13);
          this.rate = data.rate_id;
        }
        else{
          this.toastr.warning('No se encontraron tasas para el año ' + year, 'Guardar cotización');
        }
      });     
  }

  searchRate2(year: any ){    
    this._productRate.getProductRateByYear(year).subscribe((data: ProductRate) => {
      if(data){
        this.plan_4_2 = new Intl.NumberFormat('es-CO').format(data.plan_4);
        this.plan_6_2 = new Intl.NumberFormat('es-CO').format(data.plan_6);
        this.plan_8_2 = new Intl.NumberFormat('es-CO').format(data.plan_8);
        this.plan_10_2 = new Intl.NumberFormat('es-CO').format(data.plan_10);
        this.plan_12_2 = new Intl.NumberFormat('es-CO').format(data.plan_12);
        this.plan_13_2 = new Intl.NumberFormat('es-CO').format(data.plan_13);
      }
      else{
        this.toastr.warning('No se encontraron tasas para el año ' + year, 'Guardar cotización');
      }
    });     
  }

  searchRate3(year: any ){    
  this._productRate.getProductRateByYear(year).subscribe((data: ProductRate) => {
    if(data){
      this.plan_4_3 = new Intl.NumberFormat('es-CO').format(data.plan_4);
      this.plan_6_3 = new Intl.NumberFormat('es-CO').format(data.plan_6);
      this.plan_8_3 = new Intl.NumberFormat('es-CO').format(data.plan_8);
      this.plan_10_3 = new Intl.NumberFormat('es-CO').format(data.plan_10);
      this.plan_12_3 = new Intl.NumberFormat('es-CO').format(data.plan_12);
      this.plan_13_3 = new Intl.NumberFormat('es-CO').format(data.plan_13);
    }
    else{
      this.toastr.warning('No se encontraron tasas para el año ' + year, 'Guardar cotización');
    }
  });     
  }

  ngOnInit(): void {
    this.getListDocumentTypes();

    const datePipe = new DatePipe('es-CO');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd')

    this.dayAsString = datePipe.transform(new Date(), 'd', 'es');
    this.monthAsString = datePipe.transform(new Date(), 'MMMM', 'es');
    this.yearAsString = datePipe.transform(new Date(), 'y', 'es');
     
  }

  getListDocumentTypes() {
    this.loading = true;
    this._documentTypeService.getListDocumentTypes().subscribe((data: DocumentType[]) => {
      this.listDocumentTypes = data;
      this.loading = false;
    });
  }

  ageCalculatorBeneficiary() {
    console.log(this.form.value.beneficiary_birthdate);
    if (this.form.value.beneficiary_birthdate) {
      const convertAge = new Date(this.form.value.beneficiary_birthdate);
      this.form.value.year_university_calculated = convertAge.getFullYear() + 18;
      this.year_university = this.form.value.year_university_calculated;
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.form.patchValue({beneficiary_age :  Math.floor((timeDiff / (1000 * 3600 * 24)) / 365)});
    }
    if (this.form.get('beneficiary_age')?.value < 4) {
      this.isDisabled = true;
      this.toastr.warning('El Beneficiario aun no cuenta con la edad requerida para estar en el colegio', 'Edad beneficiario');
    }
    else {
      this.isDisabled = false;
    }
    
    this.searchRate(this.year_university);
  }
  ageCalculatorBeneficiary_2() {
    if (this.form.value.beneficiary_birthdate_2) {
      const convertAge = new Date(this.form.value.beneficiary_birthdate_2);
      this.form.value.year_university_calculated_2 = convertAge.getFullYear() + 18;
      this.year_university_2 = this.form.value.year_university_calculated_2;
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.form.patchValue({beneficiary_age_2 :  Math.floor((timeDiff / (1000 * 3600 * 24)) / 365), disabled: true});
    }
    if (this.form.get('beneficiary_age_2')?.value < 4) {
      this.isDisabled_2 = true;
      this.toastr.warning('El segundo Beneficiario aun no cuenta con la edad requerida para estar en el colegio', 'Edad beneficiario');
    }
    else {
      this.isDisabled_2 = false;
    }
    this.searchRate2(this.year_university_2);
  }  
  ageCalculatorBeneficiary_3() {
    if (this.form.value.beneficiary_birthdate_3) {
      const convertAge = new Date(this.form.value.beneficiary_birthdate_3);
      this.form.value.year_university_calculated_3 = convertAge.getFullYear() + 18;
      this.year_university_3 = this.form.value.year_university_calculated_3;
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.form.patchValue({beneficiary_age_3 :  Math.floor((timeDiff / (1000 * 3600 * 24)) / 365)});
    }
    if (this.form.get('beneficiary_age_3')?.value < 4) {
      this.isDisabled_3 = true;
      this.toastr.warning('El Beneficiario aun no cuenta con la edad requerida para estar en el colegio', 'Edad beneficiario');
    }
    else {
      this.isDisabled_3 = false;
    }
    this.searchRate3(this.year_university_3);
  }

  getGrade(grade: string){
    if(grade == "0"){
      this.grade = "Transición";
    }
    if(grade == "1"){
      this.grade = "Primero";
    }
    if(grade == "2"){
      this.grade = "Segundo";
    }
    if(grade == "3"){
      this.grade = "Tercero";
    }
    if(grade == "4"){
      this.grade = "Cuaro";
    }
    if(grade == "5"){
      this.grade = "Quinto";
    }
    if(grade == "6"){
      this.grade = "Sexto";
    }
    if(grade == "7"){
      this.grade = "Septimo";
    }
    if(grade == "8"){
      this.grade = "Octavo";
    }
  }
  getGrade2(grade: string){
    if(grade == "0"){
      this.grade2 = "Transición";
    }
    if(grade == "1"){
      this.grade2 = "Primero";
    }
    if(grade == "2"){
      this.grade2 = "Segundo";
    }
    if(grade == "3"){
      this.grade2 = "Tercero";
    }
    if(grade == "4"){
      this.grade2 = "Cuaro";
    }
    if(grade == "5"){
      this.grade2 = "Quinto";
    }
    if(grade == "6"){
      this.grade2 = "Sexto";
    }
    if(grade == "7"){
      this.grade2 = "Septimo";
    }
    if(grade == "8"){
      this.grade2 = "Octavo";
    }
  }
  getGrade3(grade: string){
    if(grade == "0"){
      this.grade3 = "Transición";
    }
    if(grade == "1"){
      this.grade3 = "Primero";
    }
    if(grade == "2"){
      this.grade3 = "Segundo";
    }
    if(grade == "3"){
      this.grade3 = "Tercero";
    }
    if(grade == "4"){
      this.grade3 = "Cuaro";
    }
    if(grade == "5"){
      this.grade3 = "Quinto";
    }
    if(grade == "6"){
      this.grade3 = "Sexto";
    }
    if(grade == "7"){
      this.grade3 = "Septimo";
    }
    if(grade == "8"){
      this.grade3 = "Octavo";
    }
  }

  getCalendar(calendar: string){
    if(calendar == "0"){
      this.calendar = "Calendario A - 11 Grados";
    }
    if(calendar == "1"){
      this.calendar = "Calendario B - 11 Grados";
    }
    if(calendar == "2"){
      this.calendar = "Calendario B - 12 Grados";
    }
  }
  getCalendar2(calendar: string){
    if(calendar == "0"){
      this.calendar2 = "Calendario A - 11 Grados";
    }
    if(calendar == "1"){
      this.calendar2 = "Calendario B - 11 Grados";
    }
    if(calendar == "2"){
      this.calendar2 = "Calendario B - 12 Grados";
    }
  }
  getCalendar3(calendar: string){
    if(calendar == "0"){
      this.calendar3 = "Calendario A - 11 Grados";
    }
    if(calendar == "1"){
      this.calendar3 = "Calendario B - 11 Grados";
    }
    if(calendar == "2"){
      this.calendar3 = "Calendario B - 12 Grados";
    }
  }

  addProduct() {
    const insuranceQuote: InsuranceQuote = {
      principal_document_type: this.form.value.principal_document_type,
      principal_document_number: this.form.value.principal_document_number,
      principal_name: this.form.value.principal_name,
      principal_mail: this.form.value.principal_mail,
      principal_phone: Number(this.form.value.principal_phone),
      beneficiary_name: this.form.value.beneficiary_name,
      beneficiary_birthdate: this.form.value.beneficiary_birthdate,
      beneficiary_age: Number(this.form.value.beneficiary_age),
      beneficiary_gender: this.form.value.beneficiary_gender,
      beneficiary_grade: Number(this.form.value.beneficiary_grade),
      beneficiary_calendar: Number(this.form.value.beneficiary_calendar),
      beneficiary_start_university: this.year_university,

      beneficiary_name_2: this.form.value.beneficiary_name_2,
      beneficiary_birthdate_2: this.form.value.beneficiary_birthdate_2,
      beneficiary_age_2: Number(this.form.value.beneficiary_age_2),
      beneficiary_gender_2: this.form.value.beneficiary_gender_2,
      beneficiary_grade_2: Number(this.form.value.beneficiary_grade_2),
      beneficiary_calendar_2: Number(this.form.value.beneficiary_calendar_2),
      beneficiary_start_university_2: this.year_university_2,

      beneficiary_name_3: this.form.value.beneficiary_name_3,
      beneficiary_birthdate_3: this.form.value.beneficiary_birthdate_3,
      beneficiary_age_3: Number(this.form.value.beneficiary_age_3),
      beneficiary_gender_3: this.form.value.beneficiary_gender_3,
      beneficiary_grade_3: Number(this.form.value.beneficiary_grade_3),
      beneficiary_calendar_3: Number(this.form.value.beneficiary_calendar_3),
      beneficiary_start_university_3: this.year_university_3,
      state: 'saved',
      date: this.now
    };

    this._insuranceQuote.saveInsuranceQuotes(insuranceQuote).subscribe((data: InsuranceQuote) => {
      this.id_saved = data.id;
      this.toastr.info('La cotización fue guardada satisfactoriamente', 'Cotización guardada');
      
    })

  }

  addBeneficiary(){
    this.second_beneficiary = true;
  }
  delBeneficiary(){
    this.second_beneficiary = false;
    this.form.patchValue({
      beneficiary_name_2: null,
      beneficiary_birthdate_2: null,
      beneficiary_age_2: null,
      beneficiary_gender_2: null,
      showAgeBeneficiary_2: null,
      beneficiary_grade_2: null,
      beneficiary_calendar_2: null,
    });
  }
  addBeneficiary2(){
    this.third_beneficiary = true;
  }
  delBeneficiary2(){
    this.third_beneficiary = false;
    this.form.patchValue({
      beneficiary_name_3: null,
      beneficiary_birthdate_3: null,
      beneficiary_age_3: null,
      beneficiary_gender_3: null,
      showAgeBeneficiary_3: null,
      beneficiary_grade_3: null,
      beneficiary_calendar_3: null,
    });
  }

  validate_form(): boolean{
    console.log('beneficiary_birthdate .' + this.form.get('beneficiary_birthdate')?.value + '.');
    let isValidForm: boolean = true;
    let message: string = "";
    if( this.form.get('principal_document_type')?.value == 0 ){
      isValidForm = false;
      this.isDisabledDocumentType = true;
    }else {this.isDisabledDocumentType = false;}
    if(this.form.get('principal_name')?.value.replace(/\s+/g, '') == ''){
      isValidForm = false;
      this.isDisabledName = true;
    }else {this.isDisabledName = false;}
    if( this.form.get('principal_document_number')?.value.replace(/\s+/g, '')  == '') {
      isValidForm = false;
      this.isDisabledDocumentNumber = true;
    }else {this.isDisabledDocumentNumber = false;}
    if( this.form.get('principal_mail')?.value.replace(/\s+/g, '')  == '') {
      isValidForm = false;
      this.isDisabledEmail = true;
    }else {this.isDisabledEmail = false;}
    if( this.form.get('principal_phone')?.value.replace(/\s+/g, '')  == '') {
      isValidForm = false;
      this.isDisabledPhone = true;
    }else {this.isDisabledPhone = false;}


    if( this.form.get('beneficiary_name')?.value.replace(/\s+/g, '') == '' ){
      isValidForm = false;
      this.isDisabledBenName = true;
    }else {this.isDisabledBenName = false;}
    console.log('B:' + this.form.get('beneficiary_birthdate')?.value + '.');
    if( this.form.get('beneficiary_birthdate')?.value == ''){
      isValidForm = false;
      this.isDisabledBenBirth = true;
    }else {this.isDisabledBenBirth = false;}
    if( this.form.get('beneficiary_grade')?.value  == '-1') {
      isValidForm = false;
      this.isDisabledBenGrade = true;
    }else {this.isDisabledBenGrade = false;}
    if( this.form.get('beneficiary_calendar')?.value == '-1') {
      isValidForm = false;
      this.isDisabledBenCalendar = true;
    }else {this.isDisabledBenCalendar = false;}

    if(this.second_beneficiary){
      if( this.form.get('beneficiary_name_2')?.value.replace(/\s+/g, '')  == '') {
        isValidForm = false;
        this.isDisabledBenName2 = true;
      }else {this.isDisabledBenName2 = false;}
      if( this.form.get('beneficiary_birthdate_2')?.value == '') {
        isValidForm = false;
        this.isDisabledBenBirth2 = true;
      }else {this.isDisabledBenBirth2 = false;}

      if(!this.isDisabled_2){
        if( this.form.get('beneficiary_grade_2')?.value == '-1') {
          isValidForm = false;
          this.isDisabledBenGrade2 = true;
        }else {this.isDisabledBenGrade2 = false;}
        if( this.form.get('beneficiary_calendar_2')?.value == '-1') {
          isValidForm = false;
          this.isDisabledBenCalendar2 = true;
        }else {this.isDisabledBenCalendar2 = false;}
      }
    }    

    if(this.third_beneficiary){
      if( this.form.get('beneficiary_name_3')?.value.replace(/\s+/g, '') == '') {
        isValidForm = false;
        this.isDisabledBenName3 = true;
      }else {this.isDisabledBenName3 = false;}
      if( this.form.get('beneficiary_birthdate_3')?.value == '' ){
        isValidForm = false;
        this.isDisabledBenBirth3 = true;
      }else {this.isDisabledBenBirth3 = false;}

      if(!this.isDisabled_3){
        if( this.form.get('beneficiary_grade_3')?.value == '-1') {
          isValidForm = false;
          this.isDisabledBenGrade3 = true;
        }else {this.isDisabledBenGrade3 = false;}
        if( this.form.get('beneficiary_calendar_3')?.value == '-1') {
          isValidForm = false;
          this.isDisabledBenCalendar3 = true;
        }else {this.isDisabledBenCalendar3 = false;}
      }
      
    }
    if(!isValidForm){
      this.toastr.error('Debe diligenciar los campos obligatorios', 'Guardar cotizacion');
      return false;
    }
    else{
      return true;
    }
  }

  generateInsuranceQuote(){
    if(this.validate_form()){
      this.addProduct();
      this.searchPrincipalInfo();
      this.createPdf();
    }
  }

  createPdf() {
    this.getGrade(this.form.get('beneficiary_grade')?.value);
    this.getCalendar(this.form.get('beneficiary_calendar')?.value);
    this.id_saved = this.form.get('id')?.value;
    if(this.form.value.beneficiary_gender == "female"){
      if(this.form.get('beneficiary_age')?.value > 5){
        this.show_picture = pictures.girl;
      }
      else{
        this.show_picture = pictures.babygirl;
      }
      
    }
    else{
      if(this.form.get('beneficiary_age')?.value > 5){
        this.show_picture = pictures.boy;
      }
      else{
        this.show_picture = pictures.babyboy;
      }
    }

    const pdfHeader: any = {
      style: 'tableHeader',
      table: {
        widths: [3, '*', 210, '*'],
        body: [
          [' ',
            {
              image: pictures.logo2,
              width: 210
            }, ' ',
            [
              {
                table: {
                  heights: [8, 35],
                  body: [
                    [''],
                    [{
                      image: pictures.logo_orange,
                      width: 140
                    }] 
                  ]
                },
                layout: 'noBorders'
              }
            ]]
        ]
      },
      layout: 'noBorders'
    };
    const pdfSubheader: any = {
      style: 'subheader',
      table: {
        widths: [335, 221],
        heights: [1, 1, 7, 7], 
        body: [
          ['', ''],
          [{text:'Global Seguros, compañía líder especializada en seguros educativos, tiene la solución para que le garantices el pago de la universidad a tu hijo, sobrino o nieto', alignment: 'left',	italics: true, fontSize: 10} , 
           'Fecha Cotización: ' + this.dayAsString + ' de ' + this.monthAsString + ' de ' + this.yearAsString + '\nNo. Cotizacion: ' + this.id_saved],
          [{text:'Global Universidad Segura para el sector solidario.', alignment:'left', bold: true, fontSize:11}, ''],
          ['', ''],
        ]
      },
      layout: 'noBorders'
    };
    const pdfDefinition: any = {
      style: 'tablePicture',
      table: {
        widths: [18, '*', ],
        body: [
          [{
            table: {
              heights: [200, 200, 200],                  
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
            style: 'tableImages',
            table: {
              heights: [190, 140, 300],
              widths: [250, 300],
              body: [                    
                [
                  {
                    table:{
                      widths: [35, '*'],
                      body: [
                       
                       [ '',{
                          image: this.show_picture,
                          height: 175,
                          width: 175
                        }]
                      ]
                    },
                    layout: 'noBorders'
                  }
                  ,{
                  style: 'tableDataUser',
                  table: {
                    widths: ['*'],
                    heights: [27, '*', '*'],
                    body: [
                      [{text: ''}],
                      [{text: this.form.value.beneficiary_name, bold: true, color: '#444444', fontSize: 16}],
                      [{
                        table:{
                          body:[
                            [{text: 'Fecha de nacimiento: ' + this.form.value.beneficiary_birthdate, alignment: 'left'}],
                            [{text: 'Curso: ' +  this.grade, alignment: 'left'}],
                            [{text: 'Edad: ' +  this.form.get('beneficiary_age')?.value + ' años', alignment: 'left'}],
                            [{text: 'Calendario: ' + this.calendar, alignment: 'left'}],
                            [{text: 'Año esperado ingreso a la Universidad: ' + this.year_university, alignment: 'left'}],
                          ]
                        },
                        layout: 'noBorders'
                      }],                          
                    ]
                  },
                  layout: 'noBorders'
                }],
                [{
                  table: {
                    heights: [10, 50],
                    widths: [500],
                    body: [  
                      [{
                        style: 'tableDataUser',
                        table: {
                          widths: [2,400],
                          heights: [15, 1, 2],
                          body: [
                            ['',{text: 'INFORMACIÓN DEL ASEGURADO', color: '#444444', fontSize: 18, alignment: 'left'}],
                            ['',{text: '', fillColor:'#ffd300'}],
                            ['','']
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
                                widths: [2,190,160,100],
                                heights: [30,25],
                                body:[
                                  [{text:' '},
                                   {text: 'TOMADOR:\n' + this.form.value.principal_name,  alignment: 'left'}, 
                                   {text: 'EMAIL:\n' + this.form.value.principal_mail,  alignment: 'left'},
                                   {text: 'CELULAR:\n' + this.form.value.principal_phone,  alignment: 'left'}],
                                  [{text:' '},
                                   {text: 'Nota: Las primas de los productos corresponden a la fecha esperada de ingreso a la universidad del beneficiario (Fecha de Maduración) el cálculo de esta fecha debe ser confirmado por el tomador.', colSpan: 3, alignment: 'left',}]
                                ]
                              },
                              layout: 'noBorders'
                            }]
                          ]
                        },
                        layout: 'noBorders'
                      }],                    
                      
                    ]
                  },
                  layout: 'noBorders',
                  colSpan: 2
                }],
                [{
                  table: {
                    heights: [10, 50],
                    widths: [500],
                    body: [  
                      [{
                        style: 'tableDataUser',
                        table: {
                          widths: [2,400],
                          heights: [1, 15, 1, 2],
                          body: [
                            [' ',''],
                            ['',{text: 'COTIZACIÓN GLOBAL UNIVERSIDAD SEGURA', color: '#444444', fontSize: 18, alignment: 'left'}],
                            ['',{text: '', fillColor:'#ffd300'}],
                            ['','']
                          ]
                        },
                        layout: 'noBorders'
                      }],
                      [{
                        style: 'tableDataUser',
                        table: {
                          widths: ['*'],
                          heights: [35, 1, 4, 250, 20],
                          body: [
                            [{
                              style: 'tablePlan',
                              table:{
                                widths: [82,82,82,83,83,83],
                                heights: [33,25],
                                body:[
                                  [
                                   {text: '\nPrima Total Plan 4 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#005FBE', '#005FBE', '#ffffff', '#ffffff']},
                                   {text: '\nPrima Total Plan 6 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#ffffff', '#ffffff']},
                                   {text: '\nPrima Total Plan 8 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#ffffff', '#ffffff']},
                                   {text: '\nPrima Total Plan 10 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#ffffff', '#ffffff']},
                                   {text: '\nPrima Total Plan 12 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#ffffff', '#ffffff']},
                                   {text: '\nPrima Total Plan 13 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#005FBE', '#ffffff']}],
                                   [
                                   {text: '$ ' + this.plan_4, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                   {text: '$ ' + this.plan_6, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                   {text: '$ ' + this.plan_8, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                   {text: '$ ' + this.plan_10, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                   {text: '$ ' + this.plan_12, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                   {text: '$ ' + this.plan_13, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']}]                                      
                                ]
                              }
                            }],[{text:"Tarifa vigente a: " + this.rate + " *\n", alignment: 'left', fontSize: 8}]
                          ]
                        },
                        layout: 'noBorders'
                      }], 
                      [{
                        style: 'tableDataUser',
                        table: {
                          widths: [500],
                          heights: [35, 1, 4, 250, 20,20],
                          body: [
                            [{
                              style: 'tablePlans',
                              table:{
                                widths: [80,'*'],
                                heights: [60],
                                body:[
                                  [{
                                    table:{
                                      style: 'tableCobert',
                                      heights: [42,60, 20],
                                      widths: ['*'],
                                      body:[
                                        [{text:'', fillColor: '#005FBE', borderColor: ['#005FBE', '#005FBE', '#005FBE', '#005FBE']}],
                                        [{text: 'COBERTURA',  alignment: 'center', fillColor: '#005FBE', color: '#FFFFFF', bold: true, borderColor: ['#005FBE', '#005FBE', '#005FBE', '#005FBE']}],
                                      ]
                                    },
                                    //layout: 'noBorders'
                                  },
                                  {
                                    table:{
                                      style: 'tableCobert',
                                      heights: [108],
                                      widths: [452],
                                      body:[                                      
                                        [{text: '\n' +
                                        ' - Pago total o parcial de la matricula de acuerdo a los salarios mínimos adquiridos \n\n' + 
                                        ' - Cualquier carrera - cualquier universidad pregrado en Colombia \n\n' +
                                        ' - Especificaión períodos de cobertura: Cubre según los salarios mínimos ' +
                                        'adquiridos para el pago de cada matricula, máximo hasta diez (10) semestres académicos. ',  
                                          alignment: 'left',  borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']}],
                                      ]
                                    },
                                    //layout: 'noBorders'
                                  }]                                                                   
                                ]
                              },
                              layout: 'noBorders'
                            }],
                          ]
                        },
                        layout: 'noBorders'
                      }]
                    ]
                  },
                  layout: 'noBorders',
                  colSpan: 2
                }]                      
              ]
            },
            layout: 'noBorders'
          }
          ],              
        ]
      },
      layout: 'noBorders'
    };

    let pdfHeader2: any = {};    
    let pdfSubheader2: any = {};
    let pdfDefinition2: any = {};

    if(this.second_beneficiary){
      this.getGrade2(this.form.get('beneficiary_grade_2')?.value);
      this.getCalendar2(this.form.get('beneficiary_calendar_2')?.value);
      if(this.form.value.beneficiary_gender_2 == "female"){
        if(this.form.get('beneficiary_age_2')?.value > 5){
          this.show_picture2 = pictures.girl;
        }
        else{
          this.show_picture2 = pictures.babygirl;
        }        
      }
      else{
        if(this.form.get('beneficiary_age_2')?.value > 5){
          this.show_picture2 = pictures.boy;
        }
        else{
          this.show_picture2 = pictures.babyboy;
        }
      }

      pdfHeader2 = {
        style: 'tableHeader',
        pageBreak: 'before',
        table: {
          widths: [3, '*', 210, '*'],
          body: [
            [' ',
              {
                image: pictures.logo2,
                width: 210
              }, ' ',
              [
                {
                  table: {
                    heights: [8, 35],
                    body: [
                      [''],
                      [{
                        image: pictures.logo_orange,
                        width: 140
                      }] 
                    ]
                  },
                  layout: 'noBorders'
                }
              ]]
          ]
        },
        layout: 'noBorders'
      };

      pdfSubheader2 = {
        style: 'subheader',
        table: {
          widths: [335, 221],
          heights: [1, 1, 7, 7], 
          body: [
            ['', ''],
            [{text:'Global Seguros, compañía líder especializada en seguros educativos, tiene la solución para que le garantices el pago de la universidad a tu hijo, sobrino o nieto', alignment: 'left',	italics: true, fontSize: 10} , 
             'Fecha Cotización: ' + this.dayAsString + ' de ' + this.monthAsString + ' de ' + this.yearAsString + '\nNo. Cotizacion: ' + this.id_saved],
            [{text:'Global Universidad Segura para el sector solidario.', alignment:'left', bold: true, fontSize:11}, ''],
            ['', ''],
          ]
        },
        layout: 'noBorders'
      }; 

      pdfDefinition2 = {
        style: 'tablePicture',
        table: {
          widths: [18, '*', ],
          body: [
            [{
              table: {
                heights: [200, 200, 200],                  
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
              style: 'tableImages',
              table: {
                heights: [190, 140, 300],
                widths: [250, 300],
                body: [                    
                  [
                    {
                      table:{
                        widths: [35, '*'],
                        body: [
                         
                         [ '',{
                            image: this.show_picture2,
                            height: 175,
                            width: 175
                          }]
                        ]
                      },
                      layout: 'noBorders'
                    }
                    ,{
                    style: 'tableDataUser',
                    table: {
                      widths: ['*'],
                      heights: [27, '*', '*'],
                      body: [
                        [{text: ''}],
                        [{text: this.form.value.beneficiary_name_2, bold: true, color: '#444444', fontSize: 16}],
                        [{
                          table:{
                            body:[
                              [{text: 'Fecha de nacimiento: ' + this.form.value.beneficiary_birthdate_2, alignment: 'left'}],
                              [{text: 'Curso: ' +  this.grade2, alignment: 'left'}],
                              [{text: 'Edad: ' +  this.form.get('beneficiary_age_2')?.value + ' años', alignment: 'left'}],
                              [{text: 'Calendario: ' + this.calendar2, alignment: 'left'}],
                              [{text: 'Año esperado ingreso a la Universidad: ' + this.year_university_2, alignment: 'left'}],
                            ]
                          },
                          layout: 'noBorders'
                        }],                          
                      ]
                    },
                    layout: 'noBorders'
                  }],
                  [{
                    table: {
                      heights: [10, 50],
                      widths: [500],
                      body: [  
                        [{
                          style: 'tableDataUser',
                          table: {
                            widths: [2,400],
                            heights: [15, 1, 2],
                            body: [
                              ['',{text: 'INFORMACIÓN DEL ASEGURADO', color: '#444444', fontSize: 18, alignment: 'left'}],
                              ['',{text: '', fillColor:'#ffd300'}],
                              ['','']
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
                                  widths: [2,190,160,100],
                                  heights: [30,25],
                                  body:[
                                    [{text:' '},
                                     {text: 'TOMADOR:\n' + this.form.value.principal_name,  alignment: 'left'}, 
                                     {text: 'EMAIL:\n' + this.form.value.principal_mail,  alignment: 'left'},
                                     {text: 'CELULAR:\n' + this.form.value.principal_phone,  alignment: 'left'}],
                                    [{text:' '},
                                     {text: 'Nota: Las primas de los productos corresponden a la fecha esperada de ingreso a la universidad del beneficiario (Fecha de Maduración) el cálculo de esta fecha debe ser confirmado por el tomador.', colSpan: 3, alignment: 'left',}]
                                  ]
                                },
                                layout: 'noBorders'
                              }]
                            ]
                          },
                          layout: 'noBorders'
                        }],                    
                        
                      ]
                    },
                    layout: 'noBorders',
                    colSpan: 2
                  }],
                  [{
                    table: {
                      heights: [10, 50],
                      widths: [500],
                      body: [  
                        [{
                          style: 'tableDataUser',
                          table: {
                            widths: [2,400],
                            heights: [1, 15, 1, 2],
                            body: [
                              [' ',''],
                              ['',{text: 'COTIZACIÓN GLOBAL UNIVERSIDAD SEGURA', color: '#444444', fontSize: 18, alignment: 'left'}],
                              ['',{text: '', fillColor:'#ffd300'}],
                              ['','']
                            ]
                          },
                          layout: 'noBorders'
                        }],
                        [{
                          style: 'tableDataUser',
                          table: {
                            widths: ['*'],
                            heights: [35, 1, 4, 250, 20],
                            body: [
                              [{
                                style: 'tablePlan',
                                table:{
                                  widths: [82,82,82,83,83,83],
                                  heights: [33,25],
                                  body:[
                                    [
                                     {text: '\nPrima Total Plan 4 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#005FBE', '#005FBE', '#ffffff', '#ffffff']},
                                     {text: '\nPrima Total Plan 6 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#ffffff', '#ffffff']},
                                     {text: '\nPrima Total Plan 8 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#ffffff', '#ffffff']},
                                     {text: '\nPrima Total Plan 10 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#ffffff', '#ffffff']},
                                     {text: '\nPrima Total Plan 12 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#ffffff', '#ffffff']},
                                     {text: '\nPrima Total Plan 13 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#005FBE', '#ffffff']}],
                                     [
                                     {text: '$ ' + this.plan_4_2, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                     {text: '$ ' + this.plan_6_2, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                     {text: '$ ' + this.plan_8_2, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                     {text: '$ ' + this.plan_10_2, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                     {text: '$ ' + this.plan_12_2, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                     {text: '$ ' + this.plan_13_2, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']}]                                      
                                  ]
                                }
                              }],[{text:"Tarifa vigente a: " + this.rate + " *\n", alignment: 'left', fontSize: 8}]
                            ]
                          },
                          layout: 'noBorders'
                        }], 
                        [{
                          style: 'tableDataUser',
                          table: {
                            widths: [500],
                            heights: [35, 1, 4, 250, 20,20],
                            body: [
                              [{
                                style: 'tablePlans',
                                table:{
                                  widths: [80,'*'],
                                  heights: [60],
                                  body:[
                                    [{
                                      table:{
                                        style: 'tableCobert',
                                        heights: [42,60, 20],
                                        widths: ['*'],
                                        body:[
                                          [{text:'', fillColor: '#005FBE', borderColor: ['#005FBE', '#005FBE', '#005FBE', '#005FBE']}],
                                          [{text: 'COBERTURA',  alignment: 'center', fillColor: '#005FBE', color: '#FFFFFF', bold: true, borderColor: ['#005FBE', '#005FBE', '#005FBE', '#005FBE']}],
                                        ]
                                      },
                                      //layout: 'noBorders'
                                    },
                                    {
                                      table:{
                                        style: 'tableCobert',
                                        heights: [108],
                                        widths: [452],
                                        body:[                                      
                                          [{text: '\n' +
                                          ' - Pago total o parcial de la matricula de acuerdo a los salarios mínimos adquiridos \n\n' + 
                                          ' - Cualquier carrera - cualquier universidad pregrado en Colombia \n\n' +
                                          ' - Especificaión períodos de cobertura: Cubre según los salarios mínimos ' +
                                          'adquiridos para el pago de cada matricula, máximo hasta diez (10) semestres académicos. ',  
                                            alignment: 'left',  borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']}],
                                        ]
                                      },
                                      //layout: 'noBorders'
                                    }]                                                                   
                                  ]
                                },
                                layout: 'noBorders'
                              }],
                            ]
                          },
                          layout: 'noBorders'
                        }]
                      ]
                    },
                    layout: 'noBorders',
                    colSpan: 2
                  }]                      
                ]
              },
              layout: 'noBorders'
            }
            ],              
          ]
        },
        layout: 'noBorders'
      };
    }

    let pdfHeader3: any = {};    
    let pdfSubheader3: any = {};
    let pdfDefinition3: any = {};

    if(this.third_beneficiary){
      this.getGrade3(this.form.get('beneficiary_grade_3')?.value);
      this.getCalendar3(this.form.get('beneficiary_calendar_3')?.value);
      if(this.form.value.beneficiary_gender_3 == "female"){
        if(this.form.get('beneficiary_age_3')?.value > 5){
          this.show_picture3 = pictures.girl;
        }
        else{
          this.show_picture3 = pictures.babygirl;
        }        
      }
      else{
        if(this.form.get('beneficiary_age_3')?.value > 5){
          this.show_picture3 = pictures.boy;
        }
        else{
          this.show_picture3 = pictures.babyboy;
        }
      }

      pdfHeader3 = {
        style: 'tableHeader',
        pageBreak: 'before',
        table: {
          widths: [3, '*', 210, '*'],
          body: [
            [' ',
              {
                image: pictures.logo2,
                width: 210
              }, ' ',
              [
                {
                  table: {
                    heights: [8, 35],
                    body: [
                      [''],
                      [{
                        image: pictures.logo_orange,
                        width: 140
                      }] 
                    ]
                  },
                  layout: 'noBorders'
                }
              ]]
          ]
        },
        layout: 'noBorders'
      };

      pdfSubheader3 = {
        style: 'subheader',
        table: {
          widths: [335, 221],
          heights: [1, 1, 7, 7], 
          body: [
            ['', ''],
            [{text:'Global Seguros, compañía líder especializada en seguros educativos, tiene la solución para que le garantices el pago de la universidad a tu hijo, sobrino o nieto', alignment: 'left',	italics: true, fontSize: 10} , 
             'Fecha Cotización: ' + this.dayAsString + ' de ' + this.monthAsString + ' de ' + this.yearAsString + '\nNo. Cotizacion: ' + this.id_saved],
            [{text:'Global Universidad Segura para el sector solidario.', alignment:'left', bold: true, fontSize:11}, ''],
            ['', ''],
          ]
        },
        layout: 'noBorders'
      }; 

      pdfDefinition3 = {
        style: 'tablePicture',
        table: {
          widths: [18, '*', ],
          body: [
            [{
              table: {
                heights: [200, 200, 200],                  
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
              style: 'tableImages',
              table: {
                heights: [190, 140, 300],
                widths: [250, 300],
                body: [                    
                  [
                    {
                      table:{
                        widths: [35, '*'],
                        body: [
                         
                         [ '',{
                            image: this.show_picture3,
                            height: 175,
                            width: 175
                          }]
                        ]
                      },
                      layout: 'noBorders'
                    }
                    ,{
                    style: 'tableDataUser',
                    table: {
                      widths: ['*'],
                      heights: [27, '*', '*'],
                      body: [
                        [{text: ''}],
                        [{text: this.form.value.beneficiary_name_3, bold: true, color: '#444444', fontSize: 16}],
                        [{
                          table:{
                            body:[
                              [{text: 'Fecha de nacimiento: ' + this.form.value.beneficiary_birthdate_3, alignment: 'left'}],
                              [{text: 'Curso: ' +  this.grade3, alignment: 'left'}],
                              [{text: 'Edad: ' +  this.form.get('beneficiary_age_3')?.value + ' años', alignment: 'left'}],
                              [{text: 'Calendario: ' + this.calendar3, alignment: 'left'}],
                              [{text: 'Año esperado ingreso a la Universidad: ' + this.year_university_3, alignment: 'left'}],
                            ]
                          },
                          layout: 'noBorders'
                        }],                          
                      ]
                    },
                    layout: 'noBorders'
                  }],
                  [{
                    table: {
                      heights: [10, 50],
                      widths: [500],
                      body: [  
                        [{
                          style: 'tableDataUser',
                          table: {
                            widths: [2,400],
                            heights: [15, 1, 2],
                            body: [
                              ['',{text: 'INFORMACIÓN DEL ASEGURADO', color: '#444444', fontSize: 18, alignment: 'left'}],
                              ['',{text: '', fillColor:'#ffd300'}],
                              ['','']
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
                                  widths: [2,190,160,100],
                                  heights: [30,25],
                                  body:[
                                    [{text:' '},
                                     {text: 'TOMADOR:\n' + this.form.value.principal_name,  alignment: 'left'}, 
                                     {text: 'EMAIL:\n' + this.form.value.principal_mail,  alignment: 'left'},
                                     {text: 'CELULAR:\n' + this.form.value.principal_phone,  alignment: 'left'}],
                                    [{text:' '},
                                     {text: 'Nota: Las primas de los productos corresponden a la fecha esperada de ingreso a la universidad del beneficiario (Fecha de Maduración) el cálculo de esta fecha debe ser confirmado por el tomador.', colSpan: 3, alignment: 'left',}]
                                  ]
                                },
                                layout: 'noBorders'
                              }]
                            ]
                          },
                          layout: 'noBorders'
                        }],                    
                        
                      ]
                    },
                    layout: 'noBorders',
                    colSpan: 2
                  }],
                  [{
                    table: {
                      heights: [10, 50],
                      widths: [500],
                      body: [  
                        [{
                          style: 'tableDataUser',
                          table: {
                            widths: [2,400],
                            heights: [1, 15, 1, 2],
                            body: [
                              [' ',''],
                              ['',{text: 'COTIZACIÓN GLOBAL UNIVERSIDAD SEGURA', color: '#444444', fontSize: 18, alignment: 'left'}],
                              ['',{text: '', fillColor:'#ffd300'}],
                              ['','']
                            ]
                          },
                          layout: 'noBorders'
                        }],
                        [{
                          style: 'tableDataUser',
                          table: {
                            widths: ['*'],
                            heights: [35, 1, 4, 250, 20],
                            body: [
                              [{
                                style: 'tablePlan',
                                table:{
                                  widths: [82,82,82,83,83,83],
                                  heights: [33,25],
                                  body:[
                                    [
                                     {text: '\nPrima Total Plan 4 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#005FBE', '#005FBE', '#ffffff', '#ffffff']},
                                     {text: '\nPrima Total Plan 6 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#ffffff', '#ffffff']},
                                     {text: '\nPrima Total Plan 8 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#ffffff', '#ffffff']},
                                     {text: '\nPrima Total Plan 10 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#ffffff', '#ffffff']},
                                     {text: '\nPrima Total Plan 12 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#ffffff', '#ffffff']},
                                     {text: '\nPrima Total Plan 13 SMMLV', alignment: 'center', fillColor:'#005FBE', color:'#ffffff',fontSize: 9,  borderColor: ['#ffffff', '#005FBE', '#005FBE', '#ffffff']}],
                                     [
                                     {text: '$ ' + this.plan_4_3, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                     {text: '$ ' + this.plan_6_3, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                     {text: '$ ' + this.plan_8_3, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                     {text: '$ ' + this.plan_10_3, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                     {text: '$ ' + this.plan_12_3, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']},
                                     {text: '$ ' + this.plan_13_3, alignment: 'center',fontSize: 10, borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']}]                                      
                                  ]
                                }
                              }],[{text:"Tarifa vigente a: " + this.rate + " *\n", alignment: 'left', fontSize: 8}]
                            ]
                          },
                          layout: 'noBorders'
                        }], 
                        [{
                          style: 'tableDataUser',
                          table: {
                            widths: [500],
                            heights: [35, 1, 4, 250, 20,20],
                            body: [
                              [{
                                style: 'tablePlans',
                                table:{
                                  widths: [80,'*'],
                                  heights: [60],
                                  body:[
                                    [{
                                      table:{
                                        style: 'tableCobert',
                                        heights: [42,60, 20],
                                        widths: ['*'],
                                        body:[
                                          [{text:'', fillColor: '#005FBE', borderColor: ['#005FBE', '#005FBE', '#005FBE', '#005FBE']}],
                                          [{text: 'COBERTURA',  alignment: 'center', fillColor: '#005FBE', color: '#FFFFFF', bold: true, borderColor: ['#005FBE', '#005FBE', '#005FBE', '#005FBE']}],
                                        ]
                                      },
                                      //layout: 'noBorders'
                                    },
                                    {
                                      table:{
                                        style: 'tableCobert',
                                        heights: [108],
                                        widths: [452],
                                        body:[                                      
                                          [{text: '\n' +
                                          ' - Pago total o parcial de la matricula de acuerdo a los salarios mínimos adquiridos \n\n' + 
                                          ' - Cualquier carrera - cualquier universidad pregrado en Colombia \n\n' +
                                          ' - Especificaión períodos de cobertura: Cubre según los salarios mínimos ' +
                                          'adquiridos para el pago de cada matricula, máximo hasta diez (10) semestres académicos. ',  
                                            alignment: 'left',  borderColor: ['#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0']}],
                                        ]
                                      },
                                      //layout: 'noBorders'
                                    }]                                                                   
                                  ]
                                },
                                layout: 'noBorders'
                              }],
                            ]
                          },
                          layout: 'noBorders'
                        }]
                      ]
                    },
                    layout: 'noBorders',
                    colSpan: 2
                  }]                      
                ]
              },
              layout: 'noBorders'
            }
            ],              
          ]
        },
        layout: 'noBorders'
      };
    }    

    // PDF COMPLETO

    const pdfTotal: any = {
      footer():any{
        return [
          {
            style: 'tableFooter',
            table: {
              widths: [5, '*', 5],
              heights: [8,'45', 5],
              body: [
                ['','',''],
                [' ',
                  {
                    text: "Disfruta la tranquilidad de tener asegurado el futuro educativo de tus hijos y selecciona el plan que más se ajuste a tu capacidad económica con beneficios en tasa y plazo.\n"
                  }, ' ',
                ],
                ['','',''],
              ]
            },
            layout: 'noBorders'
          }
        ]
      },      
      content: [
        pdfHeader,
        pdfSubheader,
        pdfDefinition,
        pdfHeader2,
        pdfSubheader2,
        pdfDefinition2,
        pdfHeader3,
        pdfSubheader3,
        pdfDefinition3
              
      ],
      styles: {
        tableImages:{
          fillColor: '#FFFFFF',
          alignment: 'left'
        },
        tableHeader: {
          bold: true,
          fontSize: 18,
          color: 'white',
          fillColor: '#00328C',
          alignment: 'center',
          margin: [-45, -40, -45, 0],
        },
        tableFooter:{
          bold: true,
          fontSize: 10,
          italics: true,
          color: 'white',
          fillColor: '#00328C',
          alignment: 'center',
          margin: [0,-10],
        },
        subheader: {
          fontSize: 9,
          color: '#444444',
          alignment: 'right',
          margin: [-23, 0, -27, 0]
        },
        tablePicture: {
          alignment: 'center',
          margin: [-35, 0, -29, 0]
        },
        tableResume: {
          bold: true,
          fontSize: 18,
          color: '#344444433333',
          alignment: 'left',
        },
        tableDataUser: {
          color: '#444444',
          fontSize: 10,
        },
        tableDataUserDetail: {
          color: '#444444', 
          fontSize: 10,
        },
        tableCobert:{
          fillColor: '#017BC4', 
          borderColor: ['#017BC4', '#017BC4', '#017BC4', '#017BC4']
        },
        tablePlan:{
          borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff']
        }
      },
      defaultStyle: {
        font:'Roboto'
      }
    };

    const pdf = pdfMake.createPdf(pdfTotal);
    pdf.open();
  }

}
