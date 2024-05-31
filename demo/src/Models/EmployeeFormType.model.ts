import { Form, FormControl } from "@angular/forms"


export type EmployeeFormType = {
    // name: new FormControl('', [Validators.required, Validators.min(6), Validators.max(20)]),
    //   email: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    //   phone: new FormControl('',[Validators.required, Validators.pattern(/\d{10}$/)]),
    //   designation: new FormControl('',Validators.required),
    //   id: new FormControl(0)


    name: FormControl<string | null>,
    email: FormControl<string| null>,
    phone: FormControl<string| null>,
    designation: FormControl<number| null>,
    id: FormControl<number| null>

}