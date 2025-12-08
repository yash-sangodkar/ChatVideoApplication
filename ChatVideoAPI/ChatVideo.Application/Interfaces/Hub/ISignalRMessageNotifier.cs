using ChatVideo.Application.DTOs;

namespace ChatVideo.Application.Interfaces.Hub;

public interface ISignalRMessageNotifier
{
    void NewMessageReceived(SendMessageDto message, string connectionId);
}
