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
    public async Task<IEnumerable<TenantDetail>> Get()
    {
        _logger.Log(LogLevel.Information, $"Get() called");

        var dsc = new dscparser.DSCJsonParser("/home/cstaubli/verdelta.json");
        var parsed = await dsc.Parse();

        var nMissing = 0;
        var nDrifts = 0;

        foreach (var section in parsed)
        {
            nMissing += section.numMissing;
            nDrifts += section.numDrifts;
        }

        return Enumerable.Range(1, 5).Select(index => new TenantDetail
        {
            id = index,
            name = $"{(char)(index * 2 + 98)}orix.onmicrosoft.com",
            lastChecked = DateTime.Now.AddHours(-index),
            overallStatus = (index % 2 == 0 ? "red" : "yellow"),
            numMissing = nMissing,
            numDiffs = nDrifts,
            drifts = parsed,
        })
        .ToArray();
    }

    [HttpGet("/Tenant/{id:int}")]
    [Authorize]
    public async Task<IEnumerable<TenantDetail>> Get(int id)
    {
        _logger.Log(LogLevel.Information, $"Get(int id) => id:{id} called");

        var dsc = new dscparser.DSCJsonParser("/home/cstaubli/verdelta.json");
        var parsed = await dsc.Parse();

        var nMissing = 0;
        var nDrifts = 0;

        foreach (var section in parsed)
        {
            nMissing += section.numMissing;
            nDrifts += section.numDrifts;
        }

        return Enumerable.Range(1, 1).Select(index => new TenantDetail
        {
            id = index,
            name = $"{(char)(id * 2 + 98)}orix.onmicrosoft.com",
            lastChecked = DateTime.Now,
            overallStatus = "red[500]",
            numMissing = nMissing,
            numDiffs = nDrifts,
            drifts = parsed,
        })
        .ToArray();
    }
}
