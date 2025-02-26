using System.ComponentModel.DataAnnotations;
using API.Extensions;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }

    [StringLength(100, MinimumLength = 5, ErrorMessage = "Username must be between 5 and 100 characters.")]
    public required string UserName { get; set; }

    public byte[] PasswordHash { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];

    public DateOnly DateOfBirth { get; set; }

    public required string UserAlias { get; set; }

    public DateTime Created { get; set; } = DateTime.UtcNow;

    public DateTime LastActive { get; set; } = DateTime.UtcNow;

    public string? AboutMe { get; set; }
    public string? UserEmail { get; set; }
    public string? Interests { get; set;}

    public string? UserCountry { get; set; }
    public string? UserCity { get; set; }

    public List<ProfilePicture> ProfilePicture { get; set; } = [];

    // public int GetAge()
    // {
    //     return DateOfBirth.CalculateAge();
    // }

}
