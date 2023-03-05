namespace configurationdrift.Entities;

/// <summary>
/// Property that differs between source and destination
/// </summary>
public class ConfigurationDriftProperty
{
    /// <summary>
    /// Value in Blueprint Tenant
    /// </summary>
    public List<string>? valueInDestination { get; set; }

    /// <summary>
    /// Name of Property
    /// </summary>
    public string? parameterName { get; set; }

    /// <summary>
    /// Value in Destination Tenant
    /// </summary>
    public List<string>? valueInSource { get; set; }

    public ConfigurationDriftProperty()
    {
        valueInDestination = new List<string>();
        valueInSource = new List<string>();
    }
}
