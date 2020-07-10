using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudBeatAsp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CloudBeatAsp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly DataContext _context;
        public EventController(DataContext context)
        {
            _context = context;

        }

        [HttpGet("{id}")]
        
        public IActionResult GetValues(int id)
        {
                var events = _context.Events.Where(x=>x.PatientId == id).ToList();
                return Ok(events);
        }
    }
}
