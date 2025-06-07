using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper, IImageService imageService) : BaseApiController
{
    private async Task<AppUser> GetUserByUserNameFromTokenAsync()
    {
        var user = await userRepository.GetAppUserByUserNameAsync(User.GetUsername());
        return user;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
    {
        var users = await userRepository.GetMembersAsync();

        return Ok(users);
    }

    [HttpGet("{userName}")]
    public async Task<ActionResult<MemberDTO>> GetUser(string userName)
    {
        var user = await userRepository.GetMemberAsync(userName);

        if (user == null) return NotFound();

        return user;
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
    {
        var user = await GetUserByUserNameFromTokenAsync();
        if (user == null) return BadRequest("User not found");

        mapper.Map(memberUpdateDTO, user);

        if (await userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update user");
    }

    [HttpPost("add-image")]
    public async Task<ActionResult<PhotoDTO>> AddImage(IFormFile file)
    {
        var user = await GetUserByUserNameFromTokenAsync();
        if (user == null) return BadRequest("Cannot upload image");

        var result = await imageService.AddImageAsync(file);
        if (result.Error != null) return BadRequest(result.Error.Message);

        var image = new ProfilePicture
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        user.ProfilePicture.Add(image);

        if (await userRepository.SaveAllAsync())
            return CreatedAtAction(nameof(GetUser),
            new { username = user.UserName },
            mapper.Map<PhotoDTO>(image));

        return BadRequest("Problem adding image");
    }

    [HttpPut("set-main-image/{imgId:int}")]
    public async Task<ActionResult> SetMainImage(int imgId)
    {
        var user = await GetUserByUserNameFromTokenAsync();
        if (user == null) return BadRequest("Cannot find user with token");

        var image = user.ProfilePicture.FirstOrDefault(x => x.Id == imgId);
        if (image == null || image.CurrentProfilePicture) return BadRequest("image does not exist or is already main profile picture");

        var currentMain = user.ProfilePicture.FirstOrDefault(x => x.CurrentProfilePicture);
        if (currentMain != null) currentMain.CurrentProfilePicture = false;
        image.CurrentProfilePicture = true;

        if (await userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Problem setting profile picture");
    }

    [HttpDelete("delete-image/{imgId:int}")]
    public async Task<ActionResult> DeleteImage(int imgId)
    {
        var user = await userRepository.GetAppUserByUserNameAsync(User.GetUsername());

        if (user == null) return BadRequest("Cannot find user with token");

        var image = user.ProfilePicture.FirstOrDefault(x => x.Id == imgId);

        if (image == null || image.CurrentProfilePicture) return BadRequest("Image does not exist or is current profile picture");

        if (image.PublicId != null)
        {
            var result = await imageService.DeleteImageAsync(image.PublicId);
            if (result.Error != null) return BadRequest(result.Error.Message);
        }

        user.ProfilePicture.Remove(image);

        if (await userRepository.SaveAllAsync()) return Ok();

        return BadRequest("Problem deleting image");
    }

}
