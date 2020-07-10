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
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private readonly DataContext _context;
        public EventController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        
        public IActionResult GetValues()
        {
                var events = _context.Events.ToList();
                return Ok(events);
        }
    }
}
