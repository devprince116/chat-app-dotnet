using System.Collections.Concurrent;
using chatApp.Models.Entities;

namespace chatApp.Services;

public class SharedDB
{
    private readonly ConcurrentDictionary<string, User> connections = new ConcurrentDictionary<string, User>();

    public ConcurrentDictionary<string, User> Connections => connections;
}