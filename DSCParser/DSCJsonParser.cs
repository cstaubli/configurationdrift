using configurationdrift.Entities;
using Newtonsoft.Json;

namespace configurationdrift.dscparser;
public class DSCJsonParser
{
    private readonly string _jsonfilepath;

    private readonly string _defaultstatus = "green";
    private readonly string _missing = "MISSING";

    public DSCJsonParser(string jsonfilepath)
    {
        _jsonfilepath = jsonfilepath;
    }

    async public Task<List<ConfigurationDrift>> ParseAsync()
    {
        if (!(File.Exists(_jsonfilepath)))
        {
            throw new FileNotFoundException($"File '{_jsonfilepath}' not found");
        }

        var jsonString = await File.ReadAllTextAsync(_jsonfilepath);
        var parsedfile = JsonConvert.DeserializeObject<dynamic>(jsonString)!;

        var hashlist = new Dictionary<string, ConfigurationDrift>();

        foreach (var ressource in parsedfile)
        {
            var resourceName = (string)ressource.ResourceName;
            ConfigurationDrift currentSection;

            if (hashlist.ContainsKey(resourceName))
            {
                currentSection = hashlist[resourceName];
            }
            else
            {
                currentSection = new ConfigurationDrift();
                currentSection.sectionName = resourceName;
                currentSection.numDrifts = 0;
                currentSection.numMissing = 0;
                currentSection.status = _defaultstatus;
            }

            var root = new ConfigurationDriftRoot();
            root.key = ressource.Key;
            root.keyValue = ressource.KeyValue;
            root.resourceName = resourceName;

            foreach (var prop in ressource.Properties)
            {
                var driftProperty = new ConfigurationDriftProperty();
                driftProperty.parameterName = prop.ParameterName;

                var source = prop.ValueInSource;
                var tsource = source.GetType().Name;
                var dest = prop.ValueInDestination;
                var tdest = dest.GetType().Name;

                if (((string)(prop.ParameterName)).IndexOf("IsInConfig") > 0)
                {
                    currentSection.numMissing += 1;
                }
                else
                {
                    currentSection.numDrifts += 1;
                }

                switch (tsource)
                {
                    case "JValue":
                        driftProperty.valueInSource.Add(source.ToString());
                        break;
                    case "JArray":
                        var hasValue = false;
                        foreach (var sitem in source)
                        {
                            hasValue = true;
                            driftProperty.valueInSource.Add(sitem.ToString());
                        }
                        if (!hasValue)
                        {
                            driftProperty.valueInSource.Add(_missing);
                        }
                        break;
                    default:
                        break;
                }

                switch (tdest)
                {
                    case "JValue":
                        driftProperty.valueInDestination.Add(dest.ToString());
                        break;
                    case "JArray":
                        var hasValue = false;
                        foreach (var sitem in dest)
                        {
                            hasValue = true;
                            driftProperty.valueInDestination.Add(sitem.ToString());
                        }
                        if (!hasValue)
                        {
                            driftProperty.valueInDestination.Add(_missing);
                        }
                        break;

                    default:
                        break;
                }

                root.properties.Add(driftProperty);
            }

            currentSection.drifts.Add(root);

            if (hashlist.ContainsKey(resourceName))
            {
                hashlist[resourceName] = currentSection;
            }
            else
            {
                hashlist.Add(resourceName, currentSection);
            }
        }

        var list = new List<ConfigurationDrift>();

        foreach (var key in hashlist.Keys)
        {
            list.Add(hashlist[key]);
        }

        return list;
    }
}
