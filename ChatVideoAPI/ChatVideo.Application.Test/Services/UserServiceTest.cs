using ChatVideo.Application.Interfaces.Repositories;
using ChatVideo.Application.Interfaces.Services;
using ChatVideo.Application.Services;
using ChatVideo.Domain.Models;
using Moq;

namespace ChatVideo.Application.Test.Services;

public class UserServiceTest
{
    private readonly UserService _userService;
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IConversationService> _conversationService;
    public UserServiceTest()
    {
        _unitOfWork =  new Mock<IUnitOfWork>();
        _conversationService = new Mock<IConversationService>();
        _userService = new UserService(_unitOfWork.Object, _conversationService.Object);
    }

    [Theory]
    [InlineData("847bbceb-3cd4-4905-a54d-11e34c0e79f7")]
    public async Task GetUserById_ValidUser(string userId)
    {
        User? dummyUser = new User { Id = userId, Username = "yash-sangodkar", Password= "jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=" };

        _unitOfWork.Setup(u => u.Users.GetByIdAsync(userId))
            .ReturnsAsync(dummyUser);

        var user = await _userService.GetUserById(userId);
        Assert.NotNull(user);
        Assert.Equal(userId, user.Id);

    }
}
