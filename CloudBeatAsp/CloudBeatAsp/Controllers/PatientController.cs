using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudBeatAsp.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        
        public IActionResult GetPatient(){
            var patients = _context.Patients.FromSqlRaw("select p.*, count(e.PatientId) as NumberofEvents from dbo.Patients as p left join dbo.Events as e on p.PatientId = e.PatientId  Group By p.DateOfBirth,p.DeviceSerialNumber,p.Name,p.PatientId,p.StudyEndTime,p.StudyStartTime Order By p.StudyStartTime, count(e.PatientId) desc;");
            return Ok(patients);
        }

    }
}


