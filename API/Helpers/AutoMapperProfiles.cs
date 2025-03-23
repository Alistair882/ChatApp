using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using Microsoft.Extensions.Options;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDTO>()
            .ForMember(d => d.Age,
                    o => o.MapFrom(s => s.DateOfBirth.CalculateAge()))
            .ForMember(d => d.PhotoUrl, 
                o => o.MapFrom(s => s.ProfilePicture.FirstOrDefault(x => x.CurrentProfilePicture)!.Url));
        CreateMap<ProfilePicture, PhotoDTO>();
        CreateMap<MemberUpdateDTO, AppUser>();
    }


}
