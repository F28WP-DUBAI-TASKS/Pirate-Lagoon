function openWindow() {
    var i, l, options = [{
       value: 'first',
       text: 'First'
    }, {
       value: 'second',
       text: 'Second'
    }],
    newWindow = window.open("", null, "height=200,width=400,status=yes,toolbar=no,menubar=no,location=no");  

    newWindow.document.write("<select onchange='window.opener.setValue(this.value);'>");
    for(i=0,l=options.length; i<l; i++) {
        newWindow.document.write("<option value='"+options[i].value+"'>");  
        newWindow.document.write(options[i].text);  
        newWindow.document.write("</option>");
    }
    newWindow.document.write("</select>");
}

function setValue(value) {
    document.getElementById('value').value = value;
}