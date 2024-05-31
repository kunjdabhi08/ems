using System.ComponentModel.DataAnnotations.Schema;

namespace employee_management.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime LastModifiedDate { get; set;}

        public string Phone {  get; set; }

        public Designation Designation { get; set; }

        [ForeignKey("Designation")]
        public int DesignationId {  get; set; }

        public bool isDeleted { get; set; }
    }
}
