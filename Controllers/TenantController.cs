using configurationdrift.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace configurationdrift.Controllers;

[ApiController]
[Route("[controller]")]
public class TenantController : ControllerBase
{
    private readonly ILogger<TenantController> _logger;

    public TenantController(ILogger<TenantController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Authorize]
    public IEnumerable<TenantDetail> Get()
    {
        var json = System.IO.File.ReadAllText("/home/cstaubli/oxydelta.json");
        var des = JsonConvert.DeserializeObject<List<ConfigurationDriftRoot>>(json);
        int nMissing = 0, nDiffs = 0;
        foreach (var item in des)
        {
            foreach (var subitem in item.Properties)
            {
                if (subitem?.ParameterName.IndexOf("IsInCon") > 0)
                {
                    nMissing += 1;
                }
                else
                {
                    nDiffs += 1;
                }
            }
        }
        return Enumerable.Range(1, 5).Select(index => new TenantDetail
        {
            Id = index,
            Name = $"{(char)(index * 2 + 98)}orix.onmicrosoft.com",
            LastChecked = DateTime.Now.AddHours(-index),
            OverallStatus = (index % 2 == 0 ? "red" : "yellow"),
            numMissing = nMissing,
            numDiffs = nDiffs,
        })
        .ToArray();
    }

    [HttpGet("/Tenant/{id:int}")]
    [Authorize]
    public IEnumerable<TenantDetail> Get(int id)
    {
        _logger.Log(LogLevel.Information, $"Get(int id) => id:{id} called");
        var json = System.IO.File.ReadAllText("/home/cstaubli/oxydelta.json");
        var des = JsonConvert.DeserializeObject<List<ConfigurationDriftRoot>>(json);
        int nMissing = 0, nDiffs = 0;
        foreach (var item in des)
        {
            foreach (var subitem in item.Properties)
            {
                if (subitem?.ParameterName.IndexOf("IsInCon") > 0)
                {
                    nMissing += 1;
                }
                else
                {
                    nDiffs += 1;
                }
            }
        }
        return Enumerable.Range(1, 1).Select(index => new TenantDetail
        {
            Id = index,
            Name = $"{(char)(id * 2 + 98)}orix.onmicrosoft.com",
            LastChecked = DateTime.Now,
            OverallStatus = "red[500]",
            Drifts = des,
            numMissing = nMissing,
            numDiffs = nDiffs,
        })
        .ToArray();
    }
}
