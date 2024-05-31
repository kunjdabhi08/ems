using employee_management.Interfaces;
using employee_management.Models;
using employee_management.Models.DTO;
using Employee_Management.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using System.Reflection.Metadata.Ecma335;

namespace employee_management.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
       
        private readonly IEmployeeRepository _employee;
        public EmployeeController(IEmployeeRepository emp)
        {
            
            _employee = emp;
        }

        [HttpGet(Name = "GetAllEmployees")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<ResponseDTO<EmployeeDTO>> Get()
        {
            ResponseDTO<List<EmployeeDTO>> response = new ResponseDTO<List<EmployeeDTO>>();
            try
            {
                List<EmployeeDTO> employees = _employee.GetEmployees();
                if (employees != null)
                {
                    response.Success = true;
                    response.Data = employees;
                    return Ok(response);
                }
                else
                {
                    throw new Exception("Something went wrong");
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpGet("{id:int}", Name = "GetEmployeeById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ResponseDTO<Employee>> Get(int id)
        {
            ResponseDTO<Employee> response = new ResponseDTO<Employee>();
            try
            {
                if (id == 0)
                {
                    throw new Exception("Something went wrong");
                }
                Employee? e = _employee.GetEmployeeById(id);
                if (e == null)
                {
                    response.Success = false;
                    response.Message = "Employee Does Not Exist";
                    return NotFound(response);
                }

                response.Success = true;
                response.Data = e;

                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success= false;
                response.Message = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpPost(Name = "AddEmployee")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ResponseDTO<Employee>> Add(EmployeeDTO emp)
        {
            ResponseDTO<Employee> response = new ResponseDTO<Employee>();
            try
            {
                if (emp == null)
                {
                    throw new Exception("Something went wrong");
                }
                var exist = _employee.EmployeeExists(emp.Email);
                if (exist == true)
                {
                    throw new Exception("Something went wrong");
                }

                Employee employee = _employee.AddEmployee(emp);
                response.Success = true;
                response.Data = employee;
                return Ok(response);

            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }

        }

        [HttpPut(Name = "UpdateEmployee")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ResponseDTO<Employee>> Update(EmployeeDTO emp)
        {
            ResponseDTO<Employee> response = new ResponseDTO<Employee>();
            try
            {
                if (emp.id == 0)
                {
                    throw new Exception("Somethiwent Wrong");
                }

                Employee? e = _employee.UpdateEmployee(emp);
                if (e == null)
                {
                    response.Success=false;
                    response.Message = "Employee Does Not Exist";

                    return NotFound(response);
                }

                response.Success = true;
                response.Data = e;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message= ex.Message;
                return BadRequest(response);
            }
        }


        [HttpDelete("{id:int}", Name = "DeleteEmployee")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ResponseDTO<NoContentResult>> Delete(int id)
        {
            ResponseDTO<Employee> response = new ResponseDTO<Employee>();
            try
            {
                if (id == 0)
                {
                    throw new Exception("Something Went Wrong");
                }
                Employee? e = _employee.DeleteEmployee(id);
                if (e == null)
                {
                    response.Success=false;
                    response.Message = "Employee Does Not Exist";
                    return NotFound(response);
                }

                response.Success = true;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }
        }



    }
}
