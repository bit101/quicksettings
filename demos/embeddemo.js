QuickSettings.create(20, 20, "Maps!")
    .setWidth(620)
    .addHTML("map", '<iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d34330.23543187032!2d-71.06839464299829!3d42.36363612508051!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1478655181161" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>');


QuickSettings.create(700, 20, "Videos!")
    .setWidth(580)
    .addHTML("youtube", '<iframe width="560" height="315" src="https://www.youtube.com/embed/xBxaFCufFtw" frameborder="0" allowfullscreen></iframe>');

QuickSettings.create(700, 420, "Info")
    .setWidth(500)
    .addHTML("info", "<ol><li>Find embeddable content and copy the embed code.</li><li>Add an HTML control to your panel using <code>addHTML()</code> and paste in the embed code.</li><li>Make sure quotes and any other characters are correctly escaped.</li><li>The embed may include a width. Use <code>setWidth()</code> to make your panel a bit wider than that. 20 pixels wider works with the default theme.</li></ol>");
