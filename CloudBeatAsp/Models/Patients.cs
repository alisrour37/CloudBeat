using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CloudBeatAsp.Models
{
    public class Patient
    {
        [Key]
        public int PatientId {get;set;}
        public string Name {get;set;}
        
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateOfBirth {get;set;}
        public DateTime StudyStartTime {get;set;}
        public DateTime StudyEndTime {get;set;}
        public string DeviceSerialNumber {get;set;}
        public int NumberOfEvents {get;set;}
        
        public List<Event> Events {get;set;}

    }
    public class Event
    {
        [Key]
        public int EventId {get;set;}
        
        
        public int HeartRateMin {get;set;}
        public int HeartRateAvg {get;set;}
        public int HeartRateMax {get;set;}
        public int PatientId { get; set; }
    public Patient Patients { get; set; }

    }
}