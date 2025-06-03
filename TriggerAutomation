<script runat="server" language="JavaScript">
    Platform.Load("core", "1");

    try {
        var jsonpost = Platform.Request.GetPostData();
        Platform.Response.ContentType = "application/json";

        if (jsonpost && jsonpost.length > 0) {
            var json = Platform.Function.ParseJSON(jsonpost);
            
           try {

        var name = "Student_Automation_Copy";

        var request = Platform.Function.CreateObject("RetrieveRequest");

        Platform.Function.AddObjectArrayItem(request, "Properties", "Status");
        Platform.Function.AddObjectArrayItem(request, "Properties", "ProgramID");

        Platform.Function.SetObjectProperty(request, "ObjectType", "Automation");

        var filter =  Platform.Function.CreateObject("SimpleFilterPart");

        Platform.Function.SetObjectProperty(filter, "Property", "Name");
        Platform.Function.SetObjectProperty(filter, "SimpleOperator", "equals");
        Platform.Function.AddObjectArrayItem(filter, "Value", name);

        Platform.Function.SetObjectProperty(request, "Filter", filter);

        var result = Platform.Function.InvokeRetrieve(request, [0, 0, 0]);

        var objectID = result[0]["ObjectID"];

        var automation = Platform.Function.CreateObject("Automation");

        Platform.Function.SetObjectProperty(automation, "ObjectID", objectID);

        var options = Platform.Function.CreateObject("PerformOptions");

        var result = [0, 0, 0];

        var status = Platform.Function.InvokePerform(automation, "start", result, options);

        Platform.Response.Write(Platform.Function.Stringify(result));
  
 } catch(error) {

        Platform.Response.Write(Platform.Function.Stringify(error));

    } 

            var response = {
                success: true,
                message: "Data received successfully!",
                data: json // Optionally include received data in response
            };

            var JsonResponse = Platform.Function.Stringify(response);
            Platform.Response.Write(JsonResponse);

        } else {
            var emptyResponse = { success: false, message: "No data received." };
            var emptyJsonResponse = Platform.Function.Stringify(emptyResponse);
            Platform.Response.Write(emptyJsonResponse);
        }

    } catch (ex) {
        var errorResponse = { success: false, message: "An error occurred: " + ex.message };
        var errorJsonResponse = Platform.Function.Stringify(errorResponse);
        Platform.Response.ContentType = "application/json";
        Platform.Response.Write(errorJsonResponse);
    }
</script>
