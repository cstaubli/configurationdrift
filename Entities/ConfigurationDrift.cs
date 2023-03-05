namespace configurationdrift.Entities;

public class ConfigurationDrift
{
    public string? sectionName { get; set; }
    public int numDrifts { get; set; }
    public int numMissing { get; set; }
    public string? status { get; set; }
    public List<ConfigurationDriftRoot>? drifts { get; set; }

    public ConfigurationDrift()
    {
        drifts = new List<ConfigurationDriftRoot>();
    }
}
