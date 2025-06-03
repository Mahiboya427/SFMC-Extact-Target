<script runat="server" language="JavaScript">
    Platform.Load("core", "1");

    try {
        var jsonpost = Platform.Request.GetPostData();
        if (jsonpost && jsonpost.length > 0) {
            var json = Platform.Function.ParseJSON(jsonpost);
            Write(Stringify(json));
            var response = { success: true, message: "Data received successfully!" };
            var JsonResponse = Platform.Function.Stringify(response);
            Platform.Response.ContentType = "application/json";
            Platform.Response.Write(JsonResponse);

            var clientId = "3MVG9jSKmPAPVo2JJ106tjUnx2RDd1ioHJvwF_AsO83SOvOHs12FqX5gh3FzFlnznPxkFoRWewA.G8Ndv.XMN";
            var clientSecret = "27E5D743D4864F1E4009D6617DC2F7FE4A858CD7F1EE2612D5062F14BF6EE99B";
            var payload = {
                "grant_type": "client_credentials",
                "client_id": clientId,
                "client_secret": clientSecret
            };
            var authurl = "https://ae1709725408312.my.salesforce.com/services/oauth2/token";

            try {
                // Convert payload to URL-encoded string
                var payloadString = "grant_type=" + encodeURIComponent(payload.grant_type) +
                                    "&client_id=" + encodeURIComponent(payload.client_id) +
                                    "&client_secret=" + encodeURIComponent(payload.client_secret);

                // Set headers
                var headers = ["Content-Type"];
                var headerValues = ["application/x-www-form-urlencoded"];

                // Perform the HTTP POST request
                var result = HTTP.Post(authurl, 'application/x-www-form-urlencoded', payloadString, headers, headerValues);

                if (result.StatusCode == 200) {
                    var responseJson = Platform.Function.ParseJSON(result.Response[0]);
                    var accessToken = responseJson.access_token;
                    var instanceUrl = responseJson.instance_url; // Correct field name
                    Write("Access Token: " + accessToken);
                    Write("Instance URL: " + instanceUrl);
                } else {
                    Write("Error: " + result.StatusCode + " - " + result.Response[0]);
                }
            } catch (ex) {
                // Handle exceptions or errors
                Write("An error occurred: " + ex.message);
            }

        } else {
            // No data received
            var emptyResponse = { success: false, message: "No data received." };
            var emptyJsonResponse = Platform.Function.Stringify(emptyResponse);
            Platform.Response.ContentType = "application/json";
            Platform.Response.Write(emptyJsonResponse);
        }

    } catch (ex) {
        // Handle exceptions or errors
        var errorResponse = { success: false, message: "An error occurred: " + ex.message };
        var errorJsonResponse = Platform.Function.Stringify(errorResponse);
        Platform.Response.ContentType = "application/json";
        Platform.Response.Write(errorJsonResponse);
    }
</script>
