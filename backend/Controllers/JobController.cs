using jobApi.Model;
using jobApi.Data;
using jobApi.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace jobApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class JobController:Controller
    {
        private readonly IJobRepo db;
        
        public JobController(IJobRepo _db)
        {
           db = _db;
        }


        [HttpGet("GetAllJobs")]
        public ActionResult<IEnumerable<DetailCard>> getAllJobs()
        {
            IEnumerable<DetailCard>? res = db.getAllJobs();
            return Ok(res);
        }

        [HttpGet("GetJob/{id}")]
        public ActionResult<DetailCard> getJobById(int id)
        {
            DetailCard job = db.getJobById(id);
            return Ok(job);
        }

        [HttpGet("GetJobByState/{state}")]
        public ActionResult<IEnumerable<DetailCard>> getJobsBystate(String state)
        {
            IEnumerable<DetailCard> res = db.getJobListByState(state);
            return Ok(res);
        }

        [HttpPost("CreateNewJob")]
        public ActionResult<DetailCard> createNewJob(JobCardInputDto input)
        {
            DetailCard job = db.addNewJob(input);

            return Ok(job);
        }

        [HttpPut("UpdateJob")]
        public ActionResult<DetailCard> updateJob(JobUpdateDto input)
        {
            DetailCard res = db.updateJob(input);
            return Ok(res);
        }

        [HttpDelete("DeleteJob/{id}")]
        public ActionResult deleteJobById(int id)
        {
            db.deleteJobById(id);
            return Ok();
        }

    }


}
