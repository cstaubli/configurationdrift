using Microsoft.AspNetCore.Mvc;

namespace configurationdrift.Controllers;

[ApiController]
[Route("[controller]")]
public class TenantController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<TenantController> _logger;

    public TenantController(ILogger<TenantController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<TenantDetail> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new TenantDetail
        {
            Id = index,
            Name = $"{(char)(index * 2 + 98)}orix.onmicrosoft.com",
            LastChecked = DateTime.Now.AddHours(-index),
            OverallStatus = (index % 2 == 0 ? "red" : "green")
        })
        .ToArray();
    }

    [HttpGet("/Tenant/{id:int}")]
    public IEnumerable<TenantDetail> Get(int id)
    {
        return Enumerable.Range(1, 1).Select(index => new TenantDetail
        {
            Id = index,
            Name = $"Tenant {id}.onmicrosoft.com",
            LastChecked = DateTime.Now.AddHours(-id),
            OverallStatus = "green"
        })
        .ToArray();
    }
}
