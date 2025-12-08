using ChatVideo.Application.Interfaces.Repository;
using ChatVideo.Domain.Models;

namespace ChatVideo.Infrastructure.Repositories.SQL;

public class ConversationRepository : Repository<Conversation>, IConversationRepository
{
    public ConversationRepository(ChatVideoSQLDbContext dbContext) : base(dbContext)
    {
    }
}
