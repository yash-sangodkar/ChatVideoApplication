using ChatVideo.Application.DTOs;
using ChatVideo.Application.Interfaces.Hub;
using ChatVideo.Application.Interfaces.Services;
using ChatVideo.Application.Services;
using Microsoft.AspNetCore.SignalR;

namespace ChatVideoAPI.Hub
{
    public class ChatVideoHub : Hub<IChatVideoHub>
    {
        private readonly UserConnectionService _userConnectionService;
        private readonly IMessageService _messageService;

        public ChatVideoHub(UserConnectionService userConnectionService, IMessageService messageService)
        {
            _userConnectionService = userConnectionService;
            _messageService = messageService;
        }
        override public async Task OnConnectedAsync()
        {
            string? userId = Context.GetHttpContext()?.Request.Query["userId"];

            if (!string.IsNullOrEmpty(userId))
            {
                string connectionId = Context.ConnectionId;

                // Store connectionId in cache (auto-updates if exists)
                _userConnectionService.SetConnection(userId, connectionId);
            }

            await base.OnConnectedAsync();
        }

        override public async Task OnDisconnectedAsync(Exception? exception)
        {
            string? userId = Context.GetHttpContext()?.Request.Query["userId"];

            if (!string.IsNullOrEmpty(userId))
            {
                _userConnectionService.RemoveConnection(userId);
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task OnSendMessage(SendMessageDto message)
        {
            await _messageService.ProcessMessage(message);
        }
    }
}
