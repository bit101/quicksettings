(function() {

    var panel = QuickSettings.create(100, 100)
        .addFileChooser("file chooser", "pick an image...", "image/*", onFileChosen)
        .addTextArea("file info", "")
        .setTextAreaRows("file info", 10)
        .addImage("image", "");


    function onFileChosen(file) {
        console.log(file);
        panel.setValue("file info", "name: " + file.name + "\n\nsize: " + file.size + " bytes\n\ndate: " + file.lastModifiedDate + "\n\ntype: " + file.type);
        panel.setValue("image", window.URL.createObjectURL(file));
    }

})();