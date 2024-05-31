using employee_management.Models;
using employee_management.Models.DTO;

namespace employee_management.Interfaces
{
    public interface IDesignationRepository
    {
        public List<Designation> GetAllDesignation();

        public Designation? GetDesignationById(int id);

        public Designation AddDesignation(DesignationDTO d);


        public Designation? UpdateDesignation(DesignationDTO d);


        public Designation? DeleteDesignation(int id);
    }
}
