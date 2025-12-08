using ChatVideo.Application.DTOs;
using ChatVideo.Application.Helpers;
using ChatVideo.Application.Interfaces.Repositories;
using ChatVideo.Application.Interfaces.Services;
using ChatVideo.Domain.Models;

namespace ChatVideo.Application.Services;

public class UserService : IUserService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConversationService _conversationService;
    public UserService(IUnitOfWork unitOfWork, IConversationService conversationService)
    {
        _unitOfWork = unitOfWork;
        _conversationService = conversationService;
    }

    public async Task<List<UserLoggedInDetails>> GetUsersForChatInitiation(string userId)
    {
        var users = await _unitOfWork.Users.GetAllAsync();
        var conversations = await _conversationService.GetConversationsByUserId(userId);
        if (users.Count() == 0 )
            return new List<UserLoggedInDetails>();

        var usersAlreadyInConversation = conversations
                                            .Select(c =>
                                                c.InitiatorUser.Id == userId
                                                    ? c.RecipientUser.Id
                                                    : c.InitiatorUser.Id)
                                            .Distinct()
                                            .ToList();
        //var usersForChatInitiation = await Task.WhenAll(users
        //                                                .Where(u => (!usersAlreadyInConversation.Contains(u.Id)) && u.Id != userId)
        //                                                .Select(u => GetUserById(u.Id)));

        var usersForChatInitiation = new List<UserLoggedInDetails>();

        foreach (var u in users.Where(u => !usersAlreadyInConversation.Contains(u.Id) && u.Id != userId))
        {
            var userDetails = await GetUserById(u.Id);
            if (userDetails != null)
                usersForChatInitiation.Add(userDetails);
        }

        return usersForChatInitiation.ToList();
    }

    public async Task<UserLoggedInDetails?> GetUserById(string userId)
    {
        User? user = await _unitOfWork.Users.GetByIdAsync(userId);

        if (user == null)
            return null;

        return new UserLoggedInDetails
        (
            Id: user.Id,
            Username: user.Username
        );
    }

    public async Task<UserLoggedInDetails?> Login(UserDetailsDto detailsDto)
    {
        User? user = await _unitOfWork.Users.GetByUsernameAsync(detailsDto.Username);

        if (user == null)
            return null;

        string incomingHash = GlobalHelpers.Hash(detailsDto.Password);

        if (user.Password == incomingHash)
        {
            return await GetUserById(user.Id);
        }

        return null;
    }

    public async Task<bool> Register(UserDetailsDto detailsDto)
    {
        User? existingUser = await _unitOfWork.Users.GetByUsernameAsync(detailsDto.Username);

        if (existingUser != null)
            return false;   

        string passwordHash = GlobalHelpers.Hash(detailsDto.Password);

        var user = new User
        {
            Id = Guid.NewGuid().ToString(),     
            Username = detailsDto.Username,
            Password = passwordHash
        };

       
        await _unitOfWork.Users.AddAsync(user);
        _unitOfWork.Complete();

        return true;
    }
}
