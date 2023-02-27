namespace configurationdrift.Entities;

public class ConfigurationDriftRoot
{
    /// <summary>
    /// Component name, e.g. AADConditionalAccessPolicy
    /// </summary>
    public string? ResourceName { get; set; }

    /// <summary>
    /// Type of KeyValue, e.g. DisplayName
    /// </summary>
    public string? Key { get; set; }

    /// <summary>
    /// Name
    /// </summary>
    public string? KeyValue { get; set; }

    /// <summary>
    /// List of properties that differs between source and destination
    /// </summary>
    public List<ConfigurationDriftProperty>? Properties { get; set; }
}
