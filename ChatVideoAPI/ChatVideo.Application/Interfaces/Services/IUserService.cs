

using ChatVideo.Application.DTOs;

namespace ChatVideo.Application.Interfaces.Services;

public interface IUserService
{
    Task<UserLoggedInDetails?> Login(UserDetailsDto detailsDto);
    Task<bool> Register(UserDetailsDto detailsDto);
    Task<UserLoggedInDetails?> GetUserById(string userId);
    Task<List<UserLoggedInDetails>> GetUsersForChatInitiation(string userId);
}
