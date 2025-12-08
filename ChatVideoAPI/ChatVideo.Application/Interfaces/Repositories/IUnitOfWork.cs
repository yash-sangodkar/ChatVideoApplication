using ChatVideo.Application.Interfaces.Repository;

namespace ChatVideo.Application.Interfaces.Repositories;

public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IConversationRepository Conversations { get; }
    int Complete();
}
