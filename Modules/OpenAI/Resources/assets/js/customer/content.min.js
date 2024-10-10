function loadMarkedLibrary() {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/marked/2.1.3/marked.min.js";
        script.onload = function () {
            console.log("marked.js has been loaded successfully");
            if (typeof marked !== 'undefined') {
                resolve();  // Resolve the promise if marked is loaded
            } else {
                reject(new Error("marked.js is not available after loading."));
            }
        };
        script.onerror = function () {
            reject(new Error("Error loading marked.js"));
        };
        document.head.appendChild(script);
    });
}

// Function to parse markdown and set content to TinyMCE
function parseMarkdownAndSetToTinyMCE(stream) {
    // Check if stream has valid content
    if (stream && stream !== "[DONE]") {
        console.log(stream);

        // Ensure 'marked' is available before using it
        if (typeof marked !== 'undefined') {
            // Convert markdown to HTML using marked.js
            let html = marked.parse(stream);

            // Update the global gethtml with the converted content
            gethtml += html;

            // Pass the resulting HTML to TinyMCE
            tinyMCE.activeEditor.setContent(gethtml, { format: "html" });
        } else {
            console.error("marked is not available in parseMarkdownAndSetToTinyMCE.");
        }
    }
}

function hideProviderOptions() {
    $(".ProviderOptions").each(function () {
        $(this).addClass("hidden");
    });
}

$(".AdavanceOption").on("click", function () {
    if ($("#ProviderOptionDiv").attr("class") == "hidden") {
        hideProviderOptions();
        $("." + $("#provider option:selected").val() + "_div").removeClass("hidden");
        $("#ProviderOptionDiv").removeClass("hidden");
    } else {
        $("#ProviderOptionDiv").addClass("hidden");
    }
});

$("#provider").on("change", function () {
    hideProviderOptions();
    $("." + $(this).val() + "_div").removeClass("hidden");
});

$(document).on("submit", "#openai-form", function (e) {
    let dataArray = $(this).serializeArray();
    var providerObject = dataArray.find(function (element) {
        return "provider" === element.name;
    });

    function getValueByName(name) {
        var item = dataArray.find(function (element) {
            return element.name === name;
        });
        return item ? item.value : null;
    }

    var providerValue = providerObject ? providerObject.value : null;
    let contentSlug = "";
    var currentUrl;

    if (window.location.href.indexOf("content/edit") > -1) {
        parts = window.location.href.split("/");
        contentSlug = parts[parts.length - 1];
    }

    e.preventDefault();

    var gethtml = tinyMCE.activeEditor.getContent();
    var formData = {};

    $(".dynamic-input").each(function (column) {
        formData[this.name] = $(this).val();
    });

    var url = SITE_URL + "/user/generate";
    var newUrl = SITE_URL + "/user/process";
    var questions = JSON.stringify(formData);
    var variant = getValueByName(`${providerValue}[variant]`);
    var language = getValueByName(`${providerValue}[language]`);
    var model = getValueByName(`${providerValue}[model]`);

    $.ajax({
        url: url,
        type: "POST",
        beforeSend: function (xhr) {
            $(".loader").removeClass("hidden");
            $("#magic-submit-button").prop("disabled", true);
        },
        data: {
            questions: questions,
            prompt: filterXSS($("#promt").val()),
            useCase: $(".use-cases").val(),
            language: language,
            variant: variant,
            model: model,
            tone: getValueByName(`${providerValue}[tone]`),
            creativity_level: getValueByName(`${providerValue}[creativity_level]`),
            provider: $("#provider").val(),
            previousContent: gethtml,
            contentSlug: contentSlug,
            dataType: "json",
            _token: CSRF_TOKEN
        },
        success: function (response) {
            if (response.status = "success") {
                var url = newUrl + "?questions=" + encodeURIComponent(questions) +
                    "&provider=" + $("#provider").val() +
                    "&useCase=" + $(".use-cases").val() +
                    "&language=" + language +
                    "&variant=" + variant +
                    "&model=" + model +
                    "&tone=" + $("#tone").val() +
                    "&creativity_level=" + $("#creativity_level").val() +
                    "&template_id=" + decodeURIComponent(response.data.templateId);

                const eventSource = new EventSource(url, { withCredentials: true });

                eventSource.onmessage = function (e) {
                    if (e.data == "[DONE]") {
                        eventSource.close();
                        toastMixin.fire({
                            title: jsLang("Document generated successfully."),
                            icon: "success"
                        });
                        $(".loader").addClass("hidden");
                        $("#magic-submit-button").removeAttr("disabled");
                    } else if (e.data == "[ERROR]") {
                        eventSource.close();
                        errorMessage(e.data, "magic-submit-button");
                    } else {
                        let stream = e.data;
                        if (stream && stream !== "[DONE]") {
                            console.log(stream)
                            gethtml += parseMarkdownAndSetToTinyMCE(stream);
                            tinyMCE.activeEditor.setContent(gethtml, { format: "html" });
                        }
                    }
                };

                eventSource.addEventListener("error", e => {
                    eventSource.close();
                    errorMessage(e.data, "magic-submit-button");
                });
            }
        },
        error: function (response) {
            var jsonData = JSON.parse(response.responseText);
            var message = jsonData.error ? jsonData.error : jsonData.message;
            errorMessage(message, "magic-submit-button");
        }
    });
});
