using employee_management.Interfaces;
using employee_management.Models;
using employee_management.Models.DTO;
using Employee_Management.Data;
using Microsoft.AspNetCore.Mvc;

namespace employee_management.Controllers
{
    [Route("api/designation")]
    [ApiController]
    public class DesignationController : ControllerBase
    {
        private readonly IDesignationRepository _des;
        public DesignationController(IDesignationRepository des)
        {
            _des = des;
        }

        [HttpGet(Name = "GetDesignation")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<ResponseDTO<List<Designation>>> Get()
        {
            ResponseDTO<List<Designation>> response = new ResponseDTO<List<Designation>>();
            try
            {
                List<Designation> des = _des.GetAllDesignation();
                response.Success = true;
                response.Data = des;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpGet("{id:int}", Name = "GetDesignationById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ResponseDTO<Designation>> Get(int id)
        {
            ResponseDTO<Designation> response = new ResponseDTO<Designation>();
            try
            {
                if (id == 0)
                {
                    throw new Exception("Something went wrong");
                }
                Designation? des = _des.GetDesignationById(id);
                if (des == null)
                {
                    response.Success = false;
                    response.Message = "Designation Does Not Exist";

                    return NotFound(response);
                }
                response.Success = true;
                response.Data = des;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;   
                response.Message = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpPost(Name = "AddDesignation")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ResponseDTO<Designation>> Add(DesignationDTO d)
        {
            ResponseDTO<Designation> response = new ResponseDTO<Designation>();
            try
            {
                if(d == null)
                {
                    throw new Exception("Something went wrong");
                }
                Designation des = _des.AddDesignation(d);
                response.Success = true;
                response.Data = des;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }

        }

        [HttpPut(Name = "UpdateDesignation")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ResponseDTO<NoContentResult>> Update(DesignationDTO d)
        {
            ResponseDTO<Designation> response = new ResponseDTO<Designation>();
            try
            {
                if (d.Id == 0)
                {
                    throw new Exception("Something went wrong");
                }
                Designation? des = _des.UpdateDesignation(d);
                if (des == null)
                {
                    response.Success = false;
                    response.Message = "Designation Does Not Exist";
                    return NotFound();
                }
                response.Data = des;
                return Ok(response);

            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }
        }


        [HttpDelete("{id:int}", Name = "DeleteDesignation")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(int id)
        {
            ResponseDTO<Designation> response = new ResponseDTO<Designation>();
            try
            {
                if (id == 0)
                {
                    throw new Exception("Something went wrong");
                }
                Designation? d = _des.DeleteDesignation(id);
                if (d == null)
                {
                    response.Success = false;
                    response.Message = "Designation Does Not Exist";
                    return NotFound();
                }
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
