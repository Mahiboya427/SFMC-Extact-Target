<script runat="server" language="JavaScript">
    Platform.Load("core", "1");
    try {
        var jsonpost = Platform.Request.GetPostData();
        var json = Platform.Function.ParseJSON(jsonpost);
        if (jsonpost && jsonpost.length > 0) {
            Write(Stringify(json));
            var response = { success: true, message: "Data received successfully!" };
            var JsonResponse = Platform.Function.Stringify(response);
            Platform.Response.ContentType = "application/json";
            Platform.Response.Write(JsonResponse);
        
        var AWS = require('aws-sdk');
        AWS.config.update({
            accessKeyId: '',
            secretAccessKey: '',
            region: 'Asia Pacific (Mumbai) ap-south-1'
        });
        var s3 = new AWS.S3();
        Write(Stringify(s3))

        // Check if form was submitted
        if (Request.Method == "POST") {
            var name ="mahesh";
            var email = "boya.mahesh@aetherus.com";

            // Prepare the data to be uploaded to S3
            var formData = {
                name: name,
                email: email,
                timestamp: new Date().toISOString()
            };

            var jsonData = Stringify(formData);

            var params = {
                Bucket: 'boya-cdp',
                Key: 'form-data/' + new Date().getTime() + '.json',
                Body: jsonData,
                ContentType: 'application/json'
            };

            // Upload the data to S3
            s3.putObject(params, function (err, data) {
                if (err) {
                    Write('<p>Error uploading data to S3: ' + Stringify(err) + '</p>');
                } else {
                    Write('<p>Successfully uploaded data to S3</p>');
                }
            });
        }

    }
        else {
            // No data received
            var emptyResponse = { success: false, message: "No data received." };
            var emptyJsonResponse = Platform.Function.Stringify(emptyResponse);
            Platform.Response.ContentType = "application/json";
            Platform.Response.Write(emptyJsonResponse);
        }

    }
    catch (ex) {
        // Handle exceptions or errors
        var errorResponse = { success: false, message: "An error occurred: " + ex.message };
        var errorJsonResponse = Platform.Function.Stringify(errorResponse);
        Platform.Response.ContentType = "application/json";
        Platform.Response.Write(errorJsonResponse);
    }





</script>
