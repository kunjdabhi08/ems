using System.ComponentModel.DataAnnotations;

namespace employee_management.Models
{
    public class Designation
    {
        [Key]
        public int DesignationId { get; set; }
        public string Name { get; set; }

        public bool isDeleted { get; set; }
    }
}
