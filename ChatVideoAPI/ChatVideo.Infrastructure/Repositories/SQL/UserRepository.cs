using ChatVideo.Application.Interfaces.Repository;
using ChatVideo.Domain.Models;

namespace ChatVideo.Infrastructure.Repositories.SQL;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(ChatVideoSQLDbContext dbContext) : base(dbContext)
    {

    }

    public ChatVideoSQLDbContext ChatVideoDbContext => _dbContext as ChatVideoSQLDbContext;
    public async Task<User?> GetByUsernameAsync(string username)
    {
        IEnumerable<User> users =  await FindAsync(u => u.Username == username);
        if(users.Count() > 1)
            return null;
        else
            return users.FirstOrDefault();
    }
}
