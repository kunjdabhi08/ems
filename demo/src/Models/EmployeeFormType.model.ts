import { Form, FormControl } from "@angular/forms"


export type EmployeeFormType = {
    name: FormControl<string>,
    email: FormControl<string>,
    phone: FormControl<string>,
    designation: FormControl<number>,
    id: FormControl<number>

}