using configurationdrift.Entities;
using Newtonsoft.Json;

namespace configurationdrift.dscparser;
public class DSCJsonParser
{
    private readonly ILogger<DSCJsonParser> _logger;
    private readonly string _jsonfilepath;

    public DSCJsonParser(string jsonfilepath, ILogger<DSCJsonParser> logger)
    {
        _jsonfilepath = jsonfilepath;
        _logger = logger;
    }

    async public Task<List<ConfigurationDrift>> Parse()
    {
        if (!(File.Exists(_jsonfilepath)))
        {
            throw new FileNotFoundException($"File '{_jsonfilepath}' not found");
        }

        var jsonString = await File.ReadAllTextAsync(_jsonfilepath);
        var parsedfile = JsonConvert.DeserializeObject<dynamic>(jsonString)!;

        var list = new List<ConfigurationDrift>();

        return list;
    }
}
