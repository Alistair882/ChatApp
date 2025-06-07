namespace API.DTOs {

    public class MemberDTO
    {
        public int Id { get; set; }
        public string? Username { get; set; }

        public int Age { get; set; }

        public string? PhotoUrl { get; set; }

        public string? UserAlias { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public string? AboutMe { get; set; }
        public string? Interests { get; set;}
        public string? UserCountry { get; set; }
        public string? UserCity { get; set; }

        public List<PhotoDTO> ProfilePicture { get; set; }
    }
}
