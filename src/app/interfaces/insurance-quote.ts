export interface InsuranceQuote {
    id?: number;
    principal_document_type: number;
    principal_document_number:string;
    principal_name: string;
    principal_mail: string;
    principal_phone: number;  
      
    beneficiary_name: string;
    beneficiary_birthdate:string;
    beneficiary_age:number;
    beneficiary_gender: string;
    beneficiary_grade: number;
    beneficiary_calendar: number;
    beneficiary_start_university: number;

    beneficiary_name_2?: string;
    beneficiary_birthdate_2?:string;
    beneficiary_age_2?:number;
    beneficiary_gender_2?: string;
    beneficiary_grade_2?: number;
    beneficiary_calendar_2?: number;
    beneficiary_start_university_2?: number;

    beneficiary_name_3?: string;
    beneficiary_birthdate_3?:string;
    beneficiary_age_3?:number;
    beneficiary_gender_3?: string;
    beneficiary_grade_3?: number;
    beneficiary_calendar_3?: number;
    beneficiary_start_university_3?: number;

    state: string;
    date: string;
}