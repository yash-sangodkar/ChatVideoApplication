using ChatVideo.Application.DTOs;
using ChatVideo.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChatVideoAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MessagesController : ControllerBase
{
    private readonly IMessageService _messageService;

    public MessagesController(IMessageService messageService)
    {
        _messageService = messageService;
    }

    [HttpGet("getmessages")]
    public async Task<IActionResult> GetMessages(string conversationId)
    {
        var messages = await _messageService.GetMessagesAsync(conversationId);
        return Ok(messages);
    }

    [HttpPost("sendmessage")]
    public async Task<IActionResult> SendMessage([FromBody] SendMessageDto request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _messageService.ProcessMessage(request);
        return Ok();
    }
}
