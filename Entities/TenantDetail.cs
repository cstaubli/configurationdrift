namespace configurationdrift;

public class TenantDetail
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public DateTime LastChecked { get; set; }
    public string? OverallStatus { get; set; }
}
