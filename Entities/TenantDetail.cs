namespace configurationdrift.Entities;

public class TenantDetail
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public DateTime LastChecked { get; set; }
    public string? OverallStatus { get; set; }

    public int numMissing { get; set; }

    public int numDiffs { get; set; }

    public List<ConfigurationDrift>? Drifts { get; set; }
}
