using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIEmployee.Data;
using WebAPIEmployee.Models;

namespace WebAPIEmployee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly UserDBContext _context;
        public EmployeeController(UserDBContext userDBContext)
        {
            _context = userDBContext;
        }

        [HttpPost("add_employee")]
        public IActionResult AddEmployee([FromBody] EmployeeModel employeeObj)
        {
            if(employeeObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.employeerModels.Add(employeeObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Employee Added Successfully"
                });
            }
        }

        [HttpPut("update_employee")]

        public IActionResult UpdateEmployee([FromBody] EmployeeModel employeeObj)
        {
            if (employeeObj == null)
            {
                return BadRequest();
            }
            var user = _context.employeerModels.AsNoTracking().FirstOrDefault(x => x.Id == employeeObj.Id);
            if(user == null)
            {
                return Ok(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                _context.Entry(employeeObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Employee Updated Successfully"
                });
            }
        }

        [HttpDelete("delete_employee/{id}")]

        public IActionResult DeleteEmployee(int id)
        {
            var user = _context.employeerModels.Find(id);
            if(user == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                _context.Remove(user);
                _context.SaveChanges();

                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Employee Deleted Successfully"
                });
            }
        }

        [HttpGet("get_all_employees")]

        public IActionResult GetAllEmployee()
        {
            var employee = _context.employeerModels.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                EmployeeDetails= employee
               
            });
        }

        [HttpGet("get_employee/id")]

        public IActionResult Getemployee(int id)
        {
            var employee = _context.employeerModels.Find(id);
            if(employee == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                return Ok(new
                {
                    StatusCode = 200,
                    EmployeeDetails = employee
                });
            }
        }

    }
}
