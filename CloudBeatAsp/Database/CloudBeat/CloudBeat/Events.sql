CREATE TABLE [Events]
(
	[EventId] INT NOT NULL PRIMARY KEY, 
     
    [PatientId] INT NOT NULL, 
    [hrmin] INT NULL, 
    [hravg] INT NULL, 
    [hrmax] INT NULL, 
    CONSTRAINT [FK_Events_ToPatients] FOREIGN KEY ([PatientId]) REFERENCES [Patients]([PatientId]), 

)
