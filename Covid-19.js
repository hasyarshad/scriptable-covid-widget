// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: traffic-light;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: chess-board;

let widget = new ListWidget();
let padding = 22;
widget.setPadding(padding, padding, padding, padding);

let apiResponse = await loadItems();

let main_color = new Color("#ffffff");

let header = widget.addText(" 🚦Covid-19 in Pak".toUpperCase());
header.font = Font.mediumSystemFont(10);
header.textColor = main_color;

widget.addSpacer(10);

let vStack = widget.addStack();
vStack.layoutHorizontally();

addDataView(vStack, apiResponse.indicators.casestoday);
vStack.addSpacer();
addDataView(vStack, apiResponse.indicators.deathstoday);
widget.addSpacer();

addDataView(widget, apiResponse.indicators.active)

const nobg = importModule('no-background.js')

widget.backgroundImage = await nobg.getSliceForWidget(Script.name())

widget.addSpacer(4);

  const timeFormatter = new DateFormatter();
  timeFormatter.locale = "en";
  timeFormatter.useShortDateStyle();
  timeFormatter.useNoTimeStyle();

  widgetText = widget.addText(`       Last Updated: ${timeFormatter.string(new Date())}`);
  widgetText.textColor = main_color;
  widgetText.font = Font.mediumSystemFont(8);

Script.setWidget(widget);
Script.complete();
widget.presentSmall();

function addDataView(widget, data) {
  let viewStack = widget.addStack();
  viewStack.layoutVertically();

  let label = viewStack.addText(data.shortDescription);
  label.font = Font.mediumSystemFont(12);
  label.textColor = main_color;

  if (data.footnote != "") {
    let footnote = viewStack.addText(data.footnote);
    footnote.font = Font.mediumSystemFont(6);
    footnote.textColor = main_color;
  }

  let value = viewStack.addText(data.stringValue);
  value.font = Font.mediumSystemFont(20);
  value.textColor = colorForString(data.color); 
//   value.textColor = new Color("#7d7d7d");
}

async function loadItems() {  
  let url = "https://coronavirus-19-api.herokuapp.com/countries/Pakistan" 
  let req = new Request(url);
  let json = await req.loadJSON();	  

  var covid = {
    indicators : {
      casestoday : {
        shortDescription : "Cases",
        footnote : "(Today)",
        color : "yellow",
        stringValue : json["todayCases"].toString()},
  
      deathstoday : {
        shortDescription : "Deaths",
        footnote : "(Today)",
        color : "red",
        stringValue : json["todayDeaths"].toString()},

      recovered : {
        shortDescription : "Recovered",
        footnote : "(Today)",
        color : "green",
        stringValue : json["recovered"].toString()},

      active : {
        shortDescription : "Active",
        footnote : "(Today)",
        color : "orange",
        stringValue : json["active"].toString()},

      cases : {
        shortDescription : "Cases",
        footnote : "(Total)",
        color : "yellow",
        stringValue : json["cases"].toString()},

      deaths : {
        shortDescription : "Deaths",
        footnote : "(Total)",
        color : "red",
        stringValue : json["deaths"].toString()},
}
}

        
  return covid;
}

function colorForString(colorString) {
  if (colorString == "red") {
    return Color.red();
  }
  if (colorString == "yellow") {
    return Color.yellow();
  }
  if (colorString == "orange") {
    return Color.orange();
  }
  return Color.green();
}
