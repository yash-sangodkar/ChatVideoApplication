using ChatVideo.Domain.Models;

namespace ChatVideo.Application.Interfaces.Repository;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByUsernameAsync(string username);
}
