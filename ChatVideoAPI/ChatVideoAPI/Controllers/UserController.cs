using ChatVideo.Application.DTOs;
using ChatVideo.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChatVideoAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login(UserDetailsDto userDetails)
    {
        return Ok(await _userService.Login(userDetails));
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register(UserDetailsDto detailsDto)
    {
        bool userId = await _userService.Register(detailsDto);
        if (userId)
        {
            return BadRequest("User registration failed.");
        }
        return Ok(userId);
    }

    [HttpGet]
    [Route("getuserbyid")]
    public async Task<IActionResult> GetUserById(string userId)
    {
        return Ok(await _userService.GetUserById(userId));
    }

    [HttpGet]
    [Route("getusersforchatinitiation")]
    public async Task<IActionResult> GetUsersForChatInitiation(string userId)
    {
        return Ok(await _userService.GetUsersForChatInitiation(userId));
    }
}
