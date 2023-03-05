namespace configurationdrift.Entities;

public class ConfigurationDriftRoot
{
    /// <summary>
    /// Component name, e.g. AADConditionalAccessPolicy
    /// </summary>
    public string? resourceName { get; set; }

    /// <summary>
    /// Type of KeyValue, e.g. DisplayName
    /// </summary>
    public string? key { get; set; }

    /// <summary>
    /// Name
    /// </summary>
    public string? keyValue { get; set; }

    /// <summary>
    /// List of properties that differs between source and destination
    /// </summary>
    public List<ConfigurationDriftProperty>? properties { get; set; }

    public ConfigurationDriftRoot()
    {
        properties = new List<ConfigurationDriftProperty>();
    }
}
