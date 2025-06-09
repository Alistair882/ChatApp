using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDTO
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string KnownAs { get; set; }

    [Required]
    public string DateOfBirth { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 8)]
    public string Password { get; set; }

}