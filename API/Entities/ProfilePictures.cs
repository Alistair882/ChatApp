namespace API.Entities;

public class ProfilePictures
{
    int Id { get; set; }

    public required string Url { get; set; }
    public bool CurrentProfilePicture { get; set; }
    public string? PublicId { get; set; }
}