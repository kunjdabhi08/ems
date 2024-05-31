using employee_management.Interfaces;
using employee_management.Models;
using employee_management.Models.DTO;
using Employee_Management.Data;

namespace employee_management.Repository
{
    public class DesignationRepository : IDesignationRepository
    {
        private readonly AppDBContext _dbContext;
        public DesignationRepository(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }


        public List<Designation> GetAllDesignation()
        {
            var des = _dbContext.Designations.Where(d => d.isDeleted == false).ToList();
            return des;
        }

        public Designation? GetDesignationById(int id)
        {
            Designation? des = _dbContext.Designations.FirstOrDefault(x => x.DesignationId == id && x.isDeleted == false);

            return des;
        }


        public Designation AddDesignation(DesignationDTO d)
        {
            Designation des = new Designation
            {
                Name = d.Name,
            };

            _dbContext.Designations.Add(des);
            _dbContext.SaveChanges();

            return des;
        }

        public Designation? UpdateDesignation(DesignationDTO d)
        {
            Designation? des = _dbContext.Designations.FirstOrDefault(x => x.DesignationId == d.Id && x.isDeleted == false);

            if (des != null)
            {
                des.Name = d.Name;

                _dbContext.Designations.Update(des);
                _dbContext.SaveChanges();
            }

            return des;


        }

        public Designation? DeleteDesignation(int id)
        {
            bool inUse = _dbContext.Employees.Any(x => x.DesignationId == id && x.isDeleted == false);
            if (inUse)
            {
                throw new Exception("Designation cannot be deleted");
            }

            Designation? e = _dbContext.Designations.FirstOrDefault(x => x.DesignationId == id);

            if (e != null)
            {
                e.isDeleted = true;
                _dbContext.Designations.Update(e);
                _dbContext.SaveChanges();
            }

            return e;

        }

    }
}
