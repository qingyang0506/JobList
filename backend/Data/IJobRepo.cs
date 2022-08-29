using jobApi.Model;
using jobApi.Dtos;

namespace jobApi.Data
{
    public interface IJobRepo
    {
        public IEnumerable<DetailCard> getAllJobs();
        public DetailCard addNewJob(JobCardInputDto input);

        public DetailCard updateJob(JobUpdateDto input);

        public DetailCard getJobById(int id);

        public void deleteJobById(int id);

        public IEnumerable<DetailCard> getJobListByState(String state);
    }
}
