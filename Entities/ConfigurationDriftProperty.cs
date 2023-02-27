namespace configurationdrift.Entities;

public class ConfigurationDriftProperty
{
    /// <summary>
    /// Value in Blueprint Tenant
    /// </summary>
    public object? ValueInDestination { get; set; }

    /// <summary>
    /// Name of Property
    /// </summary>
    public string? ParameterName { get; set; }

    /// <summary>
    /// Value in Destination Tenant
    /// </summary>
    public object? ValueInSource { get; set; }
}