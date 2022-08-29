using jobApi.Dtos;
using jobApi.Model;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace jobApi.Data
{
    public class JobRepo:IJobRepo
    {
        private readonly JobDbContext _context;

        public JobRepo(JobDbContext context)
        {
            _context = context;
        }

        //add a new job to database
        public DetailCard addNewJob(JobCardInputDto input)
        {
            DetailCard card = new DetailCard
            {
                State = input.State,
                Create_Time = DateTime.Now.ToString(),
                Client_name = input.Client_name,
                Client_contact = input.client_contact,
                Notes = input.Notes,
            };

            EntityEntry<DetailCard> dcard = _context.Add(card);

            DetailCard res = dcard.Entity;

            _context.SaveChanges();

            return res;
            
        }

        //delete the job according to the id
        public void deleteJobById(int id)
        {
            DetailCard res = _context.Jobs.FirstOrDefault(x =>x.id == id);
            _context.Jobs.Remove(res);
            _context.SaveChanges();
        }

        //retrieve the all data in database
        public IEnumerable<DetailCard>? getAllJobs()
        {
            IEnumerable<DetailCard>? jobs = _context.Jobs?.ToList();
            return jobs;
        }

        //retrieve the specific job by id 
        public DetailCard? getJobById(int id)
        {
            DetailCard? res = _context.Jobs?.FirstOrDefault(x=>x.id == id);
            return res;
        }

        //retrieve all jobs which state equal to input
        public IEnumerable<DetailCard> getJobListByState(string state)
        {
            if(state == "All")
            {
                return getAllJobs();
            }

            IEnumerable<DetailCard> jobs = _context.Jobs.Where(x => x.State == state).ToList();

            return jobs;
        }

        //update the job
        public DetailCard? updateJob(JobUpdateDto input)
        {
            DetailCard? card = _context.Jobs?.FirstOrDefault(x => x.id == input.id);

            if(card == null)
            {
                return null;
            }

            card.State = input.State;
            card.Notes = input.Notes;

            _context.SaveChanges();

            return card;
        }
    }
}
