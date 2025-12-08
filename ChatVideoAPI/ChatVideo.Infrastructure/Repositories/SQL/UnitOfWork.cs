using ChatVideo.Application.Interfaces.Repositories;
using ChatVideo.Application.Interfaces.Repository;

namespace ChatVideo.Infrastructure.Repositories.SQL;

public class UnitOfWork : IUnitOfWork
{
    private readonly ChatVideoSQLDbContext _context;
    public UnitOfWork(ChatVideoSQLDbContext context)
    {
        _context = context;
        Users = new UserRepository(_context);
        Conversations = new ConversationRepository(_context);
    }
    public IUserRepository Users    { get; private set; }

    public IConversationRepository Conversations { get; private set; }

    public int Complete()
    {
        return _context.SaveChanges();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
