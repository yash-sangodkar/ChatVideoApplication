using ChatVideo.Application.DTOs;

namespace ChatVideo.Application.Interfaces.Hub;

public interface IChatVideoHub
{
    Task OnNewMessageReceived(SendMessageDto message);
}
