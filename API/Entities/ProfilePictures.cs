
namespace API.Entities;

public class ProfilePicture
{
    public int Id { get; set; }

    public required string Url { get; set; }
    public bool CurrentProfilePicture { get; set; }
    public string? PublicId { get; set; }

    //For one-to-many relationships
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
}