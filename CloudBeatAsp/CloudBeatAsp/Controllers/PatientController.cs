using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudBeatAsp.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CloudBeatAsp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly DataContext _context;
        public PatientController(DataContext context)
        {
                        _context = context;
        }
        [HttpGet]
        [Route("Patients")]
        public IActionResult GetPatient(){
            var patients = _context.Patients.ToList();
            return Ok(patients);
        }

    }
}


