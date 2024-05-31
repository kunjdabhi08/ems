using System.ComponentModel.DataAnnotations;

namespace employee_management.Models.DTO
{
    public class DesignationDTO
    {
        public int? Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
