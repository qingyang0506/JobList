
using System.ComponentModel.DataAnnotations;
namespace jobApi.Model
{
    public class DetailCard
    {
        [Key]
        [Required]
        public int id { get; set; }
        public String State { get; set; }

        public String Create_Time { get; set; }

        public String? Client_name { get; set; }

        public String? Client_contact { get; set; }

        public String? Notes { get; set; }

        
    }
}
