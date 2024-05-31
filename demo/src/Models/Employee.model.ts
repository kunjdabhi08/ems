
export interface Employee {
    id: number,
    name: string,
    email: string;
    phone: string;
    designationId: number | undefined;
    designationName?: string;
  }