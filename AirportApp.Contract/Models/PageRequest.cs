namespace AirportApp.Contract.Models
{
    public class PageRequest
    {
        public int? Offset { get; set; }

        public int? Limit { get; set; }

        public int? PageNumber { get; set; }

        public int? PageSize { get; set; }
    }
}