using employee_management.Interfaces;
using employee_management.Models;
using employee_management.Models.DTO;
using Employee_Management.Data;

namespace employee_management.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDBContext _dbContext;
        public EmployeeRepository(AppDBContext dbContext)
        {
            _dbContext =    dbContext;
        }

        public List<EmployeeDTO> GetEmployees()
        {
            var employees = _dbContext.Employees.Where(d => d.isDeleted == false).Select(x => new EmployeeDTO
            {
                id = x.Id,
                Name = x.Name,
                designationName = x.Designation.Name,
                Email = x.Email,
                Phone = x.Phone,

            }).ToList();
            return employees;
        }

        public bool EmployeeExists(string email)
        {

            var exist = _dbContext.Employees.Any(x => x.Email == email && x.isDeleted == false);
            return exist;


        }

        public Employee? GetEmployeeById(int id)
        {
            Employee? e = _dbContext.Employees.FirstOrDefault(x => x.Id == id && x.isDeleted == false);

            return e;
        }

        public Employee AddEmployee(EmployeeDTO emp)
        {
            Employee e = new Employee
            {
                Name = emp.Name,
                Email = emp.Email,
                CreatedDate = DateTime.UtcNow,
                LastModifiedDate = DateTime.UtcNow,
                Phone = emp.Phone,
                DesignationId = emp.designation
            };
            _dbContext.Employees.Add(e);
            _dbContext.SaveChanges();

            return e;
        }

        public Employee? UpdateEmployee(EmployeeDTO emp)
        {
            Employee? e = _dbContext.Employees.FirstOrDefault(x => x.Id == emp.id && x.isDeleted == false);
            if (e != null)
            {
                e.Phone = emp.Phone;
                e.Name = emp.Name;
                e.Email = emp.Email;
                e.LastModifiedDate = DateTime.UtcNow;
                e.DesignationId = emp.designation;


                _dbContext.Employees.Update(e);
                _dbContext.SaveChanges();
            }

            return e;
        }


        public Employee? DeleteEmployee(int id)
        {
            Employee? e = _dbContext.Employees.FirstOrDefault(x => x.Id == id && x.isDeleted == false);
            if (e != null)
            {
                e.isDeleted = true;

                _dbContext.Employees.Update(e);
                _dbContext.SaveChanges();
            }
            return e;
        }


    }
}
