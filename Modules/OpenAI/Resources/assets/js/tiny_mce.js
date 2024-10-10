"use strict";

// Load marked.min.js from CDN
fetch("https://cdnjs.cloudflare.com/ajax/libs/marked/2.1.3/marked.min.js")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.text();
  })
  .then((scriptText) => {
    // Create a script element and set its content to the loaded script
    const script = document.createElement("script");
    script.textContent = scriptText;
    document.body.appendChild(script);

    // Initialize TinyMCE after loading marked
    initTinyMCE();
  })
  .catch((error) => {
    console.error("Failed to load the marked library:", error);
  });

function initTinyMCE() {
  tinymce.init({
    selector: "textarea#basic-example",
    statusbar: false,
    menubar: false,
    promotion: false,
    contextmenu: false,
    content_style: "body{color:#4E4E4EFF}",  // Set text color
    toolbar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
    ],
    toolbar: "bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | undo redo | blocks forecolor | removeformat | ",
    content_css: "../../Modules/OpenAI/Resources/assets/css/rtl.min.css",

    init_instance_callback: function (editor) {
      // Set the initial Markdown content after TinyMCE has initialized
      let markdownStream = `
                ## Title
                **This is bold text**
                - Bullet point 1
                - Bullet point 2
            `;

      // Convert the Markdown to HTML using marked
      let htmlContent = marked(markdownStream);

      // Set the converted HTML content in the editor
      editor.setContent(htmlContent);
    },

    formats: {
      bold: { inline: 'strong' }
    },

    convert_fonts_to_spans: true
  });
}
