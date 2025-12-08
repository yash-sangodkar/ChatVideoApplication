using ChatVideo.Application.DTOs;
using ChatVideo.Application.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatVideoAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ConversationController : ControllerBase
{
    private readonly IConversationService _conversationService;
    public ConversationController(IConversationService conversationService)
    {
        _conversationService = conversationService;
    }

    [HttpGet("getallconversations")]
    public async Task<IActionResult> GetAllConversations()
    {
        return Ok( await _conversationService.GetAllConversations());
    }

    [HttpPost("createconversation")]
    public async Task<IActionResult> CreateConversation(CreateConversationDto dto)
    {
        return Ok(await _conversationService.CreateConversation(dto));
    }

    [HttpGet("getconversationbyuserid")]
    public async Task<IActionResult> GetConversationByUserId(string userId)
    {
        return Ok(await _conversationService.GetConversationsByUserId(userId));
    }
}
