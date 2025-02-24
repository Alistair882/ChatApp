using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 5, ErrorMessage = "Username must be between 5 and 100 characters.")]
    public string UserName { get; set; }
    [Required]
    public byte[] passwordHash { get; set; }
    [Required]
    public byte[] passwordSalt { get; set; }

}
