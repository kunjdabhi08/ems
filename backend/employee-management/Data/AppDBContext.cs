using System;
using employee_management.Models;
using System.Collections.Generic;
using employee_management.Models;
using Microsoft.EntityFrameworkCore;

namespace Employee_Management.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Designation> Designations { get; set; }



      
    }
}
