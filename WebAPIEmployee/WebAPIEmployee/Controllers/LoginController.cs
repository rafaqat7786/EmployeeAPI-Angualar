using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class LoginController : ControllerBase
    {
        private readonly UserDBContext _context;
        public LoginController(UserDBContext userDBContext)
        {
            _context = userDBContext;
        }

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var userdetails = _context.userModels.AsQueryable();
            return Ok(userdetails);
        }

        [HttpPost("signup")]
        public IActionResult SignUp(UserModel userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.userModels.Add(userObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Sign Up Successfully"
                });
            }
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserModel userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }
            else
            {
                var user = _context.userModels.Where(a =>
                a.UserName == userObj.UserName
                    && a.Password == userObj.Password).FirstOrDefault();
                if(user!= null)
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Logged In Successfully"
                        //UserData = userObj.FullName
                    });
                }
                else
                {
                    return NotFound(new
                    {
                        StatusCode = 404,
                        Message = "User Not Found"
                    });
                }
            }
        }
    }
}
