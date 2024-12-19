namespace CustomerApi.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Phone { get; set; }

        public DateTime CreatedAt { get; set; }
    public DateTime EditedAt { get; set; }
        
    }
}
