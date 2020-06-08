namespace AirportApp.Contract.Models
{
    public class Page<TRecord>
    {
        public int? Offset { get; set; }

        public int? Limit { get; set; }

        public int? Total { get; set; }

        public int? Number { get; set; }

        public int? Size { get; set; }

        public int? TotalPages { get; set; }

        public TRecord[] Records { get; set; }
    }
}