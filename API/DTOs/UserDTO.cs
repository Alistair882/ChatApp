using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UserDTO
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string token { get; set; }
}
