using chatApp.Models.Entities;
using chatApp.Services;
using Microsoft.AspNetCore.SignalR;

namespace chatApp.Hubs;

public class ChatHub: Hub
{

    private readonly SharedDB sharedDb;

    public ChatHub(SharedDB _sharedDb)
    {
        sharedDb = _sharedDb;
    }
    
    // send message;

    public async Task SendMessage(string message)
    {
        if (sharedDb.Connections.TryGetValue(Context.ConnectionId, out User user))
        {
            await Clients.Group(user.ChatRoom).SendAsync("ReceiveSpecificMessage", user.Username, message);
        }
    }
    
    public async Task JoinChat(string user)
    {
        await Clients.All.SendAsync("ReceiveMessage", "admin", $"{user} has joined");
    }
    
    // Join specific Group;
    public async Task JoinGroup(User user)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, user.ChatRoom);
        
        sharedDb.Connections[Context.ConnectionId] = user;
        
        await Clients.Group(user.ChatRoom)
            .SendAsync("JoinGroup", "admin", $"{user.Username} has joined {user.ChatRoom}");

    }
}