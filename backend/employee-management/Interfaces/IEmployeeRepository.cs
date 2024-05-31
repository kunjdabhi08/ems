using employee_management.Models;
using employee_management.Models.DTO;

namespace employee_management.Interfaces
{
    public interface IEmployeeRepository
    {

        public List<EmployeeDTO> GetEmployees();

        public bool EmployeeExists(string email);

        public Employee AddEmployee(EmployeeDTO emp);

        public Employee? GetEmployeeById(int id);

        public Employee? UpdateEmployee(EmployeeDTO emp);

        public Employee? DeleteEmployee(int id);
    }
}
