using ChatVideo.Application.DTOs;
using ChatVideo.Application.Interfaces.Hub;
using Microsoft.AspNetCore.SignalR;

namespace ChatVideoAPI.Hub;

public class SignalRMessageNotifier : ISignalRMessageNotifier
{
    private readonly IHubContext<ChatVideoHub, IChatVideoHub> _hubContext;
    public SignalRMessageNotifier(IHubContext<ChatVideoHub, IChatVideoHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public void NewMessageReceived(SendMessageDto message, string connectionId)
    {
        _hubContext.Clients.Client(connectionId).OnNewMessageReceived(message);
    }
}
