using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPIEmployee.Models;

namespace WebAPIEmployee.Data
{
    public class UserDBContext : DbContext
    {
        public UserDBContext(DbContextOptions<UserDBContext>options):base(options)
        {

        }

        public DbSet<UserModel> userModels { get; set; }
        public DbSet<EmployeeModel> employeerModels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().ToTable("User");
            modelBuilder.Entity<EmployeeModel>().ToTable("Employee");
        }
    }
}
