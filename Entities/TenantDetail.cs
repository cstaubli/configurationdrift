namespace configurationdrift.Entities;

public class TenantDetail
{
    public int id { get; set; }
    public string? name { get; set; }
    public DateTime lastChecked { get; set; }
    public string? overallStatus { get; set; }

    public int numMissing { get; set; }

    public int numDiffs { get; set; }

    public List<ConfigurationDrift>? drifts { get; set; }
}
